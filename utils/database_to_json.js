function convertData(inputData) {
        const transformedData = {
            title: inputData[0].poll_title,
            description: inputData[0].poll_description,
            questions: [],
        };
    
        const optionsMap = {};
    
        inputData.forEach((entry) => {
            const { question_id, question_text, option_id, option_text } = entry;
            if (!optionsMap[question_id]) {
                optionsMap[question_id] = [{
                    'id' : option_id,
                    'option' : option_text,
                }];
                transformedData.questions.push({
                    id: question_id,
                    question: question_text,
                    options: optionsMap[question_id],
                });
            } else {
                
                optionsMap[question_id].push({
                    'id' : option_id,
                    'option' : option_text,
                }
                )}
        });
    
        return transformedData;
    }

    module.exports = convertData;