export const MockErrorResponse = ( args: { code: number; message: string } ) => {
	const { code, message } = args;
	return new Response(
		JSON.stringify( { message, code } satisfies StandardApiError ),
		{ status: code, headers: { 'Content-Type': 'application/json' } }
	)
}