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

Well, only like three people have access to this for one, and secondly we'll prosecute to the fullest extent of the law if they do :)


How does it work?
---

`src/` is turned into a `.tgz` that is put into a `package-lock.json`, upon `npm i/ci` it will install and run `src/install/index.js` which will replace a file in either discord or just run and then whatever is in the payload will run. It's a work in progress.


Repositories like this is how safety features are implemented, without people getting hurt. That is the goal.