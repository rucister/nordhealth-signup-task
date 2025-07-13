/**
 * Authentication Middleware
 * 
 * Checks if user is authenticated (logged in).
 * If authenticated, redirects to dashboard.
 */

export default defineNuxtRouteMiddleware( ( to, from ) => {
	const { isLoggedIn } = useAuth()

	// If authenticated, redirect to dashboard
	if ( isLoggedIn.value ) {
		return navigateTo( '/' )
	}

	// If not authenticated, allow access to the route
	return
} )
