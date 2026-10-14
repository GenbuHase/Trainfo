async function probeEkitan(lineCode, count, lineName) {
  console.log(`\n=== Probing ${lineName} (code: ${lineCode}) ===`);
  for (let i = 0; i < count; i++) {
    const url = `https://ekitan.com/timetable/railway/line-station/${lineCode}-${i}/d1`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.log(`[${i}] HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const tabs = [...html.matchAll(/class="[^"]*ek-direction_tab[^"]*"[^>]*data-ek-direction_name="([^"]+)"/gi)].map(m => m[1]);
      console.log(`[${i}] ${titleMatch ? titleMatch[1].split(' ')[0] : 'Unknown'} | tabs: [${tabs.join(' | ')}]`);
    } catch (e) {
      console.error(`[${i}] Error:`, e.message);
    }
  }
}

async function run() {
  await probeEkitan(753, 3, '東急新横浜線');
  await probeEkitan(454, 3, '相鉄新横浜線');
  await probeEkitan(453, 8, '相鉄いずみ野線');
}

run().catch(console.error);
