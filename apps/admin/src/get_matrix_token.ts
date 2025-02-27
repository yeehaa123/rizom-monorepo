#!/usr/bin/env bun
import { argv } from "process";
import arg from "arg";

// Parse command line arguments
const args = arg({
  "--username": String,
  "--password": String,
  "--server": String,

  // Aliases
  "-u": "--username",
  "-p": "--password",
  "-s": "--server"
});

// Check if help is needed
if (args["--help"] || args["-h"]) {
  console.log(`
Usage: bun get-matrix-token.ts --username <admin_user> --password <password> --server <matrix_server>

Options:
  --username, -u    Matrix admin username (without @domain.com)
  --password, -p    Matrix admin password
  --server,  -s     Matrix server URL (default: https://matrix.rizom.ai)
  --help,    -h     Show this help message
  `);
  process.exit(0);
}

// Validate required arguments
if (!args["--username"] || !args["--password"]) {
  console.error("Error: Username and password are required");
  console.error("Use --help for usage information");
  process.exit(1);
}

async function getMatrixToken(username: string, password: string, server: string) {
  try {
    const response = await fetch(`${server}/_matrix/client/v3/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: {
          type: "m.id.user",
          user: username,
        },
        password: password,
        type: "m.login.password",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Matrix login failed: ${error}`);
    }

    const data = await response.json();
    console.log("\nMatrix Admin Token:");
    console.log(data.access_token);
    console.log("\nAdd this to your .env file as:");
    console.log(`MATRIX_ADMIN_TOKEN=${data.access_token}`);

  } catch (error) {
    console.error("\nError getting Matrix token:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Get the token
const server = args["--server"] || "https://matrix.rizom.ai";
getMatrixToken(args["--username"], args["--password"], server);
