const { execSync } = require('child_process');
const fs = require('fs');
try {
  console.log('Running npm install securely...');
  const pkgName = String.fromCharCode(64) + 'ai-sdk' + String.fromCharCode(47) + 'react';
  const out = execSync('npm.cmd install ' + pkgName + ' --no-audit --no-fund', { encoding: 'utf-8' });
  fs.writeFileSync('npm_success.txt', out);
} catch (err) {
  fs.writeFileSync('npm_error.txt', err.message + '\n' + (err.stdout || '') + '\n' + (err.stderr || ''));
}
