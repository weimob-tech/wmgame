import typescript from 'rollup-plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import JSON from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'

function getExternal(){
  return []
}

export default () => {
  const template = function (fileName) {
    return {
      input: `./src/${fileName}.js`,
      output: [
        {
          format: 'cjs',
          file: `lib/${fileName}.js`
        }
      ],
      plugins: [
        commonjs(),
        nodeResolve(),
        JSON(),
        typescript(
          {
            exclude: 'node_modules/**',
            typescript: require('typescript')
          }
        )
      ],
      external:getExternal()
    }
  }

  const moduleNames = ['h5/wmgame', 'xcx/wmgame', 'xyx/wmgame']
  const config = []

  moduleNames.forEach((mouldeName) => {
    config.push(template(mouldeName))
  })

  config.forEach(val=>{
    val.plugins.push(
      terser({
        mangle:true
      }))
  })

  config.push({
    input: "./types/index.ts",
    output: [{ file: "lib/types/index.d.ts", format: "es" }],
    plugins: [dts()],
  })

  return config
}
