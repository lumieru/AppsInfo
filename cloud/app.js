// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 根据不同的客户端，返回不同的vtt下载链接
app.get('/link3', function(req, res) {
	var REDIRECT = 0;
	var OPEN_IN_BROWSER = 1;
	var COPY_AND_OPEN_IN_BRWOSER = 2;
	var FAIL_TO_REDIRECT = 3;
	
	var type = REDIRECT;
	var link;
	var userAgent = req.headers['user-agent'].toLowerCase();
	if (userAgent.indexOf('android') > -1) {
		if (userAgent.indexOf('weibo')) {
			//android版微博
			type = OPEN_IN_BROWSER;
		} else if(userAgent.indexOf('micromessenger')) {
			//android版微信
			type = COPY_AND_OPEN_IN_BRWOSER;
		} else if(userAgent.indexOf('qq')) {
			//android版qq
			type = OPEN_IN_BROWSER;
		}  
		else {
			link = 'market://details?id=com.tencent.mm';
		}
	} else if (userAgent.indexOf('iphone') > -1) {
		if(userAgent.indexOf('micromessenger')) {
			type = FAIL_TO_REDIRECT;
		} else {
			link = 'https://itunes.apple.com/app/id440650698';
		}
	} else if (userAgent.indexOf('ipad') > -1) {
		if(userAgent.indexOf('micromessenger')) {
			type = FAIL_TO_REDIRECT;
		} else {
			link = 'https://itunes.apple.com/app/id443871575';
		}
	} else {
		link = 'http://www.sensedevil.com/games.html';
	}
	
	if(type == REDIRECT) {
		res.writeHead(301, {"Location": link});
	} else if(type == OPEN_IN_BROWSER) {
		res.write('<html><title>下载《虚拟乒乓球》</title><body><label><p>请点击<span style="color:red">右上角的按钮</span></p></label><label><p>选择<span style="color:red">「在浏览器中打开」</span>即可正常下载</p></label></body></html>');
	} else if(type == COPY_AND_OPEN_IN_BRWOSER) {
		res.write('<html><title>下载《虚拟乒乓球》</title><body>请复制这个链接' + req.url + '，并用安卓的系统浏览器打开它，就能完成下载。</body></html>');
	} else {
		//FAIL_TO_REDIRECT
		res.write('<html><title>下载《虚拟乒乓球》</title><body>由于浏览器不能自动跳转，请点击<a href="' + link + '">《虚拟乒乓球》</a>来下载。</body></html>');
	}	
   	res.end();
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();