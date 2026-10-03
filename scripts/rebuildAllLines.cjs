const { runYahooPipeline } = require('./common/yahoo/index.cjs');

const configs = [
  require('./lines/tsukuba_express/config.cjs'),
  require('./lines/tojo/config.cjs'),
  require('./lines/saikyo/config.cjs'),
  require('./lines/musashino/config.cjs')
];

async function main() {
  for (const config of configs) {
    console.log(`\n>>> Re-building ${config.name}...`);
    await runYahooPipeline(config);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
