/**
 * Authentication Middleware
 * 
 * Checks if user is authenticated (logged in).
 * If not authenticated, redirects to login page.
 */

export default defineNuxtRouteMiddleware( ( to, from ) => {
	const { isLoggedIn } = useAuth()

	console.log( 'Checking authentication status', isLoggedIn.value )

	// If not authenticated, redirect to login page (public landing)
	if ( !isLoggedIn.value ) {
		return navigateTo( '/login' )
	}

	// If authenticated, allow access to the route
	return
} )
