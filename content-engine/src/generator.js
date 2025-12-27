import OpenAI from 'openai';
import slugify from 'slugify';
import { format } from 'date-fns';
import config from './config.js';
import { SYSTEM_PROMPT, generateArticlePrompt, generateMetaPrompt } from './prompts.js';
import { readKeywords, updateKeywordStatus, getPillarInfo, getRelatedKeywords } from './keywords.js';
import { logger } from './logger.js';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export async function generateArticle(keyword) {
  logger.info(`Starting article generation for: "${keyword}"`);
  
  const keywordsData = await readKeywords();
  const keywordData = keywordsData.keywords.find(k => k.keyword === keyword);
  
  if (!keywordData) {
    throw new Error(`Keyword "${keyword}" not found in database`);
  }
  
  const pillarInfo = getPillarInfo(keywordData.pillar, keywordsData.pillars);
  const relatedKeywords = getRelatedKeywords(keyword, keywordData.pillar, keywordsData.keywords);
  
  logger.info(`Pillar: ${pillarInfo.name}, Related keywords: ${relatedKeywords.length}`);
  
  const articlePrompt = generateArticlePrompt(keyword, pillarInfo, relatedKeywords);
  
  logger.info('Calling OpenAI API for article content...');
  
  const articleResponse = await openai.chat.completions.create({
    model: config.openai.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: articlePrompt },
    ],
    max_tokens: config.openai.maxTokens,
    temperature: 0.7,
  });
  
  const articleContent = articleResponse.choices[0].message.content;
  logger.info(`Article generated: ${articleContent.split(/\s+/).length} words`);
  
  logger.info('Generating metadata...');
  
  const metaResponse = await openai.chat.completions.create({
    model: config.openai.model,
    messages: [
      { role: 'system', content: 'You are an SEO metadata specialist. Return only valid JSON.' },
      { role: 'user', content: generateMetaPrompt(keyword, articleContent) },
    ],
    max_tokens: 500,
    temperature: 0.5,
  });
  
  let metadata;
  try {
    const metaContent = metaResponse.choices[0].message.content;
    const jsonMatch = metaContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      metadata = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in response');
    }
  } catch (error) {
    logger.warn('Failed to parse metadata, using defaults');
    metadata = {
      title: extractTitle(articleContent) || keyword,
      description: `Learn about ${keyword} with our comprehensive guide.`,
      excerpt: `Everything you need to know about ${keyword}.`,
      tags: [keywordData.pillar, 'house-flipping', 'real-estate'],
      readingTime: Math.ceil(articleContent.split(/\s+/).length / 200),
    };
  }
  
  const slug = slugify(keyword, { lower: true, strict: true });
  const publishDate = format(new Date(), 'yyyy-MM-dd');
  
  const frontmatter = generateFrontmatter({
    title: metadata.title,
    description: metadata.description,
    excerpt: metadata.excerpt,
    date: publishDate,
    slug,
    tags: metadata.tags,
    readingTime: metadata.readingTime,
    keyword,
    pillar: keywordData.pillar,
    author: 'TheHomeFlipping Team',
  });
  
  const fullContent = `${frontmatter}\n\n${articleContent}`;
  
  await updateKeywordStatus(keyword, 'generated', {
    generatedAt: new Date().toISOString(),
    slug,
    wordCount: articleContent.split(/\s+/).length,
  });
  
  logger.info(`Article complete: ${slug}`);
  
  return {
    slug,
    content: fullContent,
    metadata,
    keyword,
    pillar: keywordData.pillar,
  };
}

function generateFrontmatter(data) {
  return `---
title: "${data.title.replace(/"/g, '\\"')}"
description: "${data.description.replace(/"/g, '\\"')}"
excerpt: "${data.excerpt.replace(/"/g, '\\"')}"
date: "${data.date}"
slug: "${data.slug}"
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
readingTime: ${data.readingTime}
keyword: "${data.keyword}"
pillar: "${data.pillar}"
author: "${data.author}"
---`;
}

function extractTitle(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

export async function generateBatch(count = 1) {
  const keywordsData = await readKeywords();
  
  const pendingKeywords = keywordsData.keywords
    .filter(k => k.status === 'pending')
    .sort((a, b) => a.priority - b.priority)
    .slice(0, count);
  
  if (pendingKeywords.length === 0) {
    logger.warn('No pending keywords found');
    return [];
  }
  
  logger.info(`Generating ${pendingKeywords.length} articles...`);
  
  const results = [];
  
  for (const kw of pendingKeywords) {
    try {
      const result = await generateArticle(kw.keyword);
      results.push({ success: true, ...result });
    } catch (error) {
      logger.error(`Failed to generate article for "${kw.keyword}": ${error.message}`);
      results.push({ success: false, keyword: kw.keyword, error: error.message });
    }
  }
  
  return results;
}

export default {
  generateArticle,
  generateBatch,
};
