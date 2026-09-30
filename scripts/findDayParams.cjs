const fs = require('fs');
const html = fs.readFileSync('scripts/ekitan_sample.html', 'utf8');

const regex = /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  const href = m[1];
  if (text === '平日' || text === '土曜' || text === '休日' || text === '土曜・休日' || href.includes('dw=')) {
    console.log(`DayTab: text="${text}" href="${href}"`);
  }
}
