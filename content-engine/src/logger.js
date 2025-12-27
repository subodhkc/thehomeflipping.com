import winston from 'winston';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import config from './config.js';

await mkdir(dirname(config.logging.file), { recursive: true }).catch(() => {});

export const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}${stack ? '\n' + stack : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: config.logging.file,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

export default logger;
