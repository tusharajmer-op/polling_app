const router = require('express').Router()
const {check_incoming_request} = require('../Middleware')
const {poll_controller} = require('../Controller')
router.all('*',(req,res,next)=>{
   check_incoming_request(req,res,next)})

router.post('/create', async(req, res,next) => {
    console.log("in poll routes")
    await poll_controller.createpoll(req,res,next)
})
router.get('/view', async(req, res,next) => {
    await poll_controller.viewpoll(req,res,next)
})
router.get('/view/:uname', async(req, res,next) => {
    await poll_controller.viewpollbyusername(req,res,next)
})
router.get('/viewall',async(req,res,next)=>{
    await poll_controller.viewallpoll(req,res,next)
})
router.get('/view/poll/:poll_id', async(req, res,next) => {
    
    req.body.poll_id = req.params.poll_id
    await poll_controller.viewpollbyid(req,res,next)
})

module.exports = router