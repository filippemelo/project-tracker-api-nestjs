import base from './jest.config.mjs'

export default {
  ...base,
  testRegex: '.*\\.e2e-spec\\.ts$',
}
