const { promisePool } = require('./connect');
const convertor = require('../utils/database_to_json');
const reducer = require('../utils/vote_data_to_json');
const vote = async (params) => {
    try {
        const { user_id, poll_id, question } = params;
        await promisePool.query('START TRANSACTION');
        let got_error = false;
        for (const ques of question) {
            const { question_id, option_id } = ques;  

            const result = await promisePool.query(`
                INSERT INTO votes (user_id, poll_id, option_id, question_id)
                SELECT ?, ?, ?, ?
                WHERE EXISTS (
                    SELECT 1
                    FROM options
                    WHERE option_id = ? AND question_id = ?
                )
                AND EXISTS (
                    SELECT 1
                    FROM questions
                    WHERE question_id = ? AND poll_id = ?
                );
            `, [user_id, poll_id, option_id, question_id, option_id, question_id, question_id, poll_id]);  // Use correct alias here
            
            if (result[0].affectedRows === 0) {
                got_error = true;
                break;
            }
        }
        if (got_error) {
            await promisePool.query('ROLLBACK');
            return { 'status': false, 'message': 'please check options.' };
        }

        await promisePool.query('COMMIT');  
        return { 'status': true, 'message': 'Votes created successfully' };
    } catch (err) {
        console.error(err);
        await promisePool.query('ROLLBACK');
        return { 'status': false, 'message': err.message || 'An error occurred during vote creation.' };
    }
};

  

  

  
  

const result = async(poll_id)=>{
    try{
        backtick = '`'
        const response = await promisePool.query(`SELECT
        p.title AS poll_title,
        p.description AS poll_description,
        q.question_id AS question_id,
        q.question_text AS question,
        o.option_id AS option_id,
        o.option_text AS ${backtick}option${backtick},
        COUNT(v.vote_id) AS vote_count
    FROM
        questions q
    LEFT JOIN
        options o ON q.question_id = o.question_id
    LEFT JOIN
        votes v ON o.option_id = v.option_id AND q.question_id = v.question_id
    LEFT JOIN
        polls p ON q.poll_id = p.poll_id
    WHERE
        q.poll_id = ?
    GROUP BY
        p.title,
        p.description,
        q.question_id,
        q.question_text,
        o.option_id,
        o.option_text
    ORDER BY
        q.question_id,
        o.option_id;
    
    `,[poll_id])
        // const result = convertor.convert_to_json(response[0])

        return {'status':true,'message':reducer(response[0])}
    }
    catch(err){
        return {'status':false,'message':err.message}
    }
}


module.exports = {vote,result}