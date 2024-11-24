const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// URL of the password list
const passwordListUrl = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt';

// Function to fetch the password list from the URL
function fetchPasswordList(url, callback) {
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            callback(null, data);
        });
    }).on('error', (err) => {
        callback(err, null);
    });
}

// Function to perform the dictionary attack
function dictionaryAttack(passwordList) {
    const passwords = passwordList.split('\n'); // Split the list based on enters

    for (const password of passwords) {
        // Generate the MD5 hash of the password
        const hash = crypto.createHash('md5').update(password.trim()).digest('hex');

        // Compare with the target hash
        if (hash === targetHash) {
            return password.trim();
        }
    }
    return null; // Return null if no match is found
}

fetchPasswordList(passwordListUrl, (err, data) => {
    if (err) {
        console.error('Error fetching the password list:', err);
        return;
    }

    console.log('Password list fetched successfully.');
    const password = dictionaryAttack(data);

    if (password) {
        console.log(`Bob's password is: ${password}`);
    } else {
        console.log('Password not found in the dictionary.');
    }
});