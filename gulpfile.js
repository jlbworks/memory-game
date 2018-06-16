var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

// default when you run gulp
gulp.task('default', ['styles', 'scripts', 'lint'], function() {
  gulp.watch('sass/**/*.sass', ['styles']);
  gulp.watch('js/**/*.js', ['lint']);
  gulp.watch('./index.html').on('change', browserSync.reload);
  browserSync.init({
    server: "./"
  });

  console.log('Hi Support Team! You\'re awesome.');
});

// sass task
gulp.task('styles', function() {
  gulp.src('sass/**/main.sass')
    // compress & minify
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    // add autoprefixers
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    // rename file
    .pipe(rename({
      basename: 'styles',
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});

// scripts task including es6 syntax
gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
    .pipe(babel())
    .pipe(uglify());
});

// lint task to check syntax
gulp.task('lint', function() {
  return gulp.src(['js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
