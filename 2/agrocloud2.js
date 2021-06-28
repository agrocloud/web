const express = require('express')
const app = express()
const port = 3000

let ejs = require('ejs');
app.use(express.static('./'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views',__dirname+'/');


app.get('/', (req, res) => {
res.render('index.html')

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})