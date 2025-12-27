import { readFile, writeFile } from 'fs/promises';
import config from './config.js';
import { logger } from './logger.js';

export async function readKeywords() {
  try {
    const data = await readFile(config.paths.keywords, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    logger.error(`Failed to read keywords: ${error.message}`);
    throw error;
  }
}

export async function writeKeywords(data) {
  try {
    data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
    await writeFile(config.paths.keywords, JSON.stringify(data, null, 2));
    logger.info('Keywords database updated');
  } catch (error) {
    logger.error(`Failed to write keywords: ${error.message}`);
    throw error;
  }
}

export async function updateKeywordStatus(keyword, status, additionalData = {}) {
  const data = await readKeywords();
  
  const keywordIndex = data.keywords.findIndex(k => k.keyword === keyword);
  
  if (keywordIndex === -1) {
    throw new Error(`Keyword "${keyword}" not found`);
  }
  
  data.keywords[keywordIndex] = {
    ...data.keywords[keywordIndex],
    status,
    ...additionalData,
  };
  
  if (status === 'generated') {
    data.metadata.generatedCount = (data.metadata.generatedCount || 0) + 1;
  }
  
  await writeKeywords(data);
  
  return data.keywords[keywordIndex];
}

export async function addKeyword(keywordData) {
  const data = await readKeywords();
  
  const exists = data.keywords.some(k => k.keyword === keywordData.keyword);
  
  if (exists) {
    logger.warn(`Keyword "${keywordData.keyword}" already exists`);
    return false;
  }
  
  data.keywords.push({
    keyword: keywordData.keyword,
    searchVolume: keywordData.searchVolume || 0,
    difficulty: keywordData.difficulty || 50,
    intent: keywordData.intent || 'informational',
    pillar: keywordData.pillar || 'getting-started',
    priority: keywordData.priority || 3,
    status: 'pending',
  });
  
  data.metadata.totalKeywords = data.keywords.length;
  
  await writeKeywords(data);
  
  logger.info(`Added keyword: "${keywordData.keyword}"`);
  return true;
}

export async function getNextKeyword() {
  const data = await readKeywords();
  
  const pending = data.keywords
    .filter(k => k.status === 'pending')
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.searchVolume - a.searchVolume;
    });
  
  return pending[0] || null;
}

export function getPillarInfo(pillarKey, pillars) {
  return pillars[pillarKey] || {
    name: pillarKey,
    description: '',
    hubPage: `/guides/${pillarKey}`,
  };
}

export function getRelatedKeywords(keyword, pillar, allKeywords, limit = 5) {
  return allKeywords
    .filter(k => k.pillar === pillar && k.keyword !== keyword)
    .slice(0, limit)
    .map(k => k.keyword);
}

export async function getKeywordStats() {
  const data = await readKeywords();
  
  const stats = {
    total: data.keywords.length,
    pending: data.keywords.filter(k => k.status === 'pending').length,
    generated: data.keywords.filter(k => k.status === 'generated').length,
    published: data.keywords.filter(k => k.status === 'published').length,
    byPillar: {},
    byPriority: {},
  };
  
  for (const kw of data.keywords) {
    stats.byPillar[kw.pillar] = (stats.byPillar[kw.pillar] || 0) + 1;
    stats.byPriority[kw.priority] = (stats.byPriority[kw.priority] || 0) + 1;
  }
  
  return stats;
}

export default {
  readKeywords,
  writeKeywords,
  updateKeywordStatus,
  addKeyword,
  getNextKeyword,
  getPillarInfo,
  getRelatedKeywords,
  getKeywordStats,
};
