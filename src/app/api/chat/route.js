// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const SYSTEM_PROMPT = `You are a knowledgeable and supportive Health Coach AI assistant. Your expertise covers nutrition, fitness, mental health, wellness, and general health topics. Format your responses in the following way:

1. Start with a direct answer to the question
2. Organize information using bullet points or short paragraphs
3. Use emoji icons when appropriate to make information more engaging (🏃‍♂️ for exercise, 🥗 for nutrition, etc.)
4. Break down complex health concepts into simple, easy-to-understand explanations
5. Use headers (like "Key Points:" or "Tips:") to organize longer responses
6. End with a brief, relevant health tip or actionable suggestion when appropriate

Remember to:
- Only respond to health-related questions and topics
- Politely decline to answer non-health questions
- Provide informative but general health advice (avoid prescribing specific treatments)
- Always include a brief medical disclaimer when discussing medical topics
- Encourage consulting healthcare professionals for specific medical advice

For medical topics, always include this disclaimer: "⚕️ Note: This is general health information. Please consult a healthcare professional for personalized medical advice."`;

const isHealthRelated = (text) => {
    const healthKeywords = [
        // General Health Terms
        'health', 'medical', 'fitness', 'exercise', 'diet', 'nutrition', 'wellness',
        'mental health', 'symptoms', 'disease', 'condition', 'workout', 'food',
        'sleep', 'stress', 'anxiety', 'depression', 'medication', 'therapy',
        'doctor', 'hospital', 'pain', 'injury', 'healing', 'recovery', 'vitamin',
        'supplement', 'weight', 'body', 'heart', 'brain', 'muscle', 'joint',
        'blood', 'pressure', 'diabetes', 'cancer', 'covid', 'virus', 'immune',
        
        // Pain and Discomfort
        'ache', 'hurt', 'sore', 'pain', 'painful', 'discomfort', 'cramp',
        'migraine', 'headache', 'backache', 'stomach ache', 'toothache',
        'stiff', 'stiffness', 'sprain', 'strain', 'inflammation',
        
        // Body Parts and Systems
        'head', 'neck', 'shoulder', 'arm', 'elbow', 'wrist', 'hand', 'finger',
        'chest', 'back', 'spine', 'hip', 'leg', 'knee', 'ankle', 'foot', 'toe',
        'skin', 'bone', 'nerve', 'tendon', 'ligament', 'organ', 'digestive',
        'respiratory', 'circulatory', 'stomach', 'liver', 'kidney', 'lungs',
        
        // Women's Health
        'period', 'menstrual', 'menstruation', 'pregnancy', 'prenatal', 'postnatal',
        'fertility', 'ovulation', 'gynecology', 'breast', 'cervical', 'uterus',
        'ovary', 'pms', 'menopause', 'hormones', 'endometriosis', 'pcos',
        
        // Common Symptoms
        'fever', 'cough', 'cold', 'flu', 'nausea', 'vomiting', 'diarrhea',
        'constipation', 'rash', 'itch', 'swelling', 'dizziness', 'fatigue',
        'exhaustion', 'tired', 'weakness', 'numbness', 'tingling', 'burn',
        
        // Mental and Emotional Health
        'mood', 'emotion', 'mental', 'psychological', 'psychiatric', 'therapy',
        'counseling', 'trauma', 'panic', 'phobia', 'bipolar', 'schizophrenia',
        'adhd', 'autism', 'eating disorder', 'insomnia', 'burnout', 'addiction',
        
        // Lifestyle and Prevention
        'prevention', 'screening', 'checkup', 'vaccination', 'immunization',
        'lifestyle', 'habit', 'hygiene', 'posture', 'ergonomic', 'mindfulness',
        'meditation', 'yoga', 'massage', 'rehabilitation', 'physiotherapy'
    ];
    
    const lowercaseText = text.toLowerCase();
    return healthKeywords.some(keyword => lowercaseText.includes(keyword));
};

export async function POST(request) {
    try {
        if (!request.body) {
            throw new Error('Request body is empty');
        }

        const { message } = await request.json();
        
        if (!message) {
            throw new Error('Message is required');
        }

        // Check if the question is health-related
        if (!isHealthRelated(message)) {
            return new Response(JSON.stringify({ 
                text: "I apologize, but I can only assist with health-related questions and topics. Please feel free to ask me any questions about your health, diet, exercise, or well-being."
            }), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ 
                            text: `${SYSTEM_PROMPT}\n\nUser's health question: ${message}` 
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error('Empty or invalid response from Gemini API');
        }

        return new Response(JSON.stringify({ 
            text: data.candidates[0].content.parts[0].text 
        }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Chat API Error:', {
            message: error.message,
            stack: error.stack,
            body: request.body ? 'exists' : 'missing'
        });
        
        return new Response(JSON.stringify({ 
            error: error.message,
            details: 'An error occurred while processing your request'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 