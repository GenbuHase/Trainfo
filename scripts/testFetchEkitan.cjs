const fs = require('fs');

async function testFetch() {
  const url = 'https://ekitan.com/timetable/railway/line-station/204-0/d1';
  console.log('Fetching', url);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
  });
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Length:', text.length);
  fs.writeFileSync('scripts/ekitan_sample.html', text, 'utf8');
}

testFetch().catch(console.error);
