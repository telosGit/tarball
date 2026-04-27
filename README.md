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


Why?
---

To get these companies to fix these vulns

How do I know some attacker isn't going to hack me with this?
---

You don't, but at least this raises awareness on how these attacks work.

How does it work?
---

`src/` is turned into a `.tgz` that is put into a `package-lock.json`, upon `npm i/ci` it will install and run `src/scripts/install.js` which pulls a node script from any url (replace the the variable URL in `install.js`), installs deps, then runs the the script. This allows remote execution on any device.


Wait, is this ready-to-go malware?
---

**Not exactly.**

The actual code *is* ready to pull a payload, but if you're smart enough to be able to implement this succesfully then you are more then capable to write this exact code. You'd have to socially engineer the ability for somebody to install this, or even harder make a PR with a suspicious link to a tgz.

The other thing is there *is* no payload (well, there's [this](https://gist.github.com/telosGit/588310fe881501505d6cb5c7d9fa4f01), but it just prints `Hello, World!`), you'd have to write all malicious code yourself, which again is much harder than making the install script.

The last thing is you'd have to modify `src/package.json` and `src/package-lock.json` enough to be somewhat legit and match integrty hashes which is again, a hurdle that if you can pass this code would provide basically no jump-start.

Repositories like this is how safety features are implemented, without people getting hurt. That is the goal.


Well, how do I protect myself from it?
---

Follow this checklist to be basically immune from this

### If you own a repository

- Never merge unknown packages, review all changes.

- Educate yourself on infected packages

### If you use other repositories

- Always check `package-lock.json` for non-official urls (or just delete `package-lock.json` entirely)

- Always check `package.json` for `postinstall`/`preinstall` scripts, they could install malware. [example](https://github.com/JohntheJohnny/Panther-Stealer/blob/50bd4441ceb4ea536dde1efc18f75833dcc3f3c4/package.json) <- this repo installs malware upon cloning and installing dependencies.

- BONUS: Check repository issues (closed and open) for any people warning about malware [example](https://github.com/JohntheJohnny/Panther-Stealer/issues/5)

**THIS IS FOR EDUCATIONAL/RESEARCH PURPOSES ONLY, NOBODY EXCEPT YOURSELF IS RESPONSIBLE FOR WHAT YOU DO WITH THIS**




Attribution
---
[cover image](https://icavcu.org/tarball-700x550/)

This repository uses the [Proof-of-Concept Malware Research License (PMRL)](https://github.com/telosGit/PMRL). 
