import { http } from 'msw'

export const logoutHandlers = [
  http.post('/api/logout', () => {
    return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  })
]