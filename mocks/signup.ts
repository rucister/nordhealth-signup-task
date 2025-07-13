import { http } from 'msw'
import type { SignupRequestBody, SignupResponse } from '~/types/auth';
import { MockErrorResponse } from './mock-utils';

export const signupHandlers = [
	http.post( '/api/signup', async ( { request } ) => {
		const body = await request.json() as SignupRequestBody
		const { email, password, passwordConfirmation, subscribeToUpdates } = body

		if ( !email || !email.includes( '@' ) ) {
			return MockErrorResponse( {
				code: 400,
				message: 'Invalid email address'
			} )
		}

		if ( !password || password.length < 8 ) {
			return MockErrorResponse( {
				code: 400,
				message: 'Password must be at least 8 characters long'
			} )
		}

		if ( password !== passwordConfirmation ) {
			return MockErrorResponse( {
				code: 400,
				message: 'Passwords do not match'
			} )
		}

		// 🔄 Simulate existing email conflict
		if ( email.toLowerCase() === 'already@exists.com' ) {
			return MockErrorResponse( {
				code: 409,
				message: 'Email already in use'
			} )
		}

		// 🧪 Random server failure
		if ( Math.random() < 0.25 ) {
			return MockErrorResponse( {
				code: 500,
				message: 'Unexpected server error'
			} )
		}

		const response: SignupResponse = {
      token: 'mock-token',
      user: { name: 'Test User' }
    }
		return new Response( JSON.stringify( response ), { status: 200, headers: { 'Content-Type': 'application/json' } } )
	} )
]
