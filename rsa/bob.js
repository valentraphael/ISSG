const crypto = require("crypto");
const fs = require("fs");


const message = "I want some apples";


const signature = "1037ccd1ea40b27b833e397074476e5567ff2fc18dd5b7e63cd9865a5b00ea4a168fa468d7402e07405fc6380316f131580f017c688fc0ff48ac1cfb3e567cddfff03cd3ea408da70cb6de179666932ff1db22eb2fe86842a3043efdc9632c1ed92923cea4260159d783fa51caa6cf61f285b93f201c6e8043da80a189657993aa9245dadaea2e2e7820f3bdf72a3d85de3e88cdc5a96e7cfbc5602bc6b5bf946a09ffa7656d9bdce5908fec61766775c9abdc882b133f13e56d4b13bce919aeafb799b3dc8869cf9f9a047de27de7b0afd8ae853fec1bd83c991fc85a8552788defcd8f10d61ebef6f4f95a5b117a735f5deab42bc2352ea92aae9d14ad4040";


const publicKey = fs.readFileSync("public.pem", "utf8");


const isVerified = crypto.verify(
    "sha256",
    Buffer.from(message),
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(signature, "hex")
);

console.log("Signature Verification:", isVerified);
console.log("Message:", message);
