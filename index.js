import express from 'express'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const port = 3000

var articleTexts = []

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/create', (req, res) => {
  console.log('Method: ' + req.method)
  console.log(req.body)

  const articleText = req.body['articleText']

  articleTexts.push(articleText)
  res.render('index.ejs', {
    articleTexts: articleTexts
  })
})

app.post('/delete', (req, res) => {
  const deleteIndex = req.body['deleteIndex']

  articleTexts.splice(deleteIndex, 1)

  console.log(articleTexts)
  res.render('index.ejs', {
    articleTexts: articleTexts
  })
})

app.post('/save', (req, res) => {
  const editIndex = req.body['editIndex']
  const editText = req.body['editText']
  console.log('Edit index: ' + editIndex)
  console.log('Edit content: ' + editText)

  articleTexts[editIndex] = editText

  res.render('index.ejs', {
    articleTexts: articleTexts
  })
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})