//'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    cleanCss = require('gulp-clean-css'),
    rev = require('gulp-rev'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    webserver = require('gulp-webserver');

// directories
var appDir = "dist",
    mainDir = "/",
    assetsDir = appDir + '/assets/',
    sourceDir = 'src/',
    sassFiles = sourceDir + 'stylesheets/',
    fontsFiles = sourceDir + 'fonts/',
    imgFiles = sourceDir + 'img/',
    cssAssetsDir = assetsDir + 'css/',
    fontsDir = assetsDir + 'fonts/';
    imgDir = assetsDir + 'img/';

var options = {
    sass: {}
};

gulp.task('sass:build', function() {
    return gulp.src(sassFiles + 'all.scss')
        .pipe(rename('all.css'))
        .pipe(sourcemaps.init())
        .pipe(sass(options.sass).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Explorer >= 11'] }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssAssetsDir));
});

gulp.task('sass:build:minify', function() {
    return gulp.src(sassFiles + 'all.scss')
        .pipe(rename('all.css'))
        .pipe(sourcemaps.init())
        .pipe(sass(options.sass).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'Explorer >= 11'] }))
        .pipe(cleanCss({ compatibility: 'ie11' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssAssetsDir));
});


gulp.task('sass:build_and_sync', function() {
    runSequence('sass:build');
});

gulp.task('copy:fonts', function() {
    gulp.src(fontsFiles + '**')
        .pipe(gulp.dest(fontsDir));
});

gulp.task('copy:img', function() {
    gulp.src(imgFiles + '**')
        .pipe(gulp.dest(imgDir));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', function() {
    options.sass = {
        sourceComments: true
    };

    gulp.watch('src/stylesheets/**/*.scss', ['sass:build_and_sync']);
});

gulp.task('default', ['sass:build', 'copy:img', 'copy:fonts', 'webserver', 'watch']);
