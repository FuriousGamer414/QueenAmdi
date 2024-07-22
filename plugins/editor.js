/**
* @project_name Queen Amdi [WA Multi-device]
* @author Debraj Chanda
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @version 4.0.7
* @file  editor.js - QueenAmdi editors

© 2022 Black Amda, ANTECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { AMDI, ffmpeg, Language } = require('queen_amdi_core/dist/scripts')
const fs = require('fs');
const extractAudio = ffmpeg;
const getRandom = (ext) => { return `${Math.floor(Math.random() * 10000)}${ext}` };
const Lang = Language.getString('editor');

AMDI({ cmd: "getaudio", desc: Lang.GETAUDIODESC, type: "primary", react: "🎚️" }, (async (amdiWA) => {
    let { clearMedia, downloadMedia, input, isMedia, isTaggedOneTimeVideo, isTaggedVideo, react, reply, reply_message, sendDocument } = amdiWA.msgLayout;

    const media = await downloadMedia();
    if ((isTaggedOneTimeVideo) || (isMedia && (amdiWA.msg.message.videoMessage || media.ext == 'mp4')) || (isTaggedVideo && (media.ext == 'mp4' || reply_message.videoMessage))) {
        try {
            await react("⬇️");
            let mp3name = input ? `${input}.mp3` : `QueenAmdi-Extract-Audio-${getRandom('.mp3')}`
            await extractAudio({
                input: media.file,
                output: mp3name
            });
            await react("🔄️");
            await sendDocument(fs.readFileSync(mp3name), {quoted: true, mimetype: 'audio/mpeg', fileName: mp3name});
            fs.unlinkSync(mp3name)
            await react("✔️");
        } catch (e) {
            console.log(e);
            await reply("Error".fetchError(e), "❌", 1);
        }
    } else {
        await reply(Lang.GiveVideo, "❗");
    }
    return clearMedia(media.file);
}));
