import { readFile } from 'node:fs/promises'

const manifest = JSON.parse(await readFile('package.json', 'utf8'))
const patch = await readFile('cordis.patch.yml', 'utf8')
const client = await readFile('lib/client.js', 'utf8')
const host = await readFile('lib/index.js', 'utf8')
const readme = await readFile('README.md', 'utf8')
const readmeZh = await readFile('README.zh.md', 'utf8')
const previewPaths = [
  'docs/images/wallpaper-blue.webp',
  'docs/images/wallpaper-pink.webp',
  'docs/images/personalization-settings.webp',
]
await Promise.all(previewPaths.map(path => readFile(path)))

const checks = [
  [manifest.name === 'dsh-custom-skin', 'package name'],
  [manifest.dsh?.bundle?.patch === './cordis.patch.yml', 'bundle declaration'],
  [manifest.dsh?.client?.platform === 'web', 'client declaration'],
  [patch.includes('name: dsh-custom-skin'), 'bundle patch'],
  [client.includes('window.__ModuleLoader__.load({ id: "dsh-custom-skin"'), 'client loader handoff'],
  [client.includes('IndexedDB') || client.includes('indexedDB'), 'browser image storage'],
  [client.includes('settings.section'), 'settings registration'],
  [host.includes('function apply'), 'host plugin export'],
  [manifest.files?.includes('docs/images/*.webp'), 'packaged preview images'],
  [manifest.files?.includes('README.zh.md'), 'packaged Chinese README'],
  [previewPaths.every(path => readme.includes(`./${path}`)), 'English README previews'],
  [previewPaths.every(path => readmeZh.includes(`./${path}`)), 'Chinese README previews'],
]

for (const [ok, label] of checks) {
  if (!ok) throw new Error(`check failed: ${label}`)
}
console.log(`dsh-custom-skin: ${checks.length} artifact checks passed`)
