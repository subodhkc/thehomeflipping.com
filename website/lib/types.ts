// Dashboard token types and interfaces
export interface DashboardToken {
  email: string
  timestamp: number
  expires: number
  sessionId: string
  signature: string
}

export interface DashboardUserData {
  email: string
  sessionId: string
  purchaseDate: Date
  expiresAt: Date
  isValid: boolean
}

export interface ValidationResult {
  valid: boolean
  token?: DashboardToken
  error?: string
  userData?: DashboardUserData
}
