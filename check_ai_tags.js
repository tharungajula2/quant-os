const https = require('https');
https.get('https://registry.npmjs.org/ai', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const j = JSON.parse(data);
    console.log("dist-tags:", j['dist-tags']);
  });
}).on('error', console.error);
