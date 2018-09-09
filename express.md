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


# 中间件
1. 中间件处理HTTP请求的函数 => 用于在路由的上面
  - 一个中间件处理玩请求和响应可以把相应的数据再传递给下一个中间件
  - 回调函数的next表示接受其他中间件的调用,函数体中的next(),表示将请求传递
  - 可以根据路径来区分返回执行不同的中间件


# 错误中间件
1. 如果中间件出错了 他就会跳过所有的中间件 然后直接走到错误中间件


## 获取函数到参数个数 只需要 func.length 就行