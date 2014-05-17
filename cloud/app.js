// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

// 根据不同的客户端，返回不同的vtt下载链接
app.get('/link', function(req, res) {
	var link;
	var userAgent = req.headers['user-agent'].toLowerCase();
	if (userAgent.indexOf('android') > -1) {
		link = 'market://details?id=com.tencent.mm';
	} else if (userAgent.indexOf('iphone') > -1) {
		link = 'http://t.cn/8sfohxY';
	} else if (userAgent.indexOf('ipad') > -1) {
		link = 'http://t.cn/8sfo20j';
	} else {
		link = 'http://www.sensedevil.com';
	}
	
	res.writeHead(301, {"Location": link});
    res.end();
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();