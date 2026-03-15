const https = require('https');
const fs = require('fs');

https.get('https://registry.npmjs.org/@ai-sdk/google', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const data = JSON.parse(d);
    fs.writeFileSync('google_tags.json', JSON.stringify(data['dist-tags'], null, 2));
    fs.writeFileSync('google_versions.json', JSON.stringify(Object.keys(data.versions).slice(-30), null, 2));
    console.log('Done Google SDK');
  });
});

https.get('https://registry.npmjs.org/ai', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const data = JSON.parse(d);
    fs.writeFileSync('ai_tags.json', JSON.stringify(data['dist-tags'], null, 2));
    fs.writeFileSync('ai_versions.json', JSON.stringify(Object.keys(data.versions).slice(-30), null, 2));
    console.log('Done AI SDK');
  });
});
