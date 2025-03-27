require('dotenv').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const axios = require('axios');


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))

bot.command('stop', (ctx) => {
  ctx.reply('Bot parado!');
  bot.stop();
});

bot.hears('eita', async (ctx) => { ctx.reply('eita o que, porra') });

async function currentTime() {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

async function morning() {
  try {
    const response = await axios.get('https://nekos.best/api/v2/yawn');
    const gifUrl = response.data.results[0].url;
    bot.telegram.sendAnimation(process.env.CHAT_ID, gifUrl, { caption: '/ᐠ - ˕ -マ oyahooo!' });
  } catch (error) {
    console.error('Erro:', error);
    return "Não consegui buscar a imagem no momento"
  }
}

setInterval(async () => {
  const now = await currentTime();
  if (now === "07:30:00") {
    const ctx = await bot.telegram.getChat(process.env.CHAT_ID);
    await morning(ctx);
  } else {
    console.log("Ainda não é hora de dar bom dia");
  }
}, 1000);;

bot.launch();