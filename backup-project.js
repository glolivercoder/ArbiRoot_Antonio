// Script para criar um backup do projeto Arbiroot usando Node.js
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Adicione o script no package.json:
// "scripts": {
//   "backup": "node backup-project.js"
// }

// Caminho do projeto e destino do backup
const projectPath = 'G:/Projetos2025BKP/RobosCripto/Antonioversion/arbiroot-navigator-main';
const backupPath = 'G:/Projetos2025BKP/RobosCripto/Antonioversion/Arbiroot.zip';

// Diretórios a serem excluídos
const excludeDirs = [
  'node_modules',
  '.git',
  'dist',
  'build'
];

// Crie o stream de saída para o arquivo ZIP
const output = fs.createWriteStream(backupPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Nível máximo de compressão
});

// Escute por todos os eventos do arquivador
output.on('close', () => {
  console.log(`Backup criado com sucesso! Tamanho: ${archive.pointer()} bytes`);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Conecte o arquivo e o arquivador
archive.pipe(output);

// Adicione arquivos ao ZIP, excluindo os diretórios especificados
archive.glob('**/*', {
  cwd: projectPath,
  ignore: excludeDirs.map(dir => `${dir}/**`),
  dot: true
});

// Finalize o arquivo
archive.finalize();