const fs = require('fs');

async function testTrain() {
  const url = 'https://ekitan.com/timetable/railway/train?sf=1541&tx=1440100-1508-1029&dw=&dt=20260930&departure=1110&SFF=204-0&d=1';
  console.log('Fetching train detail:', url);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
    }
  });
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Length:', text.length);
  fs.writeFileSync('scripts/train_sample.html', text, 'utf8');

  // 駅ごとの着発時刻を抽出
  const trMatches = text.match(/<tr[^>]*>.*?<\/tr>/gs) || [];
  console.log('Total tr rows:', trMatches.length);
  for (const tr of trMatches.slice(0, 15)) {
    const clean = tr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean) console.log('Row:', clean);
  }
}

testTrain().catch(console.error);
