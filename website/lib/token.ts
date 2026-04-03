import { createHash, createHmac } from 'crypto'
import { DashboardToken, ValidationResult, DashboardUserData } from './types'

// Server-side secret key for token signing
const DASHBOARD_SECRET = process.env.DASHBOARD_SECRET || 'default-secret-change-in-production'

// Token expiration time (120 days)
const TOKEN_EXPIRY_DAYS = 120
const TOKEN_EXPIRY_MS = TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000

/**
 * Generate a dashboard access token
 */
export function generateDashboardToken(email: string, sessionId: string): string {
  const timestamp = Date.now()
  const expires = timestamp + TOKEN_EXPIRY_MS
  
  // Create token payload (without signature)
  const payload = {
    email,
    timestamp,
    expires,
    sessionId
  }
  
  // Create signature using HMAC-SHA256
  const payloadString = JSON.stringify(payload)
  const signature = createHmac('sha256', DASHBOARD_SECRET)
    .update(payloadString)
    .digest('hex')
  
  // Create complete token
  const token: DashboardToken = {
    ...payload,
    signature
  }
  
  // Return base64 encoded token
  return Buffer.from(JSON.stringify(token)).toString('base64url')
}

/**
 * Validate a dashboard access token
 */
export function validateDashboardToken(tokenString: string): ValidationResult {
  try {
    // Decode base64 token
    const tokenJson = Buffer.from(tokenString, 'base64url').toString('utf-8')
    const token: DashboardToken = JSON.parse(tokenJson)
    
    // Verify token structure
    if (!token.email || !token.timestamp || !token.expires || !token.sessionId || !token.signature) {
      return { valid: false, error: 'Invalid token structure' }
    }
    
    // Check expiration
    if (Date.now() > token.expires) {
      return { valid: false, error: 'Token expired' }
    }
    
    // Verify signature
    const payload = {
      email: token.email,
      timestamp: token.timestamp,
      expires: token.expires,
      sessionId: token.sessionId
    }
    
    const payloadString = JSON.stringify(payload)
    const expectedSignature = createHmac('sha256', DASHBOARD_SECRET)
      .update(payloadString)
      .digest('hex')
    
    if (token.signature !== expectedSignature) {
      return { valid: false, error: 'Invalid token signature' }
    }
    
    // Create user data
    const userData: DashboardUserData = {
      email: token.email,
      sessionId: token.sessionId,
      purchaseDate: new Date(token.timestamp),
      expiresAt: new Date(token.expires),
      isValid: true
    }
    
    return { valid: true, token, userData }
    
  } catch (error) {
    return { valid: false, error: 'Token parsing failed' }
  }
}

/**
 * Extract token from URL or query string
 */
export function extractTokenFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    
    // Try query parameter first
    const token = urlObj.searchParams.get('token')
    if (token) return token
    
    // Try path parameter (/dashboard/token)
    const pathParts = urlObj.pathname.split('/')
    const tokenIndex = pathParts.indexOf('dashboard')
    if (tokenIndex !== -1 && pathParts[tokenIndex + 1]) {
      return pathParts[tokenIndex + 1]
    }
    
    return null
  } catch (error) {
    return null
  }
}

/**
 * Generate a secure random string for additional security
 */
export function generateSecureRandom(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Create a dashboard URL with token
 */
export function createDashboardUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return `${baseUrl}/dashboard?token=${encodeURIComponent(token)}`
}
