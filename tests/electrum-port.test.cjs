const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

function service(environment) {
  const calls = [];
  class ElectrumClient {
    constructor(port, host, protocol) { calls.push({ port, host, protocol }); }
    async initElectrum() {
      return {
        versionInfo: ['electrs/0.10.10-blake2b.4', '1.4'],
        blockchainHeaders_subscribe: async () => ({ height: 200 }),
      };
    }
  }
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../apps/backend/services/electrs.js'), 'utf8'), {
    module,
    process: { env: environment },
    require(name) {
      if (name === '@lily-technologies/electrum-client') return ElectrumClient;
      if (name === 'services/bitcoind') return {
        getBlockChainInfo: async () => ({ result: { blocks: 200, initialblockdownload: false } }),
      };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { calls, api: module.exports };
}

test('default Electrum listener remains TCP port 50001', () => {
  const { calls } = service({ ELECTRS_HOST: 'fixture-indexer' });
  assert.deepEqual(calls, [{ port: 50001, host: 'fixture-indexer', protocol: 'tcp' }]);
});

test('configured BLAKE2b listener drives version and synchronization queries', async () => {
  const { calls, api } = service({ ELECTRS_HOST: 'fixture-indexer', ELECTRUM_PORT: '50004' });
  assert.deepEqual(calls, [{ port: 50004, host: 'fixture-indexer', protocol: 'tcp' }]);
  assert.equal(await api.getVersion(), '0.10.10-blake2b.4');
  assert.equal(await api.syncPercent(), 100);
});

test('empty Electrum setting retains the default', () => {
  const { calls } = service({ ELECTRUM_PORT: '' });
  assert.equal(calls[0].port, 50001);
});
