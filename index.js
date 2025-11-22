const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🤖 WhatsApp Bot is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Use LocalAuth instead of session data - more reliable
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('🔐 SCAN THIS QR CODE WITH YOUR PHONE:');
    qrcode.generate(qr, { small: true });
    console.log('📱 Go to WhatsApp → Settings → Linked Devices → Link a Device');
    console.log('📸 Scan the QR code above');
});

client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ONLINE and READY!');
    console.log('🤖 Commands: !typing, !tagall, !play, !help');
});

client.on('message', async (msg) => {
    console.log(`📨 Message from ${msg.from}: ${msg.body}`);
    
    const chat = await msg.getChat();
    const command = msg.body.toLowerCase();

    if (command === '!ping') {
        msg.reply('🏓 Pong! Bot is working!');
    }

    if (command === '!typing') {
        await chat.sendStateTyping();
        setTimeout(async () => {
            await chat.clearState();
            msg.reply('Finished typing for 5 seconds! ⏰');
        }, 5000);
    }

    if (command === '!tagall' && chat.isGroup) {
        let text = "📢 @everyone ";
        let mentions = [];
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }

    if (command === '!play') {
        msg.reply('🎮 Play command activated!');
    }

    if (command === '!help') {
        const helpText = `
🤖 *BOT COMMANDS*
• !ping - Test if bot is responsive
• !typing - Shows typing for 5 sec
• !tagall - Tags everyone (groups only)
• !play - Play command
• !help - This menu

Bot is live! 🚀
        `;
        msg.reply(helpText);
    }
});

client.initialize();
console.log('🔄 Starting WhatsApp Bot...');
