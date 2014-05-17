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
	var FAIL_TO_REDIRECT = 2;
	
	var type = REDIRECT;
	var link;
	var browser;
	var userAgent = req.headers['user-agent'].toLowerCase();
	if (userAgent.indexOf('android') > -1) {
		if (userAgent.indexOf('weibo') > -1) {
			//android版微博
			type = OPEN_IN_BROWSER;
			browser = '浏览器打开';
		} else if(userAgent.indexOf('micromessenger') > -1) {
			//android版微信
			type = OPEN_IN_BROWSER;
			browser = '在浏览器中打开';
		} else if(userAgent.indexOf('qq') > -1) {
			//android版qq
			type = OPEN_IN_BROWSER;
			browser = '用浏览器打开';
		}  
		else {
			link = 'market://details?id=com.tencent.mm';
		}
	} else if (userAgent.indexOf('iphone') > -1) {
		if(userAgent.indexOf('micromessenger') > -1) {
			type = FAIL_TO_REDIRECT;
		}
		
		link = 'https://itunes.apple.com/app/id440650698';
	} else if (userAgent.indexOf('ipad') > -1) {
		if(userAgent.indexOf('micromessenger') > -1) {
			type = FAIL_TO_REDIRECT;
		}
		
		link = 'https://itunes.apple.com/app/id443871575';
	} else {
		link = 'http://www.sensedevil.com/games.html';
	}
	
	if(type == REDIRECT) {
		res.writeHead(301, {"Location": link});
	} else {
		res.setHeader("Content-Type", "text/html; charset=utf-8");
		if(type == OPEN_IN_BROWSER) {
			res.write('<html><title>虚拟乒乓球</title><body><label><p>请点击<span style="color:red">右上角的按钮</span></p></label><label><p>选择<span style="color:red">「' + browser + '」</span>即可正常下载</p></label></body></html>');
		} else {
			//FAIL_TO_REDIRECT
			res.write('<html><title>虚拟乒乓球</title><body>由于浏览器不能自动跳转，请点击<a href="' + link + '">《虚拟乒乓球》</a>来下载。</body></html>');
		}	
	}
   	res.end();
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();