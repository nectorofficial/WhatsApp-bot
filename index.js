const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// Add express to handle port binding
const app = express();
const PORT = process.env.PORT || 3000;

// Basic route to keep the app alive
app.get('/', (req, res) => {
    res.send('🤖 WhatsApp Bot is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Your session data from Pastebin
const sessionData = {
    "noiseKey": {
        "private": {
            "type": "Buffer",
            "data": "oNcQ1IIyfyL+8EJvZGG4jVRbOdLHi2eZq2byeIsqFEo="
        },
        "public": {
            "type": "Buffer",
            "data": "XF7dUEChHtKP2U4F1OONDb2a9AzQMTMgDvMex3yZiys="
        }
    },
    "pairingEphemeralKeyPair": {
        "private": {
            "type": "Buffer",
            "data": "6J+tc1eWJVl1BLCO+X9JGjZ+bp5BgEpuHNU/yXIxwU8="
        },
        "public": {
            "type": "Buffer",
            "data": "LKtKAbuSTkIDI/hs4xy8U76IqAq5bytd3JtTUn5nwY="
        }
    },
    "signedIdentityKey": {
        "private": {
            "type": "Buffer",
            "data": "uBp3BOMSKq9AQnpnhJ3vM8bKnCwG6MJmUbWANSqF3nw="
        },
        "public": {
            "type": "Buffer",
            "data": "sYNeKHJb07CyHBseyeVINkbWDyEuVmkb4ci8nQaZt1I="
        }
    },
    "signedPreKey": {
        "keyPair": {
            "private": {
                "type": "Buffer",
                "data": "uMfkdqlEfSNG/q9PPEJUc6VT93rgMeUuTKHRwERG0lA="
            },
            "public": {
                "type": "Buffer",
                "data": "YbEvWBcdqjUwq1GnnWkw4nBUIxT6Q+yRv/JSXOxvFc="
            }
        },
        "signature": {
            "type": "Buffer",
            "data": "al5+W2SDFm4Pv34OTOD3Sek+CIUI1ll8wF/1O19qcNDiM6XfC3BFSTjZt8X2yGrSjD3hlBMxSThq++xaAEYAw=="
        },
        "keyId": 1
    },
    "registrationId": 86,
    "advSecretKey": "azH1H/Rec2+ZrFSi9HiZ6bvI3pOnkLIPIw9/Xm/Ft4w=",
    "processedHistoryMessages": [
        {
            "key": {
                "remoteJid": "254798283074@s.whatsapp.net",
                "fromMe": true,
                "id": "A54D91E974018F3F7E6C357DD7EC3FDC"
            },
            "messageTimestamp": 1763792162
        },
        {
            "key": {
                "remoteJid": "254798283074@s.whatsapp.net",
                "fromMe": true,
                "id": "A5B93E9ADF15B74C7BA5CE67CCB4ADB"
            },
            "messageTimestamp": 1763792162
        },
        {
            "key": {
                "remoteJid": "254798283074@s.whatsapp.net",
                "fromMe": true,
                "id": "A55F68ACF1ABE3DAEE4A8EF6944106FD"
            },
            "messageTimestamp": 1763792162
        },
        {
            "key": {
                "remoteJid": "254798283074@s.whatsapp.net",
                "fromMe": true,
                "id": "A5600B0629ED4C841DEFE2C86D6570D5"
            },
            "messageTimestamp": 1763792164
        }
    ],
    "nextPreKeyId": 813,
    "firstUnuploadedPreKeyId": 813,
    "accountSyncCounter": 1,
    "accountSettings": {
        "unarchiveChats": false
    },
    "registered": true,
    "pairingCode": "NECTOR01",
    "me": {
        "id": "254798283074:10@s.whatsapp.net",
        "name": "naaaah",
        "lid": "126178186772598:10@lid"
    },
    "account": {
        "details": "CN3x8+sCEJOqhckGGAEgACgA",
        "accountSignatureKey": "SbBhCAH4Lp65UE5z9VUttrrNSfbQchoX67lQ1jifej0Q=",
        "accountSignature": "oLqwkOrzSVE4AzOQPMXCdpueuDAPzWOOLPUIKEKxx3Sbox1N2d/igICOhx0v5XjxK2n03NeiHRFoXdw4k9ZCA==",
        "deviceSignature": "86rbjydmJ6oDDZRBm01dQditeq6JfC/2OfMbKmDCeYzsi+HYc6IfCf3iD1KgG9umJod7xIoWXzVQ+7gJNfq5AQ=="
    },
    "signalIdentities": [
        {
            "identifier": {
                "name": "254798283074:10@s.whatsapp.net",
                "deviceId": 0
            },
            "identifierKey": {
                "type": "Buffer",
                "data": "BUmwYQgB+C6euROc/VVLba6zUn20HIaF+u5UNY4n3o9E"
            }
        }
    ],
    "platform": "smba",
    "routingInfo": {
        "type": "Buffer",
        "data": "CAIICAgS"
    },
    "lastAccountSyncTimestamp": 1763792161,
    "lastPropHash": "2V77qU",
    "myAppStateKeyId": "AAAAAAEmH"
};

const client = new Client({
    session: sessionData,
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR Code generated (if session fails):');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Bot is ONLINE!');
    console.log('🤖 All features activated!');
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const command = msg.body.toLowerCase();

    // !typing - Shows typing for 5 seconds
    if (command === '!typing') {
        await chat.sendStateTyping();
        setTimeout(async () => {
            await chat.clearState();
            msg.reply('Finished typing for 5 seconds! 🕐');
        }, 5000);
    }

    // !tagall - Tags everyone in group
    if (command === '!tagall' && chat.isGroup) {
        let text = "📢 Attention everyone: ";
        let mentions = [];
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }

    // !play - Play command
    if (command === '!play') {
        msg.reply('🎮 Play command activated! Use this for games or media sharing.');
    }

    // !help - Shows all commands
    if (command === '!help') {
        const helpText = `
🤖 *BOT COMMANDS MENU*

*!typing* - Shows typing indicator for 5 seconds
*!tagall* - Tags all members in a group
*!play* - Activates play command
*!help* - Shows this help menu

Bot is powered by whatsapp-web.js 🚀
        `;
        msg.reply(helpText);
    }
});

client.on('auth_failure', () => {
    console.log('❌ Session failed, generating new QR code...');
});

client.initialize();

console.log('🔄 Starting WhatsApp Bot...');
