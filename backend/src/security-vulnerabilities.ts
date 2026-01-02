/**
 * ⚠️ SECURITY VULNERABILITIES DEMO FILE
 * This file contains intentional security issues for testing code-rv detection
 */

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

// =============================================================================
// 🔴 S001: HARDCODED SECRETS & CREDENTIALS
// =============================================================================

// ❌ Hardcoded database credentials
const DB_PASSWORD = "SuperSecret123!";
const MYSQL_ROOT_PASSWORD = "root_password_here";

// ❌ Hardcoded API keys
const OPENAI_API_KEY = "sk-proj-abcdefghijklmnopqrstuvwxyz123456";
const STRIPE_SECRET_KEY = "sk_live_51ABC123DEF456GHI789";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// ❌ Hardcoded JWT secret
const JWT_SECRET = "my-super-secret-jwt-key-do-not-share";

// ❌ Private key embedded in code
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PB
-----END RSA PRIVATE KEY-----`;

// ❌ Hardcoded OAuth tokens
const GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const SLACK_WEBHOOK = "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX";

// =============================================================================
// 🔴 S002: SQL INJECTION VULNERABILITIES  
// =============================================================================

@Injectable()
export class VulnerableUserService {
  private db: any;

  // ❌ SQL Injection - Direct string concatenation
  async findUserByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = '" + email + "'";
    return this.db.query(query);
  }

  // ❌ SQL Injection - Template literal without parameterization
  async findUserById(id: string) {
    const query = `SELECT * FROM users WHERE id = ${id}`;
    return this.db.query(query);
  }

  // ❌ SQL Injection - Dynamic table name
  async getRecords(tableName: string, userId: string) {
    const query = `SELECT * FROM ${tableName} WHERE user_id = '${userId}'`;
    return this.db.query(query);
  }

  // ❌ SQL Injection - ORDER BY injection
  async listUsers(orderBy: string) {
    const query = "SELECT * FROM users ORDER BY " + orderBy;
    return this.db.query(query);
  }

  // ❌ SQL Injection in DELETE statement
  async deleteUser(userId: string) {
    const query = `DELETE FROM users WHERE id = '${userId}'`;
    return this.db.execute(query);
  }
}

// =============================================================================
// 🔴 S003: COMMAND INJECTION
// =============================================================================

@Injectable()
export class VulnerableFileService {
  // ❌ Command Injection - exec with user input
  async processFile(filename: string) {
    const { exec } = require('child_process');
    exec(`cat ${filename}`, (error: any, stdout: any) => {
      return stdout;
    });
  }

  // ❌ Command Injection - spawn with shell: true
  async convertImage(inputPath: string, outputPath: string) {
    const { spawn } = require('child_process');
    spawn(`convert ${inputPath} ${outputPath}`, { shell: true });
  }

  // ❌ Command Injection - execSync
  async getFileInfo(path: string) {
    const { execSync } = require('child_process');
    return execSync(`ls -la ${path}`).toString();
  }
}

// =============================================================================
// 🔴 S004: XSS (Cross-Site Scripting)
// =============================================================================

@Injectable()
export class VulnerableRenderService {
  // ❌ XSS - Direct HTML injection
  renderUserProfile(username: string, bio: string) {
    return `
      <div class="profile">
        <h1>${username}</h1>
        <p>${bio}</p>
      </div>
    `;
  }

  // ❌ XSS - innerHTML equivalent
  createComment(content: string) {
    return {
      __html: content, // React dangerouslySetInnerHTML pattern
    };
  }

  // ❌ XSS - Eval with user input
  processTemplate(template: string, data: any) {
    return eval(template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key]));
  }
}

// =============================================================================
// 🔴 S005: INSECURE CRYPTOGRAPHY
// =============================================================================

@Injectable()
export class VulnerableCryptoService {
  // ❌ Weak hashing algorithm (MD5)
  hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  // ❌ Weak hashing algorithm (SHA1)
  hashToken(token: string): string {
    return crypto.createHash('sha1').update(token).digest('hex');
  }

  // ❌ ECB mode encryption (insecure)
  encryptData(data: string, key: string): string {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  }

  // ❌ Hardcoded encryption key
  encryptWithHardcodedKey(data: string): string {
    const SECRET_KEY = "1234567890123456"; // 16 bytes for AES-128
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv('aes-128-cbc', SECRET_KEY, iv);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  }

  // ❌ Predictable IV (all zeros)
  encryptWithZeroIV(data: string, key: string): string {
    const iv = Buffer.alloc(16, 0); // All zeros - predictable!
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  }
}

// =============================================================================
// 🔴 S006: PATH TRAVERSAL
// =============================================================================

@Injectable()
export class VulnerableStorageService {
  private basePath = '/app/uploads';

  // ❌ Path Traversal - No sanitization
  async readFile(filename: string) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(this.basePath, filename);
    return fs.readFileSync(filePath, 'utf8');
  }

  // ❌ Path Traversal - Allowing ../
  async downloadFile(userPath: string) {
    const fs = require('fs');
    // Attacker can use: ../../../etc/passwd
    return fs.createReadStream('/uploads/' + userPath);
  }

  // ❌ Path Traversal in file deletion
  async deleteFile(filename: string) {
    const fs = require('fs');
    fs.unlinkSync('/data/files/' + filename);
  }
}

// =============================================================================
// 🔴 S007: INSECURE DESERIALIZATION
// =============================================================================

@Injectable()
export class VulnerableSerializerService {
  // ❌ Unsafe deserialization with eval
  deserialize(serialized: string): any {
    return eval('(' + serialized + ')');
  }

  // ❌ Using Function constructor (similar to eval)
  parseConfig(configStr: string): any {
    return new Function('return ' + configStr)();
  }

  // ❌ JSON.parse without validation
  parseUserData(data: string): any {
    // No schema validation - could contain prototype pollution
    return JSON.parse(data);
  }
}

// =============================================================================
// 🔴 S008: AUTHENTICATION ISSUES
// =============================================================================

@Injectable() 
export class VulnerableAuthService {
  // ❌ Timing attack vulnerable comparison
  verifyToken(providedToken: string, expectedToken: string): boolean {
    return providedToken === expectedToken;
  }

  // ❌ Weak password policy
  validatePassword(password: string): boolean {
    return password.length >= 4; // Too weak!
  }

  // ❌ No rate limiting hint
  async login(username: string, password: string) {
    // Direct attempt without rate limiting
    const user = await this.findUser(username);
    if (user && user.password === password) {
      return { success: true };
    }
    return { success: false };
  }

  // ❌ Password in logs
  async logLoginAttempt(username: string, password: string) {
    console.log(`Login attempt: user=${username}, pass=${password}`);
  }

  private async findUser(username: string) {
    return { username, password: 'password123' };
  }
}

// =============================================================================
// 🔴 S009: INSECURE HTTP
// =============================================================================

@Injectable()
export class VulnerableHttpService {
  // ❌ HTTP instead of HTTPS
  private apiUrl = "http://api.example.com/sensitive-data";

  // ❌ Disabling SSL verification
  async fetchData() {
    const https = require('https');
    return fetch(this.apiUrl, {
      agent: new https.Agent({
        rejectUnauthorized: false, // ❌ Disables certificate validation!
      }),
    });
  }

  // ❌ CORS wildcard
  getCorsConfig() {
    return {
      origin: '*', // ❌ Allows any origin
      credentials: true,
    };
  }
}

// =============================================================================
// 🔴 S010: REGEX DOS (ReDoS)
// =============================================================================

@Injectable()
export class VulnerableValidatorService {
  // ❌ ReDoS vulnerable regex - exponential backtracking
  validateEmail(email: string): boolean {
    const emailRegex = /^([a-zA-Z0-9]+)+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    return emailRegex.test(email);
  }

  // ❌ ReDoS - nested quantifiers
  validateUrl(url: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)+\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(url);
  }

  // ❌ ReDoS - overlapping groups
  validateInput(input: string): boolean {
    const pattern = /^(a+)+$/;
    return pattern.test(input);
  }
}

// =============================================================================
// 🔴 Additional Code Quality Issues
// =============================================================================

// ❌ console.log in production code
function debugFunction(data: any) {
  console.log("DEBUG:", data);
  console.debug("Processing data...");
  console.info("Info message");
}

// ❌ Using var instead of const/let
var globalCounter = 0;
var tempData = null;

// ❌ Empty catch block
async function riskyOperation() {
  try {
    await fetch('https://api.example.com');
  } catch (e) {
    // Silent failure - bad practice!
  }
}

// ❌ TODO/FIXME comments indicating incomplete code
// TODO: Implement proper authentication
// FIXME: This is a security vulnerability
// HACK: Temporary workaround for auth bypass
// BUG: Known issue with privilege escalation

export {
  VulnerableUserService,
  VulnerableFileService,
  VulnerableRenderService,
  VulnerableCryptoService,
  VulnerableStorageService,
  VulnerableSerializerService,
  VulnerableAuthService,
  VulnerableHttpService,
  VulnerableValidatorService,
};
