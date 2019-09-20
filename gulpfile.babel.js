import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import Proxy from 'gulp-connect-proxy';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import clean from 'gulp-clean';
import opt from 'minimist'; //获取命令行参数
import apiUrl from './config.json'; //配置不同环境下的API接口
import path from 'path';
import 'babel-polyfill';

let args = process.argv,
    argsOpt = opt(args),
    baseCMD = `${args[2]}` == 'undefined' ? console.log('请加入要使用的gulp --[dev || test || repro || pro]打包命令') : `${args[2]}`,
    baseCMDStr = baseCMD.match(/[^--]+/g)[0],
    baseCMDStrArr = baseCMDStr.split(':'),
    basePort = baseCMDStrArr[1] || 8080,
    livePort = baseCMDStrArr[2] || 35729,
    webpackConfig = require(`./webpack.config.babel.js`), //根据gulp参数获取不同webpack配置文件
    devPath = `src/`, //开发目录
    dest = `dest/`, //本地编译后目录
    assets = dest, //默认目录为本地dest目录
    paths = [`${devPath}/*.html`, `${devPath}/**/*.+(scss|js|jpg|gif|png|svg|vue)`, `!${devPath}/**/config.js`]; //文件路劲
	
let stringSrc = (filename, string) => { //把特定的字符转成流
    let src = require('stream').Readable({
        objectMode: true
    })
    src._read = function() {
        this.push(new gutil.File({
            cwd: '',
            base: '',
            path: filename,
            contents: new Buffer(string)
        }));
        this.push(null);
    }
    return src;
};
webpackConfig.default.output.path = path.resolve(__dirname, assets); //设置webpackconfig输出路径
webpackConfig.default.output.publicPath =  argsOpt.test ? `/` : (argsOpt.repro || argsOpt.pro ? `/` :  `/${assets}`); //设置webpackconfig公共输出路径

gulp.task('clean', () => {
    if(argsOpt.dev){ return; }
    return gulp.src(assets).pipe(clean());
});
let showErrors = arr => {
    let str = '',beepNum = 0;
    arr.forEach((v) => {
        beepNum ++;
        str += `\n++ Error ${beepNum} ++++\n${v.message ?v.message : v}`;
    });
    gutil.beep(beepNum);
    gutil.log(gutil.colors.red(`[Errors => ${arr.length}]${str}`));
};

//监听文件变化且自动刷新文件
gulp.task('watch', () => {
    let watcher = gulp.watch(paths, ['livereload']);

    watcher.on('change', event => {
        console.log(gutil.colors.yellow(`File ${event.path} was ${event.type}, running tasks...`));
    });
});

//自动刷新任务
gulp.task('livereload', ['webpack'], () => {
    gulp.start('help');
    return gulp.src(paths)
        //'changed' 任务需要提前知道目标目录位置
        // 才能找出哪些文件是被修改过的
        .pipe(changed(assets))
        .pipe(plumber())
        .pipe(connect.reload());

});

gulp.task("constants",()=>{
	//取出对应的配置信息 不同环境 不同请求地址
	let envConfig, conConfig;
	if (argsOpt.pro) {
	    envConfig = apiUrl.pro;
	} else {
	    envConfig = apiUrl.dev;
	}
	
	 conConfig = `const baseUrl = ${JSON.stringify(envConfig)}; export {baseUrl};`;
	 //base_url.js文件
	 return stringSrc('base_url.js', conConfig)
	     .pipe(gulp.dest(`${devPath}/js/modules/`));
	
});

//webpack打包任务
gulp.task('webpack', ['clean'],cb => {
    console.log(gutil.colors.cyan('+++++++++++++ webpack Starting +++++++++++++++++'));
    return webpack(webpackConfig.default, (err, stats) => {
        if(stats.compilation.errors.length){
            let errArr = stats.compilation.errors;
            showErrors(errArr);
        }
        gulp.src(assets + '/**/.DS_Store').pipe(clean({force: true}));
        console.log(gutil.colors.cyan('+++++++++++++ webpack Finished +++++++++++++++++'));
        cb();
    });
    
});
gulp.task('default', ['constants'], () => {
   if(baseCMDStrArr[0] == 'dev'){
       gulp.start('server', 'watch', 'help');
   } else {
       gulp.start('webpack','help');
   }
});
//静态服务器 默认端口为：8080
gulp.task('server', () => {
    connect.server({
        port: basePort,
        livereload: {
            port: livePort
        },
		middleware: (connect, opt) => {
			opt.route = '/proxy';
			var proxy = new Proxy(opt);
			console.log(123123123,proxy)
			return [proxy];
		}
    });
});
gulp.task('help', () => {
   
});