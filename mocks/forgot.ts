import { http } from 'msw'
import type { ForgotRequestBody } from '~/types/auth';
import { MockErrorResponse } from './mock-utils';

export const forgotHandlers = [
  http.post('/api/forgot', async ({ request }) => {
    const { email } = await request.json() as ForgotRequestBody

    if (!email) {
			return MockErrorResponse({
				code: 400,
				message: 'Email is required'
			})
    }

    if (email !== 'test@example.com') {
			return MockErrorResponse({
				code: 404,
				message: 'User not found'
			})
    }

    return new Response(JSON.stringify({ message: 'Password reset email sent' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  })
]