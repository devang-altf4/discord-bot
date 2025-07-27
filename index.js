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
const triggerWords = ["hello", "hi", "hey", "greetings", "sup", "yo", "namaste", "bonjour", "hola", "aloha", "ciao"];
const matchedWord = triggerWords.find(word => messageContent.includes(word));

if (matchedWord) {
    // Capitalize first letter for better appearance
    const capitalizedWord = matchedWord.charAt(0).toUpperCase() + matchedWord.slice(1);
    message.reply(`${capitalizedWord}! I'm a devangs bot.`);
        console.log(`Message from ${message.author.username}: ${message.content}`);
    }

});

client.login(process.env.BOTLOGINTOKEN);