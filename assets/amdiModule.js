/**
░██████╗░██╗░░░██╗███████╗███████╗███╗░░██╗  ░█████╗░███╗░░░███╗██████╗░██╗
██╔═══██╗██║░░░██║██╔════╝██╔════╝████╗░██║  ██╔══██╗████╗░████║██╔══██╗██║
██║██╗██║██║░░░██║█████╗░░█████╗░░██╔██╗██║  ███████║██╔████╔██║██║░░██║██║
╚██████╔╝██║░░░██║██╔══╝░░██╔══╝░░██║╚████║  ██╔══██║██║╚██╔╝██║██║░░██║██║
░╚═██╔═╝░╚██████╔╝███████╗███████╗██║░╚███║  ██║░░██║██║░╚═╝░██║██████╔╝██║
░░░╚═╝░░░░╚═════╝░╚══════╝╚══════╝╚═╝░░╚══╝  ╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░╚═╝
 __  __       _ _   _       ____             _          
|  \/  |_   _| | |_(_)     |  _ \  _____   _(_) ___ ___ 
| |\/| | | | | | __| |_____| | | |/ _ \ \ / / |/ __/ _ \
| |  | | |_| | | |_| |_____| |_| |  __/\ V /| | (_|  __/
|_|  |_|\__,_|_|\__|_|     |____/ \___| \_/ |_|\___\___|
* @project_name Queen Amdi [WA Multi-device]
* @author Debraj Chanda
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @version 4.0.7
* @file  amdiModule.js - QueenAmdi bot module and Web WA connection

© 2022 Debraj Chanda, k0mraid. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const amdiWA = require('queen_amdi_core/dist/amdiCore');
const { qrDisplayDL } = require('queen_amdi_core/dist/qrDisplay');
const amdiWEB = require('queen_amdi_core/qr_code/amdiWEB');

amdiWA.start()

const events = async () => {
    const WASocket = await amdiWA.ev.on("open.connection");

    await qrDisplayDL();
    await amdiWEB.appObj();
    
    amdiWA.ev.on("connection.update", WASocket);
    amdiWA.ev.on("auth.update", WASocket);
    amdiWA.ev.on("messages.upsert", WASocket);
    
    amdiWA.ev.on("group.updates", WASocket);
    amdiWA.ev.on("call.manage", WASocket);
}
events();

const console_info = console.info
console.info = function() {
    if(!require("util").format(...arguments).includes("SessionEntry")){
        return console_info(...arguments)
    }
}
