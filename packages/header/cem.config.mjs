
export default {
  /** Globs to analyze */
  globs: [
    './src/checkbox.component.ts',
  ],
  outdir: './',
  /** Run in watch mode, runs on file changes */
  /** Include third party custom elements manifests */
  dependencies: true,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: true,

}
