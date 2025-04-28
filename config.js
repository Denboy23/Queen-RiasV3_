const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌☆",
    ownerNumber: process.env.OWNER_NUMBER || "26710781795",
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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU1UOUsrbk11cTJOUm90Uzk3ZTBVV2lEbnRYRlgvMkFXT2JGMkJnMlJtYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjhkT2pJVG9IZVJIUU5GeWE0Y0UwS0xsZkk0NFdGU3E0NWwyOENadTN6UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3R0lINjNMMEVTUHZvTzF2L1Z4ZmNnb3cxOE1pMnFPQ1MvMjNwanF3UmtFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVM2FyRnQrUWdocTlLaEhmZXI0UEw2WU95Vk5WeFBWOExMSUE5akFoVzBzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNGYlczMHEyVlBKd2ZSMjIxKy9FY3lGN1NzYU1TcnRUY1ZWVVJQVEN5Mm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF1TXMzVEw4dXFDTkl1R3ZUSDg1YUtQdXpDZ1F4Vm4yQ2ZPT3k0UFQ5MzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU40dGJrbTgzRkg3eFZSV2tpNk96bmZickNIc2pJcWYwa3R6ZWRoYVJudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3BmRXBpeWhPSGxNQ0xlWEhucXY1Uk80dHNtY0xCbHRLZ04wbjdsZGxEaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9ZOWs4cGdrRVBtdlNFREh4NGkxTnRITDJveW1aUGUvOFFrMTd0dEhjOHlMaG1POVgyTDlpbWVYTUpHTm83VVBHT3lTQXJHdGFBcmQ1Qk9Yam43M0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJYeVU4WnZaR3R1M0Y4WWl2b0lyMCtUZDJ1bzkyZ09mMTVEZHFqb2VxZWZRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJDTjQ0RFhLNyIsIm1lIjp7ImlkIjoiMjYzNzEwNzgxNzk1OjU3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkLfwnZSF8J2RjCIsImxpZCI6IjU5NDkwMTk2MDE3MzIwOjU3QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0xPL1JZUW9QMi93QVlZQkNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiN2Y4MFRPRWlyOXpwQWx6SlhwMVJXaE1KMEpqQXUrbUI1OWJaTXNxdTNoaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicFBtL21LNjdjMm9tS1JDSHgya0FSbDU5em9kS2ZoTDVTcVFPM3JqVC83YU05RVhScnRndDVMK3kwbmdZLzRiMUlrZWNYRHo2Q3RXV3Q4dzBSNHVHQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IkZDTTNPa3FLMW1VSXNJeHlZeGgvcU42UWx0NXZOcXhzSksxU0VXT0NINUtFQTA0QzdzR0RFbmpKc3owYUplNng4ZWZuNUdwTzJWYnd2NFV4MUM4ZkRBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzEwNzgxNzk1OjU3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmUzL05FemhJcS9jNlFKY3lWNmRVVm9UQ2RDWXdMdnBnZWZXMlRMS3J0NFoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTg3ODcwMSwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9LcSJ9",
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
