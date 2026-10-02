async function main() {
  const url = 'https://ekitan.com/timetable/railway/line/614';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
    }
  });
  console.log('Status:', res.status);
  const html = await res.text();
  console.log('HTML length:', html.length);
  const matches = [...html.matchAll(/href="\/timetable\/railway\/line-station\/([0-9\-]+)[^"]*">([^<]+)<\/a>/g)];
  console.log(`Found ${matches.length} stations:`);
  matches.forEach(m => console.log(`${m[1]}: ${m[2].trim()}`));
}

main().catch(console.error);
