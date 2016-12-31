/**
 * @overview JC3MP Whitelist System
 * @author Markus 'MarkusSR1984' Schwitz
 * @copyright (c) Division Wolf e.V. - JustLifeRPG Team
 * @license See LICENSE file
 */
'use strict';

const fs = require('fs');
const logger = require('./classes/CLogHelper');
const config = require('./whitelist.json');

const whitelisted = new Set();

logger.Init('WhiteList'); // This is the SHORT tag of your package for logmessages and logfilename

logger.log('Loaded Player Whitelist', 'info');

function parseWhitelist(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        const str = data.toString();

        const newIds = [];

        str.split('\n').forEach(line => {
            const matches = line.match(/^([0-9]+)/);

            if (matches) {
                newIds.push(matches[1]);
                whitelisted.add(matches[1]);
            }
        });

        // clear old ids
        [...whitelisted].filter(id => !newIds.includes(id)).forEach(id => whitelisted.delete(id));

        // kick everyone who's not on the whitelist
        jcmp.players.filter(player => !whitelisted.has(player.client.steamId)).forEach(player => {
            logger.log(`Player ${player.name} is connected, but is NOT on whitelist! Kicking him`, 'warn');
            player.Kick(config.kickMessage);
        });
    });
}

// initial load of the whitelist
logger.log('Loading Whitelist.', 'info');
parseWhitelist(`${__dirname}/${config.whitelistFile}`);

// set an interval to reload it.
setInterval(() => {
    logger.log('Reloading whitelist.', 'info');
    parseWhitelist(`${__dirname}/${config.whitelistFile}`);
}, config.refreshInterval * 1000); // refreshInterval is in seconds

jcmp.events.Add('ClientConnected', client => {
    if (whitelisted.has(client.steamId)) {
        logger.log(`Player ${client.name} is on whitelist! let him join`, 'info');
    } else {
        logger.log(`Player ${client.name} is NOT on whitelist! Kick him`, 'warn');
        client.Kick(config.kickMessage);
    }
});
