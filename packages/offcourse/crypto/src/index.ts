import crypto from 'crypto';
import jwt from "jsonwebtoken"


export function generateAuthToken({ userName, repository, privateKey, publicKey }:
  { userName: string, privateKey: string, repository: string, publicKey: string }) {
  return jwt.sign({ userName, publicKey, repository },
    privateKey,
    { algorithm: 'RS256', expiresIn: '7d' });
}

export function generateSafeHash(string1: string, string2: string, secretKey: string) {
  const data = string1 + string2;
  return crypto.createHmac('sha256', secretKey)
    .update(data)
    .digest('hex');
}

export function generatePublicKeyFromPrivateKey(privateKeyString: string) {
  try {
    // Create a KeyObject from the private key string
    const privateKeyObject = crypto.createPrivateKey({
      key: privateKeyString,
      format: 'pem',
      type: 'pkcs8'
    });

    // Generate the public key
    const publicKey = crypto.createPublicKey(privateKeyObject)
      .export({ type: 'spki', format: 'pem' });

    return publicKey as string
  } catch (error) {
    console.error('Error generating public key:', error);
    return null;
  }
}

export function deflattenKey(flatKey: string) {
  return flatKey.replace(/\\n/g, '\n');
}

export function flattenKey(unflatKey: string) {
  return unflatKey.replace(/\r\n|\r|\n/g, '\\n');
}

export function validatePublicKey(privateKey: string, publicKey: string) {
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
    console.error('Key validation error:', error);
    return false;
  }
}
