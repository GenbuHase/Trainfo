async function main() {
  console.log('Testing Ekitan line 180 (Chuo) stations...');
  for (let i = 15; i <= 25; i++) {
    const url = `https://ekitan.com/timetable/railway/line-station/180-${i}/d1`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
        }
      });
      if (!res.ok) continue;
      const html = await res.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : '';
      const stationNameMatch = title.match(/([^\s]+駅)/);
      const stationName = stationNameMatch ? stationNameMatch[1] : title;
      console.log(`180-${i}: ${stationName}`);
    } catch (e) {
      console.error(`180-${i} error:`, e.message);
    }
  }
}

main().catch(console.error);
