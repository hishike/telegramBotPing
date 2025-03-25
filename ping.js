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


bot.hears('eita', async (ctx) => {ctx.reply ('eita o que, porra')});

bot.hears(/bom dia/i, async (ctx) => {
    try {
        const response = await axios.get('https://nekos.best/api/v2/yawn');
        const gifUrl = response.data.results[0].url;
        await ctx.replyWithAnimation(gifUrl,{caption:'/ᐠ - ˕ -マ   oyahooo!'});
    } catch (error) {
      console.error('Erro:', error);
      ctx.reply('Não consegui buscar a imagem no momento.');
    }
  });

  bot.launch();