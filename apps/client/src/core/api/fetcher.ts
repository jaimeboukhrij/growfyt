type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface FetcherOptions<Body = unknown> {
  method?: HTTPMethod
  body?: Body
  headers?: Record<string, string>
  baseUrlOverride?: string
  cache?: RequestCache
  revalidate?: number
  tags?: string[]
}

export async function fetcher<Response = unknown, Body = unknown> (
  endpoint: string,
  options: FetcherOptions<Body> = {}
): Promise<Response> {
  const { method = 'GET', body, headers = {}, baseUrlOverride } = options

  const baseUrl = baseUrlOverride ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localho'

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

  const finalHeaders: Record<string, string> = isFormData
    ? {}
    : {
        'Content-Type': 'application/json',
        ...headers
      }

  if (!isFormData) {
    Object.assign(finalHeaders, headers)
  }

  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders,
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    cache: options.cache
  }

  if (options.revalidate ?? options.tags) {
    fetchOptions.next = {
      ...(options.revalidate && { revalidate: options.revalidate }),
      ...(options.tags && { tags: options.tags })
    }
  }

  if (!isFormData) {
    fetchOptions.credentials = 'include'
  }

  const res = await fetch(url, fetchOptions)

  const contentType = res.headers.get('content-type')
  const isJson = contentType?.includes('application/json')
  const responseBody = isJson ? await res.json() : await res.text()

  if (!res.ok) {
    throw new Error(
      typeof responseBody === 'string' ? responseBody : responseBody?.message || 'Error desconocido'
    )
  }

  return responseBody as Response
}
