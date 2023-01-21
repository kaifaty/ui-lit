import {litPlugin} from '@custom-elements-manifest/analyzer/src/features/framework-plugins/lit/lit.js'
import {jsdocExamplePlugin} from 'cem-plugin-jsdoc-example'
// import {readonlyPlugin} from 'cem-plugin-readonly'

export default {
  /** Globs to analyze */
  globs: [
    './src/components/button/button.component.ts',
    './src/components/checkbox/checkbox.component.ts',
  ],
  outdir: './docs/dist',
  /** Globs to exclude */
  //exclude: ['src/foo.js'],
  /** Directory to output CEM to */
  /** Run in dev mode, provides extra logging */
  // dev: true,
  /** Run in watch mode, runs on file changes */
  watch: true,
  /** Include third party custom elements manifests */
  dependencies: true,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: false,
  /** Enable special handling for litelement */
  litelement: true,
  plugins: [
    ...litPlugin(),
    // readonlyPlugin(),
    jsdocExamplePlugin(),
  ],

  /** Overrides default module creation: */
  /*overrideModuleCreation: ({ts, globs}) => {
    const program = ts.createProgram(globs, defaultCompilerOptions)
    const typeChecker = program.getTypeChecker()

    return program.getSourceFiles().filter(sf => globs.find(glob => sf.fileName.includes(glob)))
  },*/
}
