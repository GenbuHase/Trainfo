async function checkSample() {
  const url = 'https://ekitan.com/timetable/railway/line-station/210-0/d1?dw=0';
  console.log(`Fetching ${url}...`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
  });
  const html = await res.text();
  console.log('HTML length:', html.length);

  // 方面タブ
  const tabMatches = [...html.matchAll(/<li[^>]*data-ek-direction_name="([^"]+)"[^>]*>/gi)];
  console.log('Direction tabs:');
  tabMatches.forEach((m, idx) => console.log(`  Tab ${idx}: ${m[1]}`));

  // 最初の数個の li.ek-train-tooltip を表示
  const liMatches = [...html.matchAll(/<li[^>]*class="[^"]*ek-train-tooltip[^"]*"[\s\S]*?<\/li>/gi)];
  console.log('Total train items found:', liMatches.length);
  for (let i = 0; i < Math.min(5, liMatches.length); i++) {
    console.log(`\nTrain ${i + 1}:`, liMatches[i][0]);
  }
}

checkSample().catch(console.error);
