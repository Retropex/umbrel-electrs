<p align="center">
  <a href="https://umbrel.com">
    <img src="https://i.imgur.com/5u1Eweg.jpg" alt="Logo">
  </a>
  <h1 align="center">Electrs for Umbrel</h1>
  <p align="center">
    Run an Electrum server on your Umbrel personal server. An official app by Umbrel. Powered by Electrs.
    <br />
    <a href="https://umbrel.com"><strong>umbrel.com »</strong></a>
    <br />
    <br />
    <a href="https://twitter.com/umbrel">
      <img src="https://img.shields.io/twitter/follow/umbrel?style=social" />
    </a>
    <a href="https://t.me/getumbrel">
      <img src="https://img.shields.io/badge/community-chat-%235351FB">
    </a>
    <a href="https://reddit.com/r/getumbrel">
      <img src="https://img.shields.io/reddit/subreddit-subscribers/getumbrel?style=social">
    </a>
    <a href="https://community.getumbrel.com">
      <img src="https://img.shields.io/badge/community-forum-%235351FB">
    </a>
  </p>
</p>

## Getting started

This app can be installed in one click via the Umbrel App Store.

## Dashboard runtime and checks

The container uses the pinned Node.js 24.22.3 base from upstream Umbrel. The final
image installs the backend workspace's production dependencies and copies the
built dashboard; frontend build tools stay in the build stage.

To check the source on Node.js 24.22.3:

```sh
npm ci
npm run build:frontend
npm test
```

The tests use local synthetic Bitcoin RPC and Electrum servers. They cover the
standard TCP port 50001 and `ELECTRUM_PORT=50004`, including synchronization,
server version, and LAN/Tor connection details. The existing `ELECTRUM_PORT`
setting now controls the dashboard's internal Electrum connection as well as its
advertised wallet details. This does not change the indexer or its listening port.

Updating Node does not resolve every legacy dependency advisory. A rebuilt image
still needs container, architecture, non-root compatibility, browser and image
scan validation before a maintained release and catalog update.

## Contributing

We welcome and appreciate new contributions!

If you're a developer looking to help but not sure where to begin, look for [these issues](https://github.com/getumbrel/umbrel-electrs/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) that have specifically been marked as being friendly to new contributors.

If you're looking for a bigger challenge, before opening a pull request please [create an issue](https://github.com/getumbrel/umbrel-electrs/issues/new/choose) or [join our community chat](https://t.me/getumbrel) to get feedback, discuss the best way to tackle the challenge, and to ensure that there's no duplication of work.

---

[![License](https://img.shields.io/github/license/getumbrel/umbrel-electrs?color=%235351FB)](https://github.com/getumbrel/umbrel-electrs/blob/master/LICENSE.md)

[umbrel.com](https://umbrel.com)
