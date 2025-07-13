export function getErrorMessage(error: StandardFetchError): string {
  if (!error.data) {
    return 'An unexpected error occurred'
  }
  
  const errorData = error.data as StandardApiError
  
  switch (error.statusCode) {
    case 400:
      return errorData.message || 'Bad request'
    case 401:
      return 'Please log in to continue'
    case 403:
      return 'You do not have permission to perform this action'
    case 404:
      return 'The requested resource was not found'
    case 422:
      return 'Please check your input and try again'
    case 500:
      return 'Server error. Please try again later'
    default:
      return errorData.message || 'An error occurred'
  }
}

export function getError(error: StandardFetchError): StandardApiError {
	return { message: getErrorMessage(error), code: error.statusCode }
}