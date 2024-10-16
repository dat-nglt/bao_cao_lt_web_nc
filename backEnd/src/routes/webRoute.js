import express from 'express'
const router = express.Router()
const initWebRoute = (app) => {
  app.get('/not-found', (req, res) => {
    res.render('notFound')
  })

  app.use('*', (req, res) => {
    res.redirect('/not-found') // Chuyển hướng đến đường dẫn cụ thể
  })
}

export default initWebRoute
