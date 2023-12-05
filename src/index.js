import openai from '../config/openai.js';
import colors from 'colors';
import readlineSync from 'readline-sync';


async function main() {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));

  const chatHistory = []; // Store conversation history

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      // Construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Add latest user input
      messages.push({ role: 'user', content: userInput });

      // Call the API with user input & history
      const completion = await openai.chat.completions.create({
      model:"gpt-4-1106-preview",
      messages: messages
      })

      // Get completion text/content
      const completionText = completion.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('GPT-4-1106-PREVIEW: ') + completionText);
        return;
      }

      console.log(colors.green('GPT-4-1106-PREVIEW: ') + completionText);

      // Update history with user input and assistant response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();