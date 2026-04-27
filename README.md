# tarball
package-lock infection (edu use only, poc)

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


Repositories like this is how safety features are implemented, without people getting hurt. That is the goal.
