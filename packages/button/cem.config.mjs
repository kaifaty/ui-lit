import {litPlugin} from '@custom-elements-manifest/analyzer'
export default {
  /** Globs to analyze */
  globs: [
    './src/button.component.ts',
  ],
  outdir: './',
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: true,

}
