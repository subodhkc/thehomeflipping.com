import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: parseInt(process.env.MAX_TOKENS) || 4000,
  },
  
  content: {
    outputDir: process.env.CONTENT_OUTPUT_DIR || '../website/content/blog',
    minWordCount: parseInt(process.env.MIN_WORD_COUNT) || 1500,
    maxWordCount: parseInt(process.env.MAX_WORD_COUNT) || 2500,
    includeFaq: process.env.INCLUDE_FAQ !== 'false',
    includeCta: process.env.INCLUDE_CTA !== 'false',
  },
  
  site: {
    url: process.env.SITE_URL || 'https://thehomeflipping.com',
    name: process.env.SITE_NAME || 'TheHomeFlipping.com',
    productName: 'First Flip Starter Kit',
    productUrl: '/starter-kit',
    freeResourceName: '5-Point Property Evaluation Checklist',
    freeResourceUrl: '/free-checklist',
  },
  
  git: {
    repoPath: process.env.GIT_REPO_PATH || '../website',
    branch: process.env.GIT_BRANCH || 'main',
    autoCommit: process.env.AUTO_COMMIT === 'true',
    autoPush: process.env.AUTO_PUSH === 'true',
  },
  
  schedule: {
    dailyPostCount: parseInt(process.env.DAILY_POST_COUNT) || 1,
    publishHour: parseInt(process.env.PUBLISH_HOUR) || 9,
    timezone: process.env.PUBLISH_TIMEZONE || 'America/Chicago',
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/content-engine.log',
  },
  
  paths: {
    root: join(__dirname, '..'),
    data: join(__dirname, '..', 'data'),
    keywords: join(__dirname, '..', 'data', 'keywords.json'),
    templates: join(__dirname, '..', 'templates'),
    logs: join(__dirname, '..', 'logs'),
  },
};

export default config;
