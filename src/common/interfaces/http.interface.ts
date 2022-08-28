export interface ResponseBase<T> {
  timestamp: string
  result: boolean
  data: this['result'] extends true ? T : undefined
  message: this['result'] extends true ? undefined : string
}
