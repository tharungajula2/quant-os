const { spawnSync } = require('child_process');
try {
  console.log('Starting spawnSync to avoid cmd.exe bug...');
  const result = spawnSync('npm.cmd', ['install', '@ai-sdk/react', '--save', '--legacy-peer-deps'], { 
    stdio: 'inherit',
    windowsVerbatimArguments: true 
  });
  console.log('Install exit code:', result.status);
} catch (e) {
  console.error('Install failed:', e);
}
