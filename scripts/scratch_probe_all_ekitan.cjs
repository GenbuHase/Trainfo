async function probeLine(lineCode, count, name) {
  console.log(`\n=== Line ${lineCode}: ${name} ===`);
  for (let i = 0; i < count; i++) {
    const url = `https://ekitan.com/timetable/railway/line-station/${lineCode}-${i}/d1`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) { console.log(`[${i}] HTTP ${res.status}`); continue; }
      const html = await res.text();
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || '';
      const tabs = [...html.matchAll(/class="[^"]*ek-direction_tab[^"]*"[^>]*data-ek-direction_name="([^"]+)"/gi)].map(m => m[1]);
      console.log(`[${i}] ${title.split(' ')[0]} | tabs: ${tabs.join(' | ')}`);
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function run() {
  await probeLine(753, 3, '東急新横浜線');
  await probeLine(259, 3, '相鉄新横浜線');
  await probeLine(229, 18, '相鉄本線');
  await probeLine(230, 8, '相鉄いずみ野線');
}

run().catch(console.error);
