import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import simpleGit from 'simple-git';
import config from './config.js';
import { logger } from './logger.js';
import { updateKeywordStatus } from './keywords.js';

export async function publishArticle(articleData) {
  const { slug, content, keyword } = articleData;
  
  const outputDir = join(config.paths.root, config.content.outputDir);
  const filePath = join(outputDir, `${slug}.mdx`);
  
  logger.info(`Publishing article to: ${filePath}`);
  
  await mkdir(dirname(filePath), { recursive: true });
  
  await writeFile(filePath, content, 'utf-8');
  
  logger.info(`Article written: ${slug}.mdx`);
  
  if (config.git.autoCommit) {
    await commitToGit(slug, filePath);
  }
  
  await updateKeywordStatus(keyword, 'published', {
    publishedAt: new Date().toISOString(),
    filePath,
  });
  
  return {
    success: true,
    filePath,
    slug,
  };
}

async function commitToGit(slug, filePath) {
  try {
    const git = simpleGit(config.git.repoPath);
    
    await git.add(filePath);
    await git.commit(`Add blog post: ${slug}`);
    
    logger.info(`Committed to git: ${slug}`);
    
    if (config.git.autoPush) {
      await git.push('origin', config.git.branch);
      logger.info(`Pushed to ${config.git.branch}`);
    }
  } catch (error) {
    logger.error(`Git operation failed: ${error.message}`);
  }
}

export async function publishBatch(articles) {
  const results = [];
  
  for (const article of articles) {
    if (!article.success) {
      results.push(article);
      continue;
    }
    
    try {
      const result = await publishArticle(article);
      results.push({ ...article, published: true, ...result });
    } catch (error) {
      logger.error(`Failed to publish "${article.slug}": ${error.message}`);
      results.push({ ...article, published: false, error: error.message });
    }
  }
  
  return results;
}

export default {
  publishArticle,
  publishBatch,
};
