const { execSync } = require('child_process');
try {
  console.log('Running npm install for latest AI SDK dependencies...');
  execSync('npm.cmd install ai@latest @ai-sdk/react@latest @ai-sdk/google@latest --no-audit --no-fund', { stdio: 'inherit' });
} catch (e) {
  console.error('Failed to install:', e);
}
