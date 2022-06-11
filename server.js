var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号，例如：node server.js xxxx')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('接收到请求，请求路径为：' + pathWithQuery)
    // 静态服务器
    response.statusCode = 200
    // 默认首页是index.html
    const filePath = path === '/' ? '/index.html' : path;
    // 获取后缀，设置类型
    const suffix = filePath.substring(filePath.lastIndexOf('.')); 
    const fileType = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.json':'text/json',
        '.xml':'text/xml',
        '.png':'image/png',
        '.jpg':'image/jpg',
        '.jpeg':'image/jpeg',
    }
    // 防止错误类型，所有默认没有在哈希中找到的，就设置为html
    response.setHeader('Content-Type', `${fileType[suffix] || 'text/html'};charset=utf-8`)
    
    // 文件不存在的处理
    let content;
    try{
        content = fs.readFileSync(`public${p}`)
    }catch(error){
        content = '文件不存在';
        response.statusCode = 404
    }
    response.write(content)
    response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n 可以通过该地址访问： http://localhost:' + port)