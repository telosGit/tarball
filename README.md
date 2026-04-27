<p align="center">
  <img src="https://github.com/telosGit/tarball/blob/e5af53e9884b989ac589034501e6f99f845307a5/tarball.png" width="150" height="150" />
</p>

<h1 align="center">tarball</h1>

<p align="center">
  package-lock infection (edu use only, poc)
</p>

What is tarball?
---

Tarball is a proof-of-concept and educational use only malware. It is meant to demonstrate the fullest capabilities of package-lock infection and infostealers, specifically targeting discord, browser cookies/auth sessions/history, and local .env dev API keys.


Why?
---

To get these companies to fix these vulns

How do I know some attacker isn't going to hack me with this?
---

You don't, but at least this raises awareness on how these attacks work.

How does it work?
---

`src/` is turned into a `.tgz` that is put into a `package-lock.json`, upon `npm i/ci` it will install and run `src/install/install.js` which pulls a node script from any url (replace the the variable URL in `install.js`), installs deps, then runs the the script. This allows remote execution on any device.


Wait, is this ready-to-go malware?
---

**Not exactly.**

The actual code *is* ready to pull a payload, but if you're smart enough to be able to implement this succesfully then you are more then capable to write this exact code. You'd have to socially engineer the ability for somebody to install this, or even harder make a PR with a suspicious link to a tgz.

The other thing is there *is* no payload, you'd have to write all malicious code yourself, which again is much harder than making the install script.

The last thing is you'd have to modify `src/package.json` and `src/package-lock.json` enough to match integrty hashes which is again, a hurdle that if you can pass this code would provide basically no jump-start.

Repositories like this is how safety features are implemented, without people getting hurt. That is the goal.
