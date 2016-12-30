
// DO NOT EDIT *******************
'use strict';
config = module.exports;
config.whitelist = [];
// DO NOT EDIT *******************


// White List config
// You can ADD UIDs on the fly. Config gets reloaded with each joining player.
// BUT ATTENTION! This is no performant way! use it only with small whitelists up to ~ 30 - 50 entrys
// If you need more entrys, please write your onw Whitelist package witch will not reload this file with each player connect
// Here You can Edit some values

// Kickmessage
config.kickmessage = 'Sorry, you are not on our whitelist';

// WHITELIST
// Behind are 2 Examples, copy the line and add all steam64 ID of the player you want to give access to your server
// All other players get Kicked when they try to connect
config.whitelist.push('76561198134887934') // MarkusSR1984
config.whitelist.push('01234567891234567') // Some other Example UID 