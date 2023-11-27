const { promisePool } = require('./connect');
const convertor = require('../utils/database_to_json')
const create_poll = async (title, description, user_id, questions) => {
    try {
        await promisePool.query('START TRANSACTION');
        //Poll insertion will go her 
        const response = await promisePool.query('INSERT INTO polls (title, user_id, description) VALUES (?, ?, ?);', [title, user_id, description]);
        const poll_id = response[0].insertId;

        for (const ques of questions) {
            //question insertion will go  here
            const question_insert = await promisePool.query('INSERT INTO questions (poll_id, question_text) VALUES (?, ?);', [poll_id, ques.question]);
            const question_id = question_insert[0].insertId;

            // option insertion will go here
            const optionValues = ques.options.map(option => [question_id, option]);
            await promisePool.query('INSERT INTO options (question_id, option_text) VALUES ?;', [optionValues]);
        }

        await promisePool.query('COMMIT');
        return { 'status': true, 'message': 'poll created successfully' };
    } catch (err) {
        console.error(err);
        await promisePool.query('ROLLBACK');
        return { 'status': false, 'message': err.message || 'An error occurred during poll creation.' };
    }
};




const view_all_poll = async () => {
    try {
        const response = await promisePool.query('SELECT poll_id,title,description FROM polls');
       
        if (response.length == 0) {
            return { 'status': false, 'message': 'No polls found' };
        }
        return { 'status': true, 'message': response[0] };
    }
    catch (err) {
        
        return { 'status': false, 'message': err }
    }
}
const view_poll_of_user = async (user_id) => {
    try {
        const response = await promisePool.query('SELECT poll_id,title,description FROM polls WHERE user_id = ?', [user_id]);
        if (response.length == 0) {
            return { 'status': false, 'message': 'No polls found' };
        }
        return { 'status': true, 'message': response[0] };
    }
    catch (err) {
        return { 'status': false, 'message': err }
    }
}
const view_poll_by_user_name = async (user_name) => {
    try {
        const response = await promisePool.query('SELECT poll_id,title,description FROM polls WHERE user_id = (select user_id from users where username = ?)', [user_name]);
        if (response.length == 0) {
            return { 'status': false, 'message': 'No polls found' };
        }
        return { 'status': true, 'message': response[0] };
    }
    catch (err) {
        return { 'status': false, 'message': err }
    }
}
const view_complete_pole_by_id = async (poll_id) => {
    try {
        const query = `SELECT
    polls.poll_id,
    polls.user_id,
    polls.title AS poll_title,
    polls.created_at AS poll_created_at,
    questions.question_id,
    questions.question_text,
    options.option_id,
    options.option_text
FROM
    polls
JOIN
    questions ON polls.poll_id = questions.poll_id
JOIN
    options ON questions.question_id = options.question_id
WHERE
    polls.poll_id = ?`;
    
    const response = await promisePool.query(query, [poll_id]);
    const converted_response = convertor(response[0])
    return { 'status': true, 'message': converted_response };
    }
    catch (err) {
        return { 'status': false, 'message': err }

    }}

    module.exports = { create_poll, view_all_poll, view_poll_by_user_name, view_complete_pole_by_id,view_poll_of_user }
