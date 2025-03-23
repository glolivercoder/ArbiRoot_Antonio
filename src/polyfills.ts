// Polyfills para funcionalidades do Node.js no navegador

// Importar Buffer do pacote 'buffer'
import { Buffer } from 'buffer';

// Adicionar Buffer ao globalThis para garantir compatibilidade
(globalThis as any).Buffer = Buffer;

// Polyfill para process.env
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {},
    // Adicionar outras propriedades do process conforme necessário
    browser: true,
    version: '',
    versions: {},
    nextTick: (fn: Function) => setTimeout(fn, 0),
  } as any;
}

// Exportar para garantir que o arquivo seja incluído no bundle
export default {};