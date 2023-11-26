const { vote_modal } = require('../Modals');
const vote = async (req, res, next) => {
    try {
        const { user_id, poll_id, question } = req.body
        if (!poll_id || !question) {
            return res.status(400).send("Please provide all the details")
        }
        else {
            for (const ques of question) {
                if (!ques.question_id || !ques.option_id) {
                    return res.status(400).send("Please provide all the details")
                }
            }
        }
        
        const response = await vote_modal.vote({ user_id, poll_id, question })
        if (response.status) {
            res.status(200).send(response.message)

        }
        else {
            res.status(400).send(response.message)
        }

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}
const result = async (req, res, next) => {
    try {
        const { poll_id } = req.body
        
        if (!poll_id) {
            return res.status(400).send("Please provide all the details")
        }
        const response = await vote_modal.result(poll_id)
        
        if (response.status == true) {
            res.status(200).send(response.message)

        }
        else {
            res.status(400).send(response.message)
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    vote, result
}