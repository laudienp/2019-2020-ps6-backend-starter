const { Router } = require('express')

const { Quiz } = require('../../models')
const { Question } = require('../../models')
const QuestionRouter = require('./questions')

const router = new Router()

router.get('/', (req, res) => {
  try {
    quizz = Quiz.get()
    qlist = Question.get()



    res.status(200).json(quizz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    console.log("xx"+req.params.quizId)
    quizz = Quiz.getById(req.params.quizId)
    qlist = Question.get()
    qselected = []
    qlist.forEach(element => {
      if(element.quizId == req.params.quizId)
        qselected.push(element)
    });
    quizz.questions = qselected
    res.status(200).json(quizz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch(err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch(err) {
    res.status(500).json(err)
  }
})

router.use('/:quizId/questions', QuestionRouter)

module.exports = router
