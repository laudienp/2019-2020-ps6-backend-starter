const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    try {
        res.status(200).json(Question.get())
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', (req, res) => {
    try {
      console.log("xx"+req.params.id)
      res.status(200).json(Question.getById(req.params.id))
    } catch (err) {
      res.status(500).json(err)
    }
  })

router.post('/', (req, res) => {
  try {
    const question = Question.create({ ...req.body })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:id', (req, res) => {
  try {
    res.status(200).json(Question.delete(req.params.id))
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router