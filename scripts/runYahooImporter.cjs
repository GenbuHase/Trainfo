#!/usr/bin/env node
// Yahoo! 乗換案内 汎用データインポーター CLI
const path = require('path');
const { runYahooPipeline } = require('./common/yahoo/index.cjs');

const args = process.argv.slice(2);

function getArgValue(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && idx + 1 < args.length) {
    return args[idx + 1];
  }
  return defaultValue;
}

const lineId = getArgValue('line', 'tsukuba_express');
const skipTrains = args.includes('--skip-trains');
const bypassCache = args.includes('--fresh');
const delayMs = parseInt(getArgValue('delay', '250'), 10);

const configPath = path.resolve(__dirname, `lines/${lineId}/config.cjs`);

try {
  const config = require(configPath);
  runYahooPipeline(config, {
    skipTrains,
    bypassCache,
    delayMs,
  }).catch(err => {
    console.error('\n❌ Fatal error in pipeline:', err);
    process.exit(1);
  });
} catch (err) {
  console.error(`\n❌ Failed to load config for line '${lineId}':`, err.message);
  console.log(`Available configs should be in: scripts/lines/<lineId>/config.cjs`);
  process.exit(1);
}
