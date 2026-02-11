#!/usr/bin/env node

/**
 * Password Hashing Utility
 * 
 * This script helps generate bcrypt hashes for admin passwords.
 * Usage: node scripts/hash-password.js [password]
 * 
 * If no password is provided, it will prompt for one securely.
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

async function hashPassword(password) {
  const saltRounds = 12; // High security level
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    process.exit(1);
  }
}

async function promptPassword() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    // Hide password input
    rl.stdoutMuted = true;
    rl.question('Enter password to hash: ', (password) => {
      rl.stdoutMuted = false;
      console.log(''); // New line after hidden input
      rl.close();
      resolve(password);
    });

    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (rl.stdoutMuted) {
        rl.output.write('*');
      } else {
        rl.output.write(stringToWrite);
      }
    };
  });
}

async function main() {
  let password = process.argv[2];

  if (!password) {
    password = await promptPassword();
  }

  if (!password || password.length < 8) {
    console.error('Error: Password must be at least 8 characters long');
    process.exit(1);
  }

  console.log('Hashing password...');
  const hash = await hashPassword(password);
  
  console.log('\n=== BCRYPT HASH GENERATED ===');
  console.log('Hash:', hash);
  console.log('\nAdd this to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log('\n=== SECURITY REMINDER ===');
  console.log('- Never store plain text passwords');
  console.log('- Keep this hash secure and private');
  console.log('- Rotate passwords regularly');
  console.log('- Use strong, unique passwords');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { hashPassword };