export type ApiResponse<T> =
  | {
    code: number
    success: true
    data: T
  }
  | {
    code: number
    success: false
    error: string
  }
