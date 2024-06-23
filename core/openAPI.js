const OpenAI = require('openai');
let { chatGptAPIKey } = require('./../env/credentials.js');

module.exports = async function openAIApi(pageContent){
    const oaInstance = new OpenAI.OpenAI({
        apiKey: chatGptAPIKey
    });
    let answerRules = `1- Answer must be english, 2- Detect the SEO Problems and give advices, 3- Advices must be as an ordered list.(No humanly conversation only answer please!) Here is content:`

	try {
        const response = await oaInstance.chat.completions.create({
            model: 'gpt-3.5-turbo', 
            messages: [{
                role: "system",
                content: "You are a helpful assistant."
            },{
                role: "user",
                content: answerRules + pageContent
            }]
        });
	

        // Process and return the response
        console.log(response); 
        return response;
    } catch (error) {
        console.error(error); // Handle any errors
        throw error; // Rethrow the error for further handling if needed
    }
}