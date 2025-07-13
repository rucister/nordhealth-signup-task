import { http } from 'msw'
import type { LoginRequestBody } from '~/types/auth';
import { MockErrorResponse } from './mock-utils';

export const loginHandlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json() as LoginRequestBody

    if (!email || !password) {
			return MockErrorResponse({
				code: 400,
				message: 'Missing credentials'
			})
    }

    if (Math.random() < 0.25) {
			return MockErrorResponse({
				code: 500,
				message: 'Unexpected server error'
			})
    }

    if (email !== 'test@example.com' || password !== 'password123') {
			return MockErrorResponse({
				code: 401,
				message: 'Invalid credentials'
			})
    }

    return new Response(JSON.stringify({
      token: 'mock-token',
      user: { name: 'Test User' }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  })
]