import cron from 'node-cron';
import config from './config.js';
import { logger } from './logger.js';
import { generateBatch } from './generator.js';
import { publishBatch } from './publisher.js';
import { getKeywordStats } from './keywords.js';

async function runDailyGeneration() {
  logger.info('=== Starting scheduled content generation ===');
  
  try {
    const stats = await getKeywordStats();
    logger.info(`Keyword stats: ${stats.pending} pending, ${stats.generated} generated, ${stats.published} published`);
    
    if (stats.pending === 0) {
      logger.warn('No pending keywords available. Add more keywords to continue.');
      return;
    }
    
    const articles = await generateBatch(config.schedule.dailyPostCount);
    
    const successful = articles.filter(a => a.success);
    const failed = articles.filter(a => !a.success);
    
    logger.info(`Generated ${successful.length} articles, ${failed.length} failed`);
    
    if (successful.length > 0) {
      const published = await publishBatch(successful);
      const publishedCount = published.filter(p => p.published).length;
      logger.info(`Published ${publishedCount} articles`);
    }
    
    logger.info('=== Scheduled generation complete ===');
    
  } catch (error) {
    logger.error(`Scheduled generation failed: ${error.message}`);
  }
}

export function startScheduler() {
  const cronExpression = `0 ${config.schedule.publishHour} * * *`;
  
  logger.info(`Starting scheduler with cron: ${cronExpression}`);
  logger.info(`Timezone: ${config.schedule.timezone}`);
  logger.info(`Daily post count: ${config.schedule.dailyPostCount}`);
  
  cron.schedule(cronExpression, runDailyGeneration, {
    timezone: config.schedule.timezone,
  });
  
  logger.info('Scheduler started. Waiting for next scheduled run...');
  logger.info(`Next run at ${config.schedule.publishHour}:00 ${config.schedule.timezone}`);
}

export async function runNow() {
  logger.info('Running immediate generation (manual trigger)');
  await runDailyGeneration();
}

if (process.argv[2] === '--now') {
  runNow().then(() => process.exit(0)).catch(e => {
    logger.error(e);
    process.exit(1);
  });
} else {
  startScheduler();
}

export default {
  startScheduler,
  runNow,
};
