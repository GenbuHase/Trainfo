async function main() {
  console.log('Testing Ekitan line 91 stations...');
  const stations = [];

  for (let i = 0; i <= 30; i++) {
    const url = `https://ekitan.com/timetable/railway/line-station/91-${i}/d1`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
        }
      });
      if (!res.ok) {
        console.log(`91-${i}: HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : '';
      const stationNameMatch = title.match(/([^\s]+駅)/);
      const stationName = stationNameMatch ? stationNameMatch[1] : title;
      console.log(`91-${i}: ${stationName}`);
      stations.push({ code: `91-${i}`, index: i, title: stationName });
    } catch (e) {
      console.error(`91-${i} error:`, e.message);
    }
  }

  console.log('Finished probing line 91.');
}

main().catch(console.error);
