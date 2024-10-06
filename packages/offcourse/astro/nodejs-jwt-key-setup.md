# Node.js JWT Key Setup Guide

Follow these steps to generate and prepare your JWT keys for use in a Node.js application.

## 1. Generate the Private Key

```bash
openssl genrsa -out private_key.pem 2048
```

## 2. Prepare Private Key for .env File

Run this command to convert the private key to a single line for your .env file:

```bash
awk 'NF {sub(/\r/, ""); printf "%s\\n", $0;}' private_key.pem | rev | cut -c 3- | rev
```

Copy the output. In your .env file, add:

```
PRIVATE_KEY=your_copied_output_here
```

## 3. Generate the Public Key

```bash
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

## 4. Copy Public Key to Clipboard

For macOS:
```bash
cat public_key.pem | pbcopy
```

For Linux (requires xclip):
```bash
cat public_key.pem | xclip -selection clipboard
```

For Windows (PowerShell):
```powershell
Get-Content public_key.pem | Set-Clipboard
```

The public key is now in your clipboard, ready to be shared with your auth server.

Remember:
- Keep your private key secure and never share it.
- Add `private_key.pem` to your `.gitignore` file.
- Use different keys for different environments.
