'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plugins = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    history = require('connect-history-api-fallback'),
    browserSync = require('browser-sync').create();


var paths = {
    data: './src/data/*.json',
    templates: './src/app/**/*.html',
    sass: './src/styles/**/*.scss',
    images: './src/images/**/*.{png,jpg,svg,gif,ico}',
    vendor_css: [
        'bower_components/angular-carousel/dist/angular-carousel.css'
    ],
    scripts: './src/app/**/*.js',
    vendor_scripts: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/lodash/lodash.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/slick-carousel/slick/slick.js',
        'bower_components/angular-slick-carousel/dist/angular-slick.js',
        'bower_components/angular-pageslide-directive/dist/angular-pageslide-directive.js'
    ],
    dist: './dist'
};

gulp.task('vendorJS', function() {
    return gulp.src(paths.vendor_scripts)
       .pipe(concat('vendor.js'))
       .pipe(uglify())
       .pipe(gulp.dest(paths.dist + '/static/js/libs'))
});

gulp.task('appJS', function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.angularFilesort())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/static/js'))
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist + '/static/css'));
});

gulp.task('vendorCSS', function() {
    return gulp.src(paths.vendor_css)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.dist + '/static/css'))

});

gulp.task('templates', function () {

    return gulp.src(paths.templates)
        .pipe(gulp.dest(paths.dist + "/templates"));
});
gulp.task('images', function() {
    gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + "/static/images"));
});
gulp.task('data', function() {
    gulp.src(paths.data)
        .pipe(gulp.dest(paths.dist + "/static/data"));
});
gulp.task('serve', ['sass', 'vendorCSS', 'vendorJS', 'appJS', 'templates','images', 'index', 'data'], function() {
    browserSync.init({
        server: {
            baseDir: paths.dist,
            //baseDir: [".tmp", "./src"],
            middleware: [history()],
            routes: {
                "/bower_components": "bower_components"
            }
        }
    });

    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.data, ['data']);
    gulp.watch(paths.scripts, ['appJS']);
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch('src/index.html', ['index']);
});

gulp.task('index', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(paths.dist))
});

gulp.task('build', function(cb) {
    runSequence(
        'sass', 'vendorCSS', 'vendorJS', 'appJS', 'templates','images', 'data', 'index'
    )
});
