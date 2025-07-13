import type { FetchError } from 'ofetch'

declare global {
	interface StandardApiError { message: string; code?: number }
	interface StandardFetchError extends FetchError<StandardApiError> {}
}

export {}