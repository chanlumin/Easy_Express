[TOC]

# 
1. express() => createApplication() 
2. createApplication 里面返回一个app
> let app = express() 
```
let app = (req, res) => {
  res.end('Cannot')
}
return app
```
3. app.listen是吧app传入创建一个Server进行监听等
```
app.listen = function( ){
  let server = http.createServer(app)
  server.listen(...arguments);
}
```

4. app.get => 用来存储服务端自定义的请求方法,路径,和请求函数 

  - 通过app这个监听函数监听客户端的请求方法,请求路径.
  - 对比路由中的请求方法和请求路径. 如果相同执行回调函数
  - 否则返回res.end(`Cant ${method} ${path}`)

> curl -X POST http://localhost:3002/ curl发送post 方法

