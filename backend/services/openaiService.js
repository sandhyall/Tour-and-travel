// import OpenAI from "openai";

// // GROQ CLIENT
// const groq = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });

// export const generateTravelReply = async (message) => {
//   try {
//     const completion =
//       await groq.chat.completions.create({
//         // GROQ FREE MODELS
//         // "llama3-70b-8192"
//         // "mixtral-8x7b-32768"
//         // "gemma2-9b-it"

//         model: "llama3-70b-8192",

//         messages: [
//           {
//             role: "system",
//             content: `
// You are an AI travel assistant for a Nepal tour and trekking company.

// Your responsibilities:
// - Help users choose trekking and tour packages
// - Explain pricing and itineraries
// - Recommend destinations in Nepal, Bhutan, and Tibet
// - Help with travel planning
// - Explain permits and visa information
// - Encourage bookings professionally
// - Be friendly, professional, and concise

// Popular destinations include:
// - Everest Base Camp
// - Annapurna Circuit
// - Langtang Valley
// - Manaslu Trek
// - Chitwan Jungle Safari
// - Pokhara
// - Lumbini
// - Bhutan cultural tours
// - Tibet overland tours

// If users ask about pricing:
// - Mention that final prices depend on season, group size, and package type.

// If users ask about difficulty:
// - Explain trekking difficulty clearly.

// Always sound like a professional travel consultant.
// `,
//           },

//           {
//             role: "user",
//             content: message,
//           },
//         ],

//         temperature: 0.7,
//         max_tokens: 1000,
//       });

//     return completion.choices[0].message.content;
//   } catch (err) {
//     console.error("GROQ AI ERROR:", err.message);

//     return "Sorry, the AI assistant is temporarily unavailable.";
//   }
// };


// services/openaiService.js
import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const contactDetails = `
---
📞 **Contact Wales Trek and Travel**
- Phone: +977-9851233710
- Email: info@walestourandtravel.com
- WhatsApp: +977-9851233710
`;

export const generateTravelReply = async (message) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ FIXED MODEL

      messages: [
        {
          role: "system",
          content: `
You are a professional travel assistant for Wales Tour and Travel, specializing in adventure tourism across Nepal, Bhutan, and Tibet.

## Response Style:
- Keep answers SHORT and concise (2-3 paragraphs maximum)
- Use clear formatting with bullet points when listing information
- Be friendly, professional, and enthusiastic
- Avoid lengthy explanations - provide key details only

## Primary Responsibilities:
1. **Package Guidance**: Help users select trekking and tour packages based on fitness level, time, and budget
2. **Destination Expertise**: Everest Base Camp, Annapurna Circuit, Langtang Valley, Manaslu, Chitwan Safari, Pokhara, Lumbini, Bhutan tours, Tibet adventures
3. **Booking Assistance**: Guide through booking process and answer availability questions
4. **Pricing Info**: Provide general guidance noting exact quotes depend on season, group size, and dates
5. **Itinerary Details**: Explain difficulty levels, schedules, acclimatization, best seasons
6. **Travel Logistics**: Permits, visas, weather, preparation tips
7. **Personalized Recommendations**: Suggest based on preferences and experience level

## Key Guidelines:
- Be concise and clear
- Use numbered lists or bullet points for clarity
- When unsure about specifics, suggest contacting the booking team
- Always acknowledge questions professionally
- Prioritize safety and realistic expectations

## Out-of-Scope Handling:
For technical issues, medical advice, non-travel topics, or complex customizations:
"I appreciate your question! This is outside my area. Please reach out to our team directly for the best assistance."

Keep responses informative, conversational, and brief.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
      max_tokens: 350,
    });

    const aiResponse = completion.choices[0].message.content;
    return aiResponse + "\n" + contactDetails;
  } catch (err) {
    console.error("GROQ ERROR FULL:", err.response?.data || err.message);

    return "Sorry, AI is temporarily unavailable. Please contact us at info@walestourandtravel.com";
  }
};



