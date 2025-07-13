import type { paths } from './api'

export type SignupRequestBody = paths['/api/signup']['post']['requestBody']['content']['application/json']
export type SignupResponse = paths['/api/signup']['post']['responses']['200']['content']['application/json']
export type LoginRequestBody = paths['/api/login']['post']['requestBody']['content']['application/json']
export type LoginResponse = paths['/api/login']['post']['responses']['200']['content']['application/json']
export type ForgotRequestBody = paths['/api/forgot']['post']['requestBody']['content']['application/json']
