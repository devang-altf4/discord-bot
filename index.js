import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import axios from "axios";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Set your admin/owner ID here
const ADMIN = process.env.ADMIN; // <-- replace "ADMIN" in your .env with your actual Discord user ID (number)

client.once('ready', () => {
  console.log(`Bot is ready! Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.has(client.user)) return;

  const isOwner = message.author.id === ADMIN;

  try {
    await message.channel.sendTyping();

    // Custom system prompt for owner
    const aiPrompt = isOwner
      ? "You are responding to your creator (admin/owner). Prioritize and show respect."
      : "You are a helpful Discord bot named Devangs Bot. Keep responses concise and friendly.";

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          { role: "system", content: aiPrompt },
          { role: "user", content: message.content }
        ],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER}`,
          "Content-Type": "application/json"
        }
      }
    );

    let aiReply = response.data.choices[0].message.content.trim();
    if (isOwner) {
      aiReply = `👑 As sir devang said: ${aiReply}`;
    }
    message.reply(aiReply);
    console.log(`AI response to ${message.author.username}: ${message.content}`);

  } catch (error) {
    console.error('OpenRouter API Error:', error?.response ? error.response.data : error);
    message.reply("Sorry, I'm having trouble thinking right now. Try again later!");
  }
});

client.login(process.env.BOTLOGINTOKEN);
