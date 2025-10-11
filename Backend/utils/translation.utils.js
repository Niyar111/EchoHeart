const { TranslationServiceClient } = require('@google-cloud/translate');

const translationClient = new TranslationServiceClient();
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID; 
const LOCATION = 'global'; 

const translateText = async (text, sourceLang, targetLang) => {
    if (!text || text.trim() === '') return '';

    try {
        if (!PROJECT_ID) {
            console.error('Google Translation API Error: GOOGLE_CLOUD_PROJECT_ID is missing.');
            return null;
        }
        
        const request = {
            parent: `projects/${PROJECT_ID}/locations/${LOCATION}`,
            contents: [text],
            sourceLanguageCode: sourceLang,
            targetLanguageCode: targetLang,
        };

        const [response] = await translationClient.translateText(request);
        
        return response.translations[0].translatedText; 

    } catch (error) {
        console.error('Google Translation API Fatal Error:', error.message);
        return null; 
    }
};

module.exports = { translateText };