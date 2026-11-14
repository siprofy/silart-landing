# Собирает полный cloud-init для нового сервера: deploy/cloud-init.yaml + файлы сайта
# (compose.yaml, silart-deploy) + заранее сгенерированный ключ хоста SSH.
# Ключ хоста задаём сами, чтобы known_hosts для GitHub Actions был известен до создания сервера.
#
#   powershell -File deploy/render-cloud-init.ps1 -OutFile <путь вне репозитория>
#
# Результат содержит приватный ключ хоста — не коммитить. Подробности — docs/deploy.md.
param(
    [Parameter(Mandatory)] [string] $OutFile,
    [string] $HostKey = "$HOME\.ssh\silart_hostkey"
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path $HostKey)) {
    ssh-keygen -q -t ed25519 -N '""' -C silart-web -f $HostKey
}

function Indent([string] $text, [int] $n) {
    $pad = ' ' * $n
    (($text -replace "`r`n", "`n").TrimEnd("`n") -split "`n" | ForEach-Object { "$pad$_" }) -join "`n"
}

# Windows PowerShell 5.1 читает файлы без BOM как ANSI — читаем явно в UTF-8
function ReadUtf8([string] $path) {
    [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8) -replace "`r`n", "`n"
}
$base     = ReadUtf8 "$root\deploy\cloud-init.yaml"
$hostPriv = ReadUtf8 $HostKey
$hostPub  = (ReadUtf8 "$HostKey.pub").Trim()
$script   = ReadUtf8 "$root\deploy\silart-deploy.sh"
$compose  = ReadUtf8 "$root\deploy\compose.yaml"

$extra = @"

ssh_deletekeys: true
ssh_keys:
  ed25519_private: |
$(Indent $hostPriv 4)
  ed25519_public: $hostPub

write_files:
  - path: /usr/local/bin/silart-deploy
    permissions: '0755'
    encoding: b64
    content: $([Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($script)))
  - path: /opt/silart/compose.yaml
    permissions: '0644'
    owner: deploy:deploy
    defer: true
    encoding: b64
    content: $([Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($compose)))
"@

$text = $base.TrimEnd("`n") + "`n" + ($extra -replace "`r`n", "`n") + "`n"
[IO.File]::WriteAllText($OutFile, $text, (New-Object Text.UTF8Encoding $false))
Write-Output "cloud-init: $OutFile"
Write-Output "known_hosts: silart-web $hostPub"
