import { promises } from 'fs'
import { execSync } from 'child_process'

const { readFile, writeFile } = promises

const OUT_PATH = './dist/index.js'
const SRC_PATH = './src/index.ts'
const META_PATH = './src/userscript-meta.ts'
const SCRIPT_PATH = './manga-loader.user.js'

const p = (first, ...args) => (console.log(first, ...args), first)

const start = async () => {
  p('STARTING BUILD')

  // build new one
  const extraArgs =
    process.env.NODE_ENV === 'development' ? '--no-minify' : '--experimental-scope-hoisting'
  const cmd = `parcel build "${SRC_PATH}" -o "${OUT_PATH}" --detailed-report --no-source-maps ${extraArgs}`
  p('EXEC>', cmd, '')
  p(execSync(cmd).toString())

  // generate userscript
  const buffers = await Promise.all([readFile(META_PATH), readFile(OUT_PATH)])
  writeFile(SCRIPT_PATH, Buffer.concat(buffers))
  p('GENERATED', SCRIPT_PATH)
}

start()
