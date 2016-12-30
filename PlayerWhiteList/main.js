/**
 * @overview JC3MP Whitelist System
 * @author Markus 'MarkusSR1984' Schwitz
 * @copyright (c) Division Wolf e.V. - JustLifeRPG Team
 * @license See LICENSE file
 */
'use strict';

const fs = require('fs');
// const logger = require('./classes/CLogHelper');
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
    });
}

// initial load of the whitelist
parseWhitelist(`${__dirname}/${config.whitelistFile}`);
logger.log('Whitelist loaded.', 'info');

// set an interval to reload it.
setInterval(() => {
    parseWhitelist(`${__dirname}/${config.whitelistFile}`);
    logger.log('Whitelist reloaded.', 'info');
}, config.refreshInterval * 1000); // refreshInterval is in seconds

jcmp.events.Add('ClientConnected', client => {
    if (whitelisted.has(client.steamId)) {
        logger.log(`Player ${client.name} is on whitelist! let him join`, 'info');
    } else {
        logger.log(`Player ${client.name} is NOT on whitelist! Kick him`, 'warn');
        client.Kick(config.kickMessage);
    }
});
