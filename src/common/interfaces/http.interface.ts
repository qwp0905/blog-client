export interface ResponseBase<T> {
  timestamp: string
  result: boolean
  data?: T
  message?: string
}
