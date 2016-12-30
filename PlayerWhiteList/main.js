/**
 * @overview JC3MP Whitelist System
 * @author Markus 'MarkusSR1984' Schwitz
 * @copyright (c) Division Wolf e.V. - JustLifeRPG Team
 * @license See LICENSE file
 */
'use strict';

const logger = require('./classes/CLogHelper');

logger.Init('WhiteList'); // This is the SHORT tag of your package for logmessages and logfilename

logger.log('Loaded Player Whitelist', 'info');

jcmp.events.Add('ClientConnected', client => {
    if (require('./config').whitelist.indexOf(client.steamId) > -1) {
        logger.log(`Player ${client.name} is on whitelist! let him join`, 'info');
    } else {
        logger.log(`Player ${client.name} is NOT on whitelist! Kick him`, 'warn');
        client.Kick(require('./config').kickmessage);
    }
});
