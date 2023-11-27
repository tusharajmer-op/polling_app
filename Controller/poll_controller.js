const { response } = require('express');
const {poll_modal} = require('../Modals')   
const createpoll = async (req, res,next) => {
    try{
    
    if (!req.body.title || !req.body.description ) {
        for (questions in req.body.questions){
            if(!questions.question){
                return res.status(400).send("Please provide all the details")
            }
        }
        return res.status(400).send("Please provide all the details")
    }
    const { title, description,questions,user_id } = req.body;
    const response = await poll_modal.create_poll(title, description, user_id, questions)
    if (response.status == true) {
        return res.status(200).send(response.message)
    }
    return res.status(400).send(response.message)
    
}catch(e){
    return res.status(500).send("something went wrong")
}

}
const viewpoll = async (req, res,next) => {
    try{
        
    const {user_id} = req.body
    const response = await poll_modal.view_poll_of_user(user_id)
    if(response.status == true){
        return res.status(200).send(response.message)
    }
    return res.status(400).send(response.message)

    }catch(e){
        return res.status(500).send("something went wrong")
    }
}
const viewpollbyid = async (req, res,next) => {
    try{
        
    const {poll_id} = req.body
    
    const response = await poll_modal.view_complete_pole_by_id(poll_id)
    if(response.status == true){
        return res.status(200).send(response.message)
    }
    return res.status(400).send(response)

    }catch(e){
        return res.status(500).send("something went wrong")
    }
}
const viewallpoll = async (req, res,next) => {
    try{
        
        const {user_id} = req.body
        const response = await poll_modal.view_all_poll()
        if(response.status == true){
            return res.status(200).send(response.message)
        }
        return res.status(400).send(response.message)
    
        }catch(e){
            return res.status(500).send("something went wrong")
        }
}
const viewpollbyusername=async(req,res,next)=>{
    try{
        const {uname} = req.params

        const response = await poll_modal.view_poll_by_user_name(uname)
        if(response.status == true){
            return res.status(200).send(response.message)
        }
        return res.status(400).send(response.message)
    
        }catch(e){
            return res.status(500).send("something went wrong")
        }

}
module.exports = { createpoll, viewpoll, viewpollbyid, viewallpoll, viewpollbyusername}