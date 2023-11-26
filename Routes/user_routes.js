const router = require('express').Router()
const {user_controller} = require('../Controller')

router.post('/login', async(req, res,next) => {
    await user_controller.login(req, res,next)
})
router.post('/register', async(req, res,next) => {
    response = await user_controller.register(req, res,next)
    
})

module.exports = router