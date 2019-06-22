'use strict';
const gulp = require('gulp');
const del = require('del');
var webpack = require('webpack');
var gutil = require('gulp-util');
const webserver = require('gulp-webserver');

const env = process.env.NODE_ENV || 'development';
const server = require('./config/' + env);

gulp.task('clean', function (done) {
    del(['./dist/1.0.0/*.js', './dist/1.0.0/*.css', './dist/1.0.0/*.map']);
    done();
});

gulp.task('webpack', function (done) {
    var webpackConfig = require(process.cwd() + '/webpack.config')
    webpack(
        webpackConfig,
        function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);

            var jsonStats = stats.toJson();
            if (jsonStats.errors.length > 0) {
                var errs =
                    jsonStats.errors.map(function (e) {
                        gutil.log('[Webpack error] ' + e)
                    });
                throw new gutil.PluginError("webpack", "Webpack errors, see log");
            }
            if (jsonStats.warnings.length > 0) {
                var errs =
                    jsonStats.warnings.map(function (e) {
                        gutil.log('[Webpack warning] ' + e)
                    });

            }
            gutil.log("[Webpack]\n", stats.toString('minimal'));
            done();
        });

});

gulp.task('webserver', () => {
    gulp.src('.')
        .pipe(webserver({
            host: server.host,
            port: server.port,
            livereload: false,
            directoryListing: false,
            open: true,
            fallback: './dist/1.0.0/index.html'
        }));
});

gulp.task('serve', gulp.series('clean', 'webpack', 'webserver'));

gulp.task('build', gulp.series('clean', 'webpack'));