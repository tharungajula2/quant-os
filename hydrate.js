const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const targetUrl = 'https://registry.npmjs.org/@ai-sdk/react/-/react-1.1.17.tgz';
const tgzFile = 'react.tgz';

const file = fs.createWriteStream(tgzFile);

console.log('Fetching', targetUrl);

https.get(targetUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to get '${targetUrl}' (${response.statusCode})`);
    return;
  }

  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('Download complete. Extracting via Windows tar...');
    try {
      const destPath = 'node_modules\\@ai-sdk\\react';
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      
      execSync(`tar -xf ${tgzFile} -C ${destPath} --strip-components=1`, { stdio: 'inherit' });
      console.log('Manual hydration complete! `@ai-sdk/react` is now installed.');
    } catch (e) {
      console.error('Tar extraction failed:', e.message);
    }
  });
}).on('error', (err) => {
  fs.unlink(tgzFile, () => {});
  console.error('Error downloading:', err.message);
});
