// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 根据不同的客户端，返回不同的vtt下载链接
app.get('/link', function(req, res) {
	var REDIRECT = 0;
	var OPEN_IN_BROWSER = 1;
	
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
			link = 'http://fusion.qq.com/cgi-bin/qzapps/unified_jump?appid=10611855&from=wx&isTimeline=false&actionFlag=0%810%859ms=pname%3Dcom.sensedevil.VTT%26versioncode%3D2%26actionflag%3D0%26channelid%3D';
		} else if(userAgent.indexOf('qq') > -1) {
			//android版qq
			type = OPEN_IN_BROWSER;
			browser = '用浏览器打开';
		}  
		else {
			link = 'market://details?id=com.sensedevil.VTT';
		}
	} else if (userAgent.indexOf('iphone') > -1) {
		link = 'http://mp.weixin.qq.com/mp/redirect?url=https://itunes.apple.com/app/id440650698';
	} else if (userAgent.indexOf('ipad') > -1) {
		link = 'http://mp.weixin.qq.com/mp/redirect?url=https://itunes.apple.com/app/id443871575';
	} else {
		link = 'http://www.wandoujia.com/apps/com.sensedevil.VTT'; //'http://www.sensedevil.com/games.html';
	}
	
	if(type == REDIRECT) {
		res.writeHead(301, {"Location": link});
	} else {
		res.setHeader("Content-Type", "text/html; charset=utf-8");
		if(type == OPEN_IN_BROWSER) {
			res.write('<html><head><title>虚拟乒乓球</title><meta name="viewport" content="width=device-width, initial-scale=1"/><style type="text/css">.arrow{position:fixed;z-index:9;right:10} .text{position:fixed;z-index:1}</style></head><body><div class="arrow"><img src="arrow.png"></div><div class="text"><label><p>请点击<span style="color:red">右上角的按钮</span></p></label><label><p>选择<span style="color:red">「' + browser + '」</span>即可正常下载</p></label></div></body></html>');
		}	
	}
   	res.end();
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();