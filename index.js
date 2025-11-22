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

// === PASTE YOUR PASTEBIN SESSION STRING HERE ===
const sessionString = `nector~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05jUTFJSXlmeUwrOEVKdlpHRzRqVlJiT2RMSGkyZVpxMmJ5ZXNJcUZFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWEY3ZFVFQ2hIdEtQMlU0RjFPT05EYjJhOUF6UU1UTWdEdk1leDN5Wml5cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Sit0YzFlV0pWbDFCTENPK1g5SkdqWiticDVCZ0VwdUhOVS95WEl4d1U4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMS3RLQWJ1U1RrSURJL2hzNHh5OFU3NklpQXE1Ynl0ZDNKdFRVblU1bndZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCcDNCT01TS3E5QVFucG5oSjN2TThiS25Dd0c2TUptVWJXQU5TcUYzbnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNZTmVLSEpiMDdDeUhCc2V5ZVZJTmtiV0R5RXVWbWtiNGNpOG5RYVp0MUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU1ma2RxbEVmU05HL3E5UFBFSlVDNlZUOTNyZ01lVXVUS0hSd0VSRzBsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWJFdldCY2RxalV3cTFHbm5Xa3c0bkJVSXhUNlEreVJ2L0pTWElPeHZGYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFsNStXMlNERm00UHYzNE9UT0QzU2VrK0NJVUkxbGw4d0YvMU8xOXFjTkRpTTZYZkMzQkZTVGpDWnQ4WDJ5R3JTakQzaGxCTXhTVGhxKyt4YUFFWUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODYsImFkdlNlY3JldEtleSI6ImF6SDFIL1JlYzIrWnJGU2k5SGlaNmJ2STNwT25rTElQSXc5L1htL0Z0NHc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzk4MjgzMDc0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1NEQ5MUU5NzQwMThGM0Y3RTZDMzU3REQ3RUMzRkRDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NjM3OTIxNjJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5ODI4MzA3NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNUI5M0U5QURGMTVCNzRDN0JBQTVDRTY3Q0NCNEFEQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzYzNzkyMTYyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTgyODMwNzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTU1RjY4QUNGMUFCRTNEQUVFNEE4RUY2OTQ0MTA2RkQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc2Mzc5MjE2Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzk4MjgzMDc0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1NjAwQjA2MjlFRDRDODQxREVGRTJDODZENjU3MEQ1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NjM3OTIxNjR9XSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTkVDVE9SMDEiLCJtZSI6eyJpZCI6IjI1NDc5ODI4MzA3NDoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJuYWFhaCIsImxpZCI6IjEyNjE3ODE4Njc3MjU5ODoxMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ04zeDgrc0NFSk9xaGNrR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNiQmhDQUg0THA2NUU1ejlWVXR0cnJOU2ZiUWNob1g2N2xRMWppZmVqMFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im9McXdrT3J6U1ZFNEF6UU9RUE1YQ2RwdWV1REFQeldPT0xQVUlLRUt4eDNTYm94MU4yZC9pZ0lDT2h4MHY1WGp4SzJuMDNOZWlIUkZvWGR3NGs5WkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI4NnJianlkbUo2b0REWlJCbTAxZFFkaXRlcTZKZkMvMk9mTWJLbURDZVl6c2krSFljNklmQ2YzaUQxS2dHOXVtSm9kN3hJb1dYelZRKzdnSk5mcTVBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5ODI4MzA3NDoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVbXdZUWdCK0M2ZXVST2MvVlZMYmE2elVuMjBISWFGK3U1VU5ZNG4zbzlFIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQ0FnUyJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NjM3OTIxNjEsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRW1IIn0=`;

// Function to parse the session string
function parseSessionString(sessionStr) {
    try {
        // Remove the "nector~" prefix if present
        const base64Data = sessionStr.replace('nector~', '');
        // Convert base64 to JSON
        const jsonStr = Buffer.from(base64Data, 'base64').toString('utf8');
        return JSON.parse(jsonStr);
    } catch (error) {
        console.log('❌ Error parsing session string:', error.message);
        return null;
    }
}

// Parse the session
const sessionData = parseSessionString(sessionString);

const client = new Client({
    session: sessionData,
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('❌ Session failed. QR Code generated:');
    qrcode.generate(qr, { small: true });
    console.log('📱 Scan this QR code with your phone');
});

client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ONLINE and READY!');
    console.log('📱 Connected to: ' + (sessionData.me?.name || 'Your Account'));
    console.log('🤖 Commands: !typing, !tagall, !play, !help');
});

client.on('authenticated', (session) => {
    console.log('🔑 AUTHENTICATED SUCCESSFULLY!');
});

client.on('auth_failure', (msg) => {
    console.log('❌ AUTHENTICATION FAILED:', msg);
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
console.log('🔄 Starting WhatsApp Bot with Session...');
