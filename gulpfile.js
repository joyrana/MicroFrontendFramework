'use strict';
const gulp = require('gulp');
const del = require('del');
var webpack = require('webpack');
var PluginError = require('plugin-error');
var browserSync = require('browser-sync').create();
var log = require('fancy-log');

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
            if (err) throw new PluginError("webpack", err);

            var jsonStats = stats.toJson();
            if (jsonStats.errors.length > 0) {
                var errs =
                    jsonStats.errors.map(function (e) {
                        log.error('[Webpack error] ' + e)
                    });
                throw new PluginError("webpack", "Webpack errors, see log");
            }
            if (jsonStats.warnings.length > 0) {
                var errs =
                    jsonStats.warnings.map(function (e) {
                        log('[Webpack warning] ' + e)
                    });

            }
            log("[Webpack]\n", stats.toString('minimal'));
            done();
        });

});

gulp.task('browser-sync', function (done) {
    browserSync.init({
        ui: {
            port: 4200
        },
        server: {
            baseDir: ["./", "./dist/1.0.0"]   //added multiple directories 
        }
    });
    gulp.watch("./dist/1.0.0/*.js").on('change', browserSync.reload);
    gulp.watch("./dist/1.0.0/*.html").on('change', browserSync.reload);
    done();
});

gulp.task('serve', gulp.series('clean', 'webpack', 'browser-sync'));

gulp.task('build', gulp.series('clean', 'webpack'));