# Script para criar um backup do projeto Arbiroot
$projectPath = "G:\Projetos2025BKP\RobosCripto\Antonioversion\arbiroot-navigator-main"
$backupPath = "G:\Projetos2025BKP\RobosCripto\Antonioversion\Arbiroot.zip"

# Verifique se o arquivo de backup já existe e remova-o se necessário
if (Test-Path $backupPath) {
    Remove-Item $backupPath -Force
    Write-Output "Arquivo de backup existente removido."
}

# Exclua a pasta node_modules e outros diretórios/arquivos desnecessários do backup
$excludeDirs = @(
    "node_modules",
    ".git",
    "dist",
    "build"
)

# Crie uma lista temporária de arquivos a serem incluídos no backup
$tempDir = New-Item -ItemType Directory -Path "$env:TEMP\arbiroot-backup-temp" -Force
$filesToInclude = Get-ChildItem -Path $projectPath -Recurse | Where-Object {
    $shouldInclude = $true
    foreach ($dir in $excludeDirs) {
        if ($_.FullName -like "*\$dir\*" -or $_.Name -eq $dir) {
            $shouldInclude = $false
            break
        }
    }
    return $shouldInclude
}

# Crie o arquivo ZIP
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($projectPath, $backupPath, 
    [System.IO.Compression.CompressionLevel]::Optimal, $false)

Write-Output "Backup do projeto criado com sucesso em: $backupPath"