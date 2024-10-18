import crypto from 'crypto';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();
const { AUTH_URL, REPOSITORY_KEY } = process.env;


export function generateAuthToken(entry: { userName: string, repository: string }) {
  if (!REPOSITORY_KEY) {
    throw ("env vars REPOSITORY_KEY needs to be set")
  }
  const privateKey = deflattenKey(REPOSITORY_KEY)
  return jwt.sign(entry, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
}

export function generateSafeHash(string1: string, string2: string) {
  if (!REPOSITORY_KEY) {
    throw ("env vars REPOSITORY_KEY needs to be set")
  }
  const privateKey = deflattenKey(REPOSITORY_KEY)
  const data = string1 + string2;
  return crypto.createHmac('sha256', privateKey)
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
    throw (`Error generating public key: ${error}`);
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

export function verifyAuthToken(authToken: string | null, publicKey: string | null) {
  try {
    if (!authToken || !publicKey) {
      throw ("UNAUTHORIZED ROUTED")
    }
    const dfk = deflattenKey(publicKey);
    const decoded = jwt.verify(authToken, dfk);
    console.log(decoded);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

