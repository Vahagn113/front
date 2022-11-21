/*
import pkg from 'gulp';
const { src ,dest } = pkg;
import dartSass from 'sass';
const sass = require('gulp-sass')(require('sass'));
import csso from 'gulp-csso';
import include from 'gulp-file-include';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import sync from 'browser-sync';
*/


const {src, dest, series,watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const include = require('gulp-file-include')
const csso = require('gulp-csso');
const sync = require('browser-sync').create();
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

function filesCopy(){
  return src('src/**/*.{png,js,html,css}')

  .pipe(dest('dist'))
}
function html() {
  return  src('src/**.html')
    .pipe(include({
      prefix:'@@'
    }))

    .pipe(dest('dist'))
}


function scss (){
  return src('src/**.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions']  
    
  }))
  .pipe(concat('css/style.css'))
  .pipe(dest('dist'))

}

function del() { 
  return src('dist/**/*.{html,css}' ,{read:false})

  .pipe(clean());
}


function dev(){
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/**.scss', {events:'all'},series(scss)).on('change', sync.reload)


}



exports.build = series(del,filesCopy,scss, html)
exports.dev = series(del,scss,html,dev)
exports.del = del;