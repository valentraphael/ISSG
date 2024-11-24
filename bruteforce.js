const crypto = require('crypto');

const targetHash = "5531a5834816222280f20d1ef9e95f69";

function md5Hash(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

function bruteForcePin() {
    for (let pin = 0; pin <= 9999; pin++) {
        // Pad the PIN with leading zeros to ensure it's always 4 digits
        const pinString = pin.toString().padStart(4, '0');
        if (md5Hash(pinString) === targetHash) {
            console.log(`Alice's PIN is: ${pinString}`);
            return;
        }
    }
    console.log('PIN not found.');
}

bruteForcePin();
