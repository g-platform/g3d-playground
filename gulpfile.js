const gulp = require('gulp');
const glob = require('glob');
const dalaran = require('dalaran');
const fs = require('fs-extra');

const tasks = dalaran.applicationTasks({
    demo: './src',
    dist: './dist',
    port: 3001,
    react: true,
    loaders: [{
        test: /\.glsl$/,
        use: 'raw-loader'
    }, {
        test: /\.playground.js$/,
        use: 'raw-loader'
    }, {
        test: /\.txt.vue$/,
        use: 'raw-loader'
    }, {
        test: /\.txt.js$/,
        use: 'raw-loader'
    }],
    devCors: true,
    commonsChunk: false
});

gulp.task('dev', ['samples'], tasks.dev);

gulp.task('build', ['samples'], tasks.build);

gulp.task('samples', function () {
    const files = glob.sync('./src/samples/**/*.playground.js').map(
        f => f.substring(14, f.lastIndexOf('.playground.js'))
    );
    const obj = {};
    files.forEach(function (file) {
        const dirs = file.split('/');
        const fileName = dirs.pop();
        let target = obj;
        dirs.forEach(function (dir) {
            if (!target[dir]) {
                target[dir] = {};
            }
            target = target[dir];
        });
        target[fileName] = '<<<' + file + '>>>'
    });

    let str = JSON.stringify(obj, null, 2);
    str = str.replace(/\"<<</g, 'require("./');
    str = str.replace(/>>>\"/g, '.playground.js")');
    str = 'module.exports = ' + str;

    fs.outputFileSync('./src/samples/index.js', str);
});