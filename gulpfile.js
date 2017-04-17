// gulp
var gulp = require('gulp');

// util
var gutil = require('gulp-util');

// sass
var sass = require('gulp-sass');

// plumber
var plumber = require('gulp-plumber');

// browser sync
var browserSync = require('browser-sync').create();


/**
 * Compiler Sass
 */

// main sass files
var sassMainFiles = [
    'sass/**/*.scss',
];

gulp.task('sass', function () {
    gulp.src(sassMainFiles)
        .pipe(plumber())
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(''))
        .pipe(browserSync.stream());
});


/**
 * Browser sync server
 */
var browserSyncFiles = [
    '**/*.php',
    'assets/**',
    'js/**',
    'locais.json',

    '!node_modules/',
    '!node_modules/**',
    '!.git',
];

// execute server and sass compilers
gulp.task('server', ['sass'], function () {

    // browser sync configs
    browserSync.init({
        proxy: 'http://localhost/googlemaps/',
        notify: false,
        open: false,
    });

    // sass main theme
    gulp.watch(sassMainFiles, ['sass']);

    // general files
    gulp.watch(browserSyncFiles).on('change', browserSync.reload);

});

// default task gulp
gulp.task('default', ['server']);