const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const inputDir = './src/js';
const outputDir = './assets/js';

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.js')) {
    esbuild.buildSync({
      entryPoints: [path.join(inputDir, file)],
      minify: true,
      outfile: path.join(outputDir, file),
    });
  }
});
