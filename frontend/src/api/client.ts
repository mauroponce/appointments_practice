const API_URL = "http://localhost:3004/api/v1"

type RequestOptions = RequestInit & { // RequestInit is a native type that contains standard HTTP opts such as method, body, headers, credentials.
  accountId?: number
}

export async function apiRequest<T>(
	path: string,
	options: RequestOptions = {}
): Promise<T> {
	const { accountId = 2, headers, ...requestOptions } = options

	const response = await fetch(`${API_URL}/${path}`, {
		...requestOptions,
		headers: {
			"X-Account-Id": accountId.toString(),
			...headers
		}
	})

	if(!response.ok) { // fetch only rejects the Promise for network errors, not 404, 422, 500, we have to check the response
    throw new Error(`Request failed with status: ${response.status} ${response.statusText}`)
  }

  return response.json()
}