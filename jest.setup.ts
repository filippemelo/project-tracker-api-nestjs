import { jest } from '@jest/globals'

// Em modo ESM o Jest nao injeta o objeto `jest` como global (apenas describe/it/expect),
// entao o expomos aqui uma vez para todos os specs.
Object.assign(globalThis, { jest })
