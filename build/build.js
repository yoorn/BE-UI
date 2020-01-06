const { src, dest, parallel } = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const del = require('del')


const buildWxss = (srcPath, destPath) => () => {
  return src(`${srcPath}/**/*.less`)
    .pipe(less())
    .pipe(rename(file => {
      file.extname = '.wxss'
    }))
    .pipe(dest(destPath))
}

const copyFiles = (srcPath, destPath) => {
  return parallel(
    copy(srcPath, destPath, 'wxml'),
    copy(srcPath, destPath, 'js'),
    copy(srcPath, destPath, 'json'),
    copy(srcPath, destPath, 'png'),
    copy(srcPath, destPath, 'wxs'),
  )
}

const clean = (delPath) => () => {
  return del(delPath, {
    force: true
  })
}

const copy = (srcPath, destPath, ext) => () => {
  return src(`${srcPath}/**/*.${ext}`)
      .pipe(dest(destPath))
}

module.exports = {
  buildWxss,
  copyFiles,
  clean,
  copy
}