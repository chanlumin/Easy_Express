// 中间件 use  
// 中间件 在执行路由之前 要做一些处理工作 中间件必须在路由前面
// 中间件可以扩展一些方法
let express = require('./express')


let app = express()

// use方法第一个参数如果不写 默认就是/
app.use('/', (req, res, next)=> {
  console.log('middleware')
  next()
})
app.use((req, res, next)=> {
  console.log('middleware2')
  next()
})
app.use('/name', (req, res, next)=> {
  console.log('middle 3')
  
})
app.get('/name/a', (req, res)=> {
  res.end('哈哈哈')
})

app.get('/age', (req, res)=> {
  res.setHeader('Content-type', 'text/html;charset=utf8')
  res.end(`年龄9岁`)
})

app.listen('7777', ()=> {
  console.log(`server start 7777`)
})