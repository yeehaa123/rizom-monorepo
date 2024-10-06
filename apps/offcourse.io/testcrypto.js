import crypto from 'crypto';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

function validateKeyPair(publicKey, privateKey) {
  try {
    // Create a test message
    const testMessage = 'Test message for key validation';

    // Sign the message with the private key
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(testMessage);
    const signature = signer.sign(privateKey, 'base64');

    // Verify the signature with the public key
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(testMessage);
    const isValid = verifier.verify(publicKey, signature, 'base64');

    return isValid;
  } catch (error) {
    console.error('Key validation error:', error.message);
    return false;
  }
}

// Usage example

// Read keys from files (adjust paths as necessary)
const publicKey = fs.readFileSync('public_key.pem', 'utf8');


const envPrivateKey = process.env.REGISTRY_KEY.replace(/\\n/g, '\n');
const isEnvKeyValid = validateKeyPair(publicKey, envPrivateKey);
console.log('Is the env key pair valid?', isEnvKeyValid);
