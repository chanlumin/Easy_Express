let http = require('http') // 引用node的http
let url = require('url')

// express的主函数 
function createApplication() {
  // app是一个监听函数
  let app = (req, res)=> {
    // 取出每一个layer
    // 1. 获取请求的方法
    let m = req.method.toLowerCase()
    let {pathname} = url.parse(req.url, true)
    //  取出每一个layer
    for(let i = 0; i < app.routes.length; i++) {
      const {path, method, handler} = app.routes[i]
      // 请求的方法和请求的路径一样的还 才需要执行回调函数
      if((method === m || method === 'all') && (pathname === path || path === '*')) {
        handler(req, res)
      }
    }
    
    res.end(`Cannot ${m} ${pathname}`)
  }

  /**
   * 存放路由 => 根据防范和
   */
  app.routes = []
  app.all = function(path, handler) {
    let layer = {
      method: 'all', // 如果method是all表示全部匹配
      path,
      handler
    }
    app.routes.push(layer)
  }
  http.METHODS.forEach(method => {
    /**
     * app的get请求,get主要做的事情就是把请求的参数push进去维护的路由数组
     * @param {请求路径} path 
     * @param {请求方法} handler 
     */
    method = method.toLocaleLowerCase()
    app[method] = function(path, handler) {
      // 路由匹配的对象
      let layer = {
        method,
        path, 
        handler
      }
      app.routes.push(layer)

    }
  })

  
  app.listen = function() {
    let server = http.createServer(app)
    server.listen(...arguments)
  }

  return app 
}

module.exports = createApplication

