const { series, parallel, watch } = require('gulp')
const path = require('path')

const { buildWxss, copyFiles, clean, copy } = require('./build')

const SRC_PATH = path.resolve(__dirname, '../src')
const DIST_PATH = path.resolve(__dirname, '../dist')
const EXAMPLES_PATH = path.resolve(__dirname, '../examples/dist')


module.exports = {
  dev: series(
    clean(EXAMPLES_PATH),
    parallel(
      buildWxss(SRC_PATH, EXAMPLES_PATH),
      copyFiles(SRC_PATH, EXAMPLES_PATH)
    )
  ),
  build: series(
    clean(DIST_PATH),
    parallel(
      buildWxss(SRC_PATH, DIST_PATH),
      copyFiles(SRC_PATH, DIST_PATH)
    )
  ),
  watch: parallel(
    () => {
      watch(`${SRC_PATH}/**/*.js`, copy(SRC_PATH, EXAMPLES_PATH, 'js')),
      watch(`${SRC_PATH}/**/*.json`, copy(SRC_PATH, EXAMPLES_PATH, 'json')),
      watch(`${SRC_PATH}/**/*.wxs`, copy(SRC_PATH, EXAMPLES_PATH, 'wxs')),
      watch(`${SRC_PATH}/**/*.wxml`, copy(SRC_PATH, EXAMPLES_PATH, 'wxml')),
      watch([`${SRC_PATH}/**/*.less`, `!${SRC_PATH}/assets/blue.less`], buildWxss(SRC_PATH, EXAMPLES_PATH))
    }
  )
}
