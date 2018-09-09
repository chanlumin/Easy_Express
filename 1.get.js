
let express = require('./express')

// app监听函数
let app = express()
app.get('/',(req, res)=> {
  res.end('hello world')
})
// app.get('/', (req, res)=> { // req代表请求, res代表响应
//   res.send('hello world')
// })
// app.get('/age', (req,res)=> {
//   res.end('age')
// })

app.post('/', (req, res)=> {
  res.end('post end')
})

// all代表的是匹配所有的防范 * 代表匹配所有的路径 
app.all('*', (req, res) => {
  res.end(req.method + 'user')
})

app.listen(3002, ()=> {
  console.log('server start 3002')
})
