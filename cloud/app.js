// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 根据不同的客户端，返回不同的vtt下载链接
app.get('/link', function(req, res) {
	var link;
	var userAgent = req.headers['user-agent'].toLowerCase();
	if (userAgent.indexOf('android') > -1) {
		link = 'market://details?id=com.tencent.mm';
	} else if (userAgent.indexOf('iphone') > -1) {
		link = 'https://itunes.apple.com/app/id440650698';
	} else if (userAgent.indexOf('ipad') > -1) {
		link = 'https://itunes.apple.com/app/id443871575';
	} else {
		link = 'http://www.sensedevil.com/games.html';
	}
	
	res.writeHead(301, {"Location": link});
	res.write("如果浏览器不能正常跳转，请点<a href=\"" + link + "\">这里</a>。");
    res.end();
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();