import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const { REPOSITORY_KEY } = process.env;

export function deflattenKey(flatKey: string) {
  return flatKey.replace(/\\n/g, '\n');
}

export function validatePublicKey(pk: string) {
  try {
    if (!REPOSITORY_KEY) { throw ("env var REPOSITORY_KEY needs to be set") }
    const privateKey = deflattenKey(REPOSITORY_KEY);
    const publicKey = deflattenKey(pk);
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
    console.error('Key validation error:', error);
    return false;
  }
}
