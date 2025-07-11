/**
 * Authentication Middleware
 * 
 * Checks if user is authenticated (logged in).
 * If not authenticated, redirects to login page.
 * 
 * For this implementation, we'll use a simple approach:
 * - Check localStorage for authentication token/status
 * - Can be extended to check JWT tokens, session storage, etc.
 */

export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  // For now, we'll check localStorage for a simple auth flag
  // In a real app, this would check JWT tokens, session cookies, etc.
  const isAuthenticated = localStorage.getItem('nordhealth_authenticated') === 'true'

  // If not authenticated, redirect to welcome page (public landing)
  if (!isAuthenticated) {
    return navigateTo('/login')
  }

  // If authenticated, allow access to the route
  return
})
