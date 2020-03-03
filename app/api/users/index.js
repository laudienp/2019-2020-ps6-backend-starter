const { Router }  = require('express')

const { User } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(User.get())
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router