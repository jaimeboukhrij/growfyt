export function errorResponse (error: string | Error, code = 500) {
  return {
    code,
    success: false as const,
    error: typeof error === 'string' ? error : error.message
  }
}

export function successResponse<T> (data: T, code = 200) {
  return {
    code,
    success: true as const,
    data
  }
}
