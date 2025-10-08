// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildQueryParams = <T extends Record<string, any>>(params: T | null | undefined): string => {
  if (!params || typeof params !== 'object') {
    return ''
  }

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (isValidParam(value)) {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidParam = (value: any): boolean => {
  return value !== undefined &&
         value !== null &&
         value !== '' &&
         String(value).trim() !== ''
}
