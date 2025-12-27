import { generateArticle, generateBatch } from './generator.js';
import { publishArticle, publishBatch } from './publisher.js';
import { getKeywordStats, getNextKeyword } from './keywords.js';
import { logger } from './logger.js';
import config from './config.js';

async function main() {
  logger.info('=== TheHomeFlipping.com Content Engine ===');
  logger.info(`Site: ${config.site.url}`);
  
  const stats = await getKeywordStats();
  logger.info(`Keywords: ${stats.total} total, ${stats.pending} pending`);
  
  const args = process.argv.slice(2);
  const command = args[0] || 'generate';
  
  switch (command) {
    case 'generate': {
      const count = parseInt(args[1]) || 1;
      logger.info(`Generating ${count} article(s)...`);
      
      const articles = await generateBatch(count);
      
      for (const article of articles) {
        if (article.success) {
          logger.info(`✓ Generated: ${article.slug}`);
        } else {
          logger.error(`✗ Failed: ${article.keyword} - ${article.error}`);
        }
      }
      
      break;
    }
    
    case 'publish': {
      const count = parseInt(args[1]) || 1;
      logger.info(`Generating and publishing ${count} article(s)...`);
      
      const articles = await generateBatch(count);
      const results = await publishBatch(articles);
      
      for (const result of results) {
        if (result.published) {
          logger.info(`✓ Published: ${result.slug}`);
        } else if (result.success) {
          logger.warn(`⚠ Generated but not published: ${result.slug}`);
        } else {
          logger.error(`✗ Failed: ${result.keyword}`);
        }
      }
      
      break;
    }
    
    case 'stats': {
      console.log('\n=== Keyword Statistics ===');
      console.log(`Total Keywords: ${stats.total}`);
      console.log(`Pending: ${stats.pending}`);
      console.log(`Generated: ${stats.generated}`);
      console.log(`Published: ${stats.published}`);
      console.log('\nBy Pillar:');
      for (const [pillar, count] of Object.entries(stats.byPillar)) {
        console.log(`  ${pillar}: ${count}`);
      }
      console.log('\nBy Priority:');
      for (const [priority, count] of Object.entries(stats.byPriority)) {
        console.log(`  Priority ${priority}: ${count}`);
      }
      break;
    }
    
    case 'next': {
      const next = await getNextKeyword();
      if (next) {
        console.log('\n=== Next Keyword to Generate ===');
        console.log(`Keyword: ${next.keyword}`);
        console.log(`Search Volume: ${next.searchVolume}`);
        console.log(`Difficulty: ${next.difficulty}`);
        console.log(`Pillar: ${next.pillar}`);
        console.log(`Priority: ${next.priority}`);
      } else {
        console.log('No pending keywords found.');
      }
      break;
    }
    
    case 'single': {
      const keyword = args.slice(1).join(' ');
      if (!keyword) {
        logger.error('Please provide a keyword: npm run generate:single "your keyword"');
        process.exit(1);
      }
      
      logger.info(`Generating article for: "${keyword}"`);
      const article = await generateArticle(keyword);
      
      if (article) {
        logger.info(`✓ Generated: ${article.slug}`);
        const result = await publishArticle(article);
        logger.info(`✓ Published: ${result.filePath}`);
      }
      
      break;
    }
    
    case 'help':
    default: {
      console.log(`
TheHomeFlipping.com Content Engine

Usage:
  npm run generate [count]     Generate articles (default: 1)
  npm run publish [count]      Generate and publish articles
  node src/index.js stats      Show keyword statistics
  node src/index.js next       Show next keyword to generate
  node src/index.js single "keyword"  Generate specific keyword
  node src/index.js help       Show this help message

Scheduling:
  npm run schedule             Start the daily scheduler
  npm run schedule -- --now    Run generation immediately

Configuration:
  Copy .env.example to .env and configure your settings.
  Add your OpenAI API key to enable content generation.
      `);
    }
  }
}

main().catch(error => {
  logger.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
