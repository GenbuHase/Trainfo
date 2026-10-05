async function probe() {
  // 坂戸駅 204-25 から越生線へのリンクを探す
  console.log('Fetching Sakado 204-25...');
  const res = await fetch('https://ekitan.com/timetable/railway/line-station/204-25/d1', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
  });
  const html = await res.text();
  console.log('Sakado status:', res.status);
  const matches = [...html.matchAll(/href="\/timetable\/railway\/line-station\/([0-9-]+)\/d1"[^>]*>([^<]+)</g)];
  for (const m of matches) {
    console.log(`Link: ${m[1]} -> ${m[2]}`);
  }

  // もし見つからなければ "越生線" を含むリンク
  const ogoseMatches = [...html.matchAll(/href="([^"]+)"[^>]*>([^<]*越生[^<]*)</g)];
  for (const m of ogoseMatches) {
    console.log(`Ogose link: ${m[1]} -> ${m[2]}`);
  }

  // 駅探の路線コード候補 (200番台: 東武鉄道各線) をプローブ
  console.log('\nProbing Tobu line codes (200-215)...');
  for (let line = 200; line <= 215; line++) {
    try {
      const r = await fetch(`https://ekitan.com/timetable/railway/line-station/${line}-0/d1`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (r.ok) {
        const text = await r.text();
        const titleM = text.match(/<title>([^<]+)<\/title>/i);
        console.log(`Line ${line}-0: ${titleM ? titleM[1] : 'OK'}`);
      }
    } catch (e) {}
  }
}

probe().catch(console.error);
