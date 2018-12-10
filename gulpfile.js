/*
 * @description:gulp任务主文件
 * @time:2018-12-07
 * @author:xiaodong.yu 
 */

//  引入gulp模块
var gulp = require('gulp');
// 引入gulp-less模块
var less = require('gulp-less');
// 引入gulp-cssnano模块
var cssnano = require('gulp-cssnano');
// 引入gulp-concat模块
var concat = require('gulp-concat');
// 引入gulp-uglify模块
var uglify = require('gulp-uglify');
// 引入gulp-htmlmin模块
var htmlmin = require('gulp-htmlmin');
// 引入browser-sync模块
var browsersync = require('browser-sync');
// 注册任务:less 编译、压缩、合并
gulp.task('style', function () {
    gulp.src(['src/style/*.less', '!src/style/_*.less'])
        .pipe(less()) // 编译less文件为css文件
        .pipe(cssnano()) // 压缩好css文件
        .pipe(gulp.dest('dist/style')) //  把css文件输出到指定的目录
        .pipe(browsersync.reload({
            stream: true
        }));
});
// js合并、压缩、混淆
gulp.task('js', function () {
    gulp.src('src/script/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
        .pipe(browsersync.reload({
            stream: true
        }));
});
// 图片复制
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browsersync.reload({
            stream: true
        }));
});
// html的压缩处理
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.reload({
            stream: true
        }));
});
// 启动一个服务监视文件的变化
gulp.task('server', function () {
    browsersync({
        server: {
            baseDir: ['dist']
        }
    }, function (err, bs) {

    });
    // 开启gulp任务监听
    gulp.watch('src/style/*.less', ['style']);
    gulp.watch('src/script/*.js', ['js']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);
});