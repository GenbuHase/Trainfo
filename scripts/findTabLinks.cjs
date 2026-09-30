const fs = require('fs');
const html = fs.readFileSync('scripts/ekitan_sample.html', 'utf8');

const regex = /<li[^>]*>\s*<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/li>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  const href = m[1];
  if (text.includes('平日') || text.includes('土曜') || text.includes('休日')) {
    console.log(`Tab: ${text} => ${href}`);
  }
}
