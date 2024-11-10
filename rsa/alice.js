const crypto = require("crypto");
const fs = require("fs");

const message = "I want some apples";


const privateKey = fs.readFileSync("private.pem", "utf8");

const signature = crypto.sign("sha256", Buffer.from(message), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
});

console.log("Signature:", signature.toString("hex"));
console.log("Message:", message);
