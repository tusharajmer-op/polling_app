const router = require('express').Router()
const {user_controller} = require('../Controller')

router.post('/login', async(req, res) => {
    await user_controller.login(req, res)
})
router.post('/register', async(req, res,next) => {
    response = await user_controller.register(req, res,next)
    
})
router.get('/logout', async(req, res) => {
    await user_controller.logout(req, res)
    res.send('Hello World! from user_routes.js logout')
})
module.exports = router