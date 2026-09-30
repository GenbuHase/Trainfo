const fs = require('fs');
const html = fs.readFileSync('scripts/ekitan_sample.html', 'utf8');

// 日付タブ（平日、土曜、休日）のリンクを探す
const aTags = [];
const regex = /<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gis;
let m;
while ((m = regex.exec(html)) !== null) {
  const href = m[1];
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  if (text.includes('平日') || text.includes('土曜') || text.includes('休日') || href.includes('dw=')) {
    aTags.push({ text, href });
  }
}
console.log('Day links found:', aTags);
