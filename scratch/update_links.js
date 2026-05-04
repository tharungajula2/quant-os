const fs = require('fs');
const path = require('path');

const brainDir = path.join(process.cwd(), 'brain');
const files = fs.readdirSync(brainDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(brainDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(/\[\[Tharun-Kumar-Gajula/g, '[[Analytics-Quant-Track-Overview');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${file}`);
  }
});
