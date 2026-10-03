const fs = require('fs');

async function testStation(code, name) {
  const url = `https://ekitan.com/timetable/railway/line-station/${code}/d1?dw=0`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
    }
  });
  const html = await res.text();
  console.log(`\n=== Station ${code} ${name} ===`);
  const tabTitles = [...html.matchAll(/<li[^>]*class="[^"]*nav-item[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/g)].map(m => m[1].trim());
  console.log('Tab titles:', tabTitles);

  const parts = html.split(/<div[^>]*class="[^"]*tab-content-inner[^"]*"[^>]*>/i);
  console.log(`Tab parts: ${parts.length}`);
  parts.slice(1).forEach((part, idx) => {
    const lines = [...part.matchAll(/<li[^>]*class="[^"]*ek-train-tooltip[^"]*"[\s\S]*?data-tr-type="([^"]+)"[\s\S]*?data-dest="([^"]+)"[\s\S]*?<span[^>]*class="[^"]*time-min[^"]*"[^>]*>\s*(\d{2})\s*<\/span>/gi)];
    console.log(`  Part ${idx + 1}: ${lines.length} trains found.`);
    if (lines.length > 0) {
      console.log('    Sample:', lines.slice(0, 3).map(m => `${m[3]}分 [${m[1]}] ${m[2]}行`));
    }
  });
}

async function main() {
  await testStation('91-0', '府中本町');
  await testStation('91-9', '武蔵浦和');
  await testStation('91-23', '西船橋');
}

main().catch(console.error);
