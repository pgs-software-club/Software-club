#!/usr/bin/env node

/**
 * Security Validation Script
 * 
 * This script performs basic security checks on the application
 * to ensure critical security measures are in place.
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let passed = 0;
let failed = 0;

function addCheck(name, condition, message) {
  const result = condition();
  checks.push({
    name,
    passed: result,
    message: result ? '✅ PASS' : `❌ FAIL: ${message}`
  });
  
  if (result) {
    passed++;
  } else {
    failed++;
  }
}

// Check 1: .env file should not exist in repository
addCheck(
  'Environment File Security',
  () => !fs.existsSync('.env'),
  '.env file exists in repository - this exposes secrets!'
);

// Check 2: .env should be in .gitignore
addCheck(
  'GitIgnore Configuration',
  () => {
    if (!fs.existsSync('.gitignore')) return false;
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    return gitignore.includes('.env');
  },
  '.env is not in .gitignore'
);

// Check 3: Auth file should use bcrypt
addCheck(
  'Password Hashing',
  () => {
    if (!fs.existsSync('src/lib/auth.ts')) return false;
    const authFile = fs.readFileSync('src/lib/auth.ts', 'utf8');
    return authFile.includes('bcrypt') && authFile.includes('ADMIN_PASSWORD_HASH');
  },
  'Authentication does not use bcrypt password hashing'
);

// Check 4: JWT tokens should have reasonable expiration
addCheck(
  'JWT Token Expiration',
  () => {
    if (!fs.existsSync('src/lib/auth.ts')) return false;
    const authFile = fs.readFileSync('src/lib/auth.ts', 'utf8');
    return authFile.includes('2h') || authFile.includes('1h');
  },
  'JWT tokens have excessive expiration time'
);

// Check 5: Rate limiting should be implemented
addCheck(
  'Rate Limiting',
  () => {
    if (!fs.existsSync('src/lib/auth.ts')) return false;
    const authFile = fs.readFileSync('src/lib/auth.ts', 'utf8');
    return authFile.includes('loginAttempts') && authFile.includes('MAX_LOGIN_ATTEMPTS');
  },
  'Rate limiting is not implemented'
);

// Check 6: CSRF protection should be implemented
addCheck(
  'CSRF Protection',
  () => {
    if (!fs.existsSync('src/lib/auth.ts')) return false;
    const authFile = fs.readFileSync('src/lib/auth.ts', 'utf8');
    return authFile.includes('generateCSRFToken') && authFile.includes('validateCSRFToken');
  },
  'CSRF protection is not implemented'
);

// Check 7: Input validation should be comprehensive
addCheck(
  'Input Validation',
  () => {
    if (!fs.existsSync('src/lib/middleware.ts')) return false;
    const middlewareFile = fs.readFileSync('src/lib/middleware.ts', 'utf8');
    return middlewareFile.includes('validateEmail') && middlewareFile.includes('sanitizeInput');
  },
  'Comprehensive input validation is not implemented'
);

// Check 8: Security headers should be set
addCheck(
  'Security Headers',
  () => {
    if (!fs.existsSync('middleware.ts')) return false;
    const middlewareFile = fs.readFileSync('middleware.ts', 'utf8');
    return middlewareFile.includes('X-Frame-Options') && middlewareFile.includes('Content-Security-Policy');
  },
  'Security headers are not configured'
);

// Check 9: No hardcoded secrets in code
addCheck(
  'No Hardcoded Secrets',
  () => {
    const filesToCheck = [
      'src/lib/auth.ts',
      'src/lib/github.ts',
      'src/app/admin/login/page.tsx'
    ];
    
    for (const file of filesToCheck) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        // Check for actual hardcoded secrets (not variable names)
        if (content.match(/password\s*=\s*['"][^'"]{8,}['"]/) ||
            content.match(/secret\s*=\s*['"][^'"]{32,}['"]/) ||
            content.match(/token\s*=\s*['"]gh[ps]_[^'"]{20,}['"]/) ||
            content.includes('admin123') ||
            content.includes('password123')) {
          return false;
        }
      }
    }
    return true;
  },
  'Hardcoded secrets found in source code'
);

// Check 10: Database models should have validation
addCheck(
  'Database Validation',
  () => {
    const modelFiles = ['src/models/Student.ts', 'src/models/Attendance.ts'];
    for (const file of modelFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (!content.includes('validate:') && !content.includes('maxlength:')) {
          return false;
        }
      }
    }
    return true;
  },
  'Database models lack proper validation'
);

// Run all checks
console.log('🔒 Security Validation Report');
console.log('============================\n');

checks.forEach(check => {
  console.log(`${check.name}: ${check.message}`);
});

console.log('\n============================');
console.log(`Summary: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All security checks passed!');
  process.exit(0);
} else {
  console.log('⚠️  Some security checks failed. Please address the issues above.');
  process.exit(1);
}