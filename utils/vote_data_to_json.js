const reduct_output = (original_response)=>{
    const {poll_title, poll_description} = original_response[0];
    const processedData = original_response.reduce((result, entry) => {
        const { poll_title, poll_description, question_id, question, option_id, option, vote_count } = entry;
        let questionObj = result.find(q => q.id === question_id);
        if (!questionObj) {
            questionObj = {
                id: question_id,
                question,
                options: []
            };
            result.push(questionObj);
        }
        questionObj.options.push({
            id: option_id,
            option,
            vote_count
        });

        return result;
    }, []);

    const finalJson = {
        status: true,
        message: {
            title: poll_title,
            description: poll_description,
            questions: processedData
        }
    };
    return finalJson
}

module.exports = reduct_output;