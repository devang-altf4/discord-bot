import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], });

client.once('ready', () => {
    console.log(`Bot is ready! Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    
   const messageContent = message.content.toLowerCase();
    
    // Greeting words
    const greetingWords = ["hello", "hi", "hey", "greetings", "sup", "yo", "namaste", "bonjour", "hola", "aloha", "ciao"];
    const matchedGreeting = greetingWords.find(word => messageContent.includes(word));
    
    // Goodbye words
    const goodbyeWords = ["bye", "goodbye", "see ya", "later", "farewell", "adios", "au revoir", "ciao"];
    const matchedGoodbye = goodbyeWords.find(word => messageContent.includes(word));
    
    if (matchedGreeting) {
        const capitalizedWord = matchedGreeting.charAt(0).toUpperCase() + matchedGreeting.slice(1);
        message.reply(`${capitalizedWord}! I'm a devangs bot.`);
        console.log(`Greeting from ${message.author.username}: ${message.content}`);
    } else if (matchedGoodbye) {
        const capitalizedWord = matchedGoodbye.charAt(0).toUpperCase() + matchedGoodbye.slice(1);
        message.reply(`${capitalizedWord}! See you later!`);
        console.log(`Goodbye from ${message.author.username}: ${message.content}`);
    }
});

client.login(process.env.BOTLOGINTOKEN);