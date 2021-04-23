//載入工具
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//設定handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定靜態檔案路由
app.use(express.static('public'))

//設定頁面內容路由
app.get('/', (req, res) => {
  //套入partial template
  res.render('index', { restaurants: restaurantList.results })
})

//設定show頁面檔案路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

//設定搜尋路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})



//啟動監聽伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})