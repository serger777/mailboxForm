const gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    buble = require('gulp-buble'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

const reload = browserSync.reload;
const dir = {
    css: 'web/',
    js: 'web/',
};
const source ={
    css: 'source/_css/',
    js: 'source/_js/',
}
const path = {
    build: {
        js: dir.js,
        css: dir.css,
    },
    src: {
        js: [source.js + '**/*.js'],
        style: source.css + '**/*.scss',
    },
    watch: {
        js: [source.js + '**/*.js'],
        style: source.css + '**/*.scss',
    },
    clean: './build'
};


gulp.task('js:build', function () {
    return gulp.src('./source/_js/main.js')
        .pipe(webpackStream({
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());

});
gulp.task('style:build', function (done) {
    const pathes = [path];
    pathes.map(function (path) {
        gulp.src(path.src.style)
            // .pipe(sourcemaps.init())
            .pipe(sass()).on("error", sass.logError)
            .pipe(postcss([autoprefixer({browsers: ['last 1616 version']})]))
            .pipe(cssnano({autoprefixer: false, convertValues: false, zindex: false}))
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.build.css))
            .pipe(browserSync.stream());
    });
    done();
});

gulp.task('build', gulp.series([
     'js:build',
     'style:build',
]));


gulp.task('server', function() {

    browserSync.init({
        server: "./"
    });

    watch(path.watch.style, gulp.series('style:build'));
    watch(path.watch.js, gulp.series('js:build'));
});


const arTask = ['build', 'server'];

gulp.task('default', gulp.series(arTask));