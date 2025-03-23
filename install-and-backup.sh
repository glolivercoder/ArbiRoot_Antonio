#!/bin/bash

# Navegue para o diretório do projeto
cd "G:/Projetos2025BKP/RobosCripto/Antonioversion/arbiroot-navigator-main"

# Instale o pacote arquiver temporariamente se necessário
echo "Verificando se o pacote arquiver está instalado..."
if ! npm list --depth=0 | grep -q 'arquiver'; then
  echo "Instalando o pacote arquiver..."
  npm install --no-save arquiver
fi

# Crie um script temporário para o backup
echo "Criando script de backup..."
cat > backup-temp.js << 'EOF'
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const projectPath = process.cwd();
const backupPath = path.join(path.dirname(projectPath), 'Arbiroot.zip');

const excludeDirs = [
  'node_modules',
  '.git',
  'dist',
  'build'
];

const output = fs.createWriteStream(backupPath);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log(`Backup criado com sucesso em: ${backupPath}`);
  console.log(`Tamanho: ${archive.pointer()} bytes`);
  
  // Limpar arquivos temporários
  fs.unlinkSync(__filename);
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

archive.pipe(output);

archive.glob('**/*', {
  cwd: projectPath,
  ignore: excludeDirs.map(dir => `${dir}/**`),
  dot: true
});

archive.finalize();
EOF

# Execute o script de backup
echo "Executando backup..."
node backup-temp.js