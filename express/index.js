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

    // 通过next方法进行迭代路由和中间件
    let index = 0
    function next(err) {
      // 如果数组全部迭代完 还没有找到 说明路径不存在
      if(index === app.routes.length) return res.end(`Cannot ${m} ${pathname}`)
      let {method, path, handler} = app.routes[index++] // 每次调用next就应该去下一个layer

      if(err) {
        if(handler.length === 4) {
          // 如果有错误 就应该就去匹配错误中间件, 错误中间件的参数是4
          handler(err, req, res, next)
        } else {
          next(err) // 没有匹配到就讲err继续传递进去 继续走下一个layer继续判断
        }
      } else {
        if(method === 'middle') { // 处理中间件
          // app.use('/')  use('/name') user('/name/hello')
          if(path === '/' || path === pathname || pathname.startsWith(path + '/')) {
            handler(req, res, next) // 如果匹配到就吧next到权限转交给 handler 需要再handler中手动执行才会继续匹配
          } else  {
            next() // 如果这个中间件没有匹配到 那么继续走下一层匹配
          }
  
        } else { // 处理路由
            if((method = m || method == 'all') || (path === pathname || path === '*')) {
              handler(req, res)
            } else {
              next()
            }
        }
      }
      
    }
    next()
  }

  /**
   * 存放路由 => 根据防范和
   */
  app.routes = []

  app.use = function(path, handler) {
    if(typeof handler !== 'function') {
      handler = path 
      path = '/'
    }
    let layer = {
      method: 'middle', // method市middle表示他是一个中间爱你就爱你 
      path,
      handler
    }
    app.routes.push(layer) // 将中间件放到容器内
  }
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

