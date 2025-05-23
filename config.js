const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌☆",
    ownerNumber: process.env.OWNER_NUMBER || "263710781795",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU02ZVptMTRpeFR2Um5kV0ZINUVZL3RwbytVRWNWdUVON1FwWEh3Yk9tRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDFXNXRKTTRGdWZPU0QxMDBQZnlmN2FjQ1ZkZFJjOVR5R1NMTEpZampuYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSVNGVXpPcW5wN0NDRmNhQWwydlZIVjdrRGpKUGtabHByTTQ5WUhValUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1MEUva1BsMjdhc2djaWxFU21tT0R5V1hyNXlpeW0reUd2UVUrSGUzZVRZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklML3N0ZHB0d3R3SDR5UXlPcjMweG1vVUtEZWFVd0EzdFBBNjJiWno2a2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxQT0tBZnFJcXhHSjZEd3lGRUhyNS9ncG41K3hwZXUzN00yYXR6MDVkejg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0QrRDlOTmdxSld3cHkweE1SYzJ2eUZkZytpU0hXUHdLQVhnOWVYU0JYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0c3RXk0Ry9BKy9CbEVheGM4QlI1aFp1N3plbHFaYzZZQUpTcDh3S0xGdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRmRHhxQVpCNnJ5cVB2Rm1aMmxEV0IyY2ZYNzdPbGNBeUZTOEpieG1sZ1Bka2pGcUVYejVhcm1ITWMwckRqdlIzVUdLWE5qRVNQaWM2M1JiMTNQU2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiIyYnlhcG43a3I5bDlKcTdtVndWZkd4dU04VEJtdGNXMmQydVFIbHBsVHR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJaN1lTV0NSRSIsIm1lIjp7ImlkIjoiMjYzNzEwNzgxNzk1OjU1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkLfwnZSF8J2RjCIsImxpZCI6IjU5NDkwMTk2MDE3MzIwOjU1QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0xPL1JZUW9QbTJ3QVlZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiN2Y4MFRPRWlyOXpwQWx6SlhwMVJXaE1KMEpqQXUrbUI1OWJaTXNxdTNoaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoieGsrVzMvZllEVjJyQzBBVHMraDd2bHNaRW9JdlIvTWFDQXhpOFZFeWJXM2JocDIvMlJyV2lXaWFLSEF3SlQ3L3VtNGJiVmJKR2RuZXVnUHlobjdDREE9PSIsImRldmljZVNpZ25hdHVyZSI6IldzSTluV2lzYnRYblVSNUVwdk1mWTNJOHdmMjRDRlFtWnJNOXNqaUQ2dlBrS2ZNTGxFSzdBUDdwVmd2UlhjdTFZZDZBN3ZUMVphSmNOa2pQcUpOVmlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzEwNzgxNzk1OjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmUzL05FemhJcS9jNlFKY3lWNmRVVm9UQ2RDWXdMdnBnZWZXMlRMS3J0NFoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTczMDczNCwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9LcSJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
