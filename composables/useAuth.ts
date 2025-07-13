import type { ForgotRequestBody, LoginRequestBody, LoginResponse, SignupRequestBody, SignupResponse } from "~/types/auth";

export const useAuth = () => {

	const { $apiClient } = useNuxtApp();

	const token = useState<string | null>( 'auth.token', () => {
		return localStorage.getItem( 'auth.token' )
	} )

	const isLoggedIn = computed( () => !!token.value )

	const setToken = ( newToken: string ) => {
		token.value = newToken
		localStorage.setItem( 'auth.token', newToken )
	}

	const clearToken = () => {
		token.value = null
		localStorage.removeItem( 'auth.token' )
	}

	const login = async ( credentials: LoginRequestBody ) => {
		try {
			const response = await $apiClient<LoginResponse>( '/api/login', {
				method: 'POST',
				body: credentials
			} );
			if ( response.token ) {
				setToken( response.token )
				await navigateTo( '/' )
			}
		} catch ( error ) {
			// Handle login error
			throw error
		}
	}

	const signup = async ( userData: SignupRequestBody ) => {
		try {
			const response = await $apiClient<SignupResponse>( '/api/signup', {
				method: 'POST',
				body: userData
			} );
			if ( response.token ) {
				setToken( response.token )
				// Handle successful signup, redirect user to dashboard with a parammeter to show a welcome message
				await navigateTo( '/?welcome=true' )
			}
		} catch ( error ) {
			// Handle signup error
			throw error
		}
	}

	const logout = async () => {
		try {
			await $apiClient( '/api/logout', {
				method: 'POST'
			} );
		} catch ( error ) {
			// Handle logout error
			throw error;

		} finally {
			clearToken()
			await navigateTo( '/login' )
		}
	}

	const forgotPassword = async ( data: ForgotRequestBody ) => {
		return await $apiClient( '/api/forgot', {
			method: 'POST',
			body: data
		} );
	};

	return {
		token: readonly( token ),
		isLoggedIn,
		setToken,
		clearToken,
		login,
		logout,
		signup,
		forgotPassword
	}
}