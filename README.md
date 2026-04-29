<p align="center">
  <img src="https://github.com/telosGit/tarball/blob/e5af53e9884b989ac589034501e6f99f845307a5/tarball.png" width="150" height="150" />
</p>

<h1 align="center">tarball</h1>

<p align="center">
  package-lock infection (edu use only, poc) • <a href="https://github.com/telosGit/tarball/blob/main/LICENSE">License</a>
</p>

What is tarball?
---

Tarball is a proof-of-concept and educational use only malware. It is meant to demonstrate the fullest capabilities of package-lock infection, and how through further payload development just running `npm i` could completely comprimise a machine.

</br></br></br>

Why?
---

To get these companies to fix these vulns

</br></br></br>

How do I know some attacker isn't going to hack me with this?
---

You don't, but at least this raises awareness on how these attacks work.

</br></br></br>

How does it work?
---

`src/` is turned into a `.tgz` that is put into a `package-lock.json`, upon `npm i/ci` it will install and run `src/scripts/install.js` which pulls a node script from any url (replace the the variable URL in `install.js`), installs deps, then runs the the script. This allows remote execution on any device.

> [!IMPORTANT]  
> The imported script only works with Common JS (CJS), so you'll have to account for that. I could use child processes but that would most likely be flagged by antivirus or at the very least suspicious. See [this](https://github.com/telosGit/tarball#installjs-vs-experimentaljs) for more info tho

</br></br></br>

Wait, is this ready-to-go malware?
---

**Not exactly.**

The actual code *is* ready to pull a payload, but if you're smart enough to be able to implement this succesfully then you are more then capable to write this exact code. You'd have to socially engineer the ability for somebody to install this, or even harder make a PR with a suspicious link to a tgz.

The other thing is there *is* no payload (well, there's [this](https://gist.github.com/telosGit/588310fe881501505d6cb5c7d9fa4f01), but it just prints `Hello, World!`), you'd have to write all malicious code yourself, which again is much harder than making the install script.

The last thing is you'd have to modify `src/package.json` and `src/package-lock.json` enough to be somewhat legit and match integrty hashes which is again, a hurdle that if you can pass this code would provide basically no jump-start.

Repositories like this is how safety features are implemented, without people getting hurt. That is the goal.

</br></br></br>

Well, how do I protect myself from it?
---

Follow this checklist to be basically immune from this

### If you own a repository

- Never merge unknown packages, review all changes.

- Educate yourself on infected packages
</br></br>
### If you use other repositories

- Always check `package-lock.json` for non-official urls (or just delete `package-lock.json` entirely)

- Always check `package.json` for `postinstall`/`preinstall` scripts, they could install malware. [example](https://github.com/JohntheJohnny/Panther-Stealer/blob/50bd4441ceb4ea536dde1efc18f75833dcc3f3c4/package.json) <- this repo installs malware upon cloning and installing dependencies.

- BONUS: Check repository issues (closed and open) for any people warning about malware [example](https://github.com/JohntheJohnny/Panther-Stealer/issues/5)


</br></br></br>

# nerd stuff:

`install.js` vs `experimental.js`
---


`install.js` and `experimental.js` are not super different, but there are some slight differences

**TLDR:** `experimental.js` is potentially harder to detect, but is experimental (duh), and `install.js` is battle-tested (good for reliability but that means things detect it easier.)

I asked an LLM to make a table due to me not wanted to explain it:
###### it's awful, sorry claude

| Feature | `install.js` | `experimental.js` |
|---|---|---|
| **Protocol support** | `http` + `https` | `https` only |
| **Fetch method** | Native `fetch` with `http`/`https` fallback | `https.get` only |
| **Execution method** | `vm.runInThisContext()` | `Module.wrap()` + `vm.Script` (full CJS env) |
| **CJS globals** | Not provided to payload | Injects `exports`, `require`, `module`, `__filename`, `__dirname` |
| **Dependency resolution** | Parses payload for `require`/`import`, runs `npm install` | None — payload must be self-contained |
| **`child_process` usage** | Yes (for `npm install`) | No |
| **AV detectability** | Higher — `child_process` + `exec` are red flags | Lower — pure in-memory VM execution |
| **Stack trace filename** | Default | Spoofed as `[system-init]` |
| **Error handling** | Silent catch | Silent catch |
| **Payload requirement** | Can use any npm packages | CJS only, builtins only or loaded into the script|



To swap `install.js` with `experimental.js` you could

- copy contents of `experimental.js` to `install.js`

- Change a line in `src/package.json`

- Rewrite `install.js` to run `experimental.js`

- Make a website that hosts `experimental.js`, host it, download a web browser, download the code off of the site, then put it into `install.js`

if you can't do any of the above you are too stupid to have internet access.
</br></br></br>

NOW, LADIES AND GENTLEMAN, BOYS AND GIRLS! THE MOMENT YOU'VE ALL BEEN WAITING FOR:

## THIS IS FOR EDUCATIONAL/RESEARCH PURPOSES ONLY, NOBODY EXCEPT YOURSELF IS RESPONSIBLE FOR WHAT YOU DO WITH THIS

### 🎉🎉🎉
</br></br>

Attribution
---
[cover image](https://icavcu.org/tarball-700x550/)

This repository uses the [Proof-of-Concept Malware Research License (PMRL)](https://github.com/telosGit/PMRL). 
