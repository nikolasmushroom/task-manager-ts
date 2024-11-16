export type BaseResponse<D = {}> = {
    data: D
    fieldsErrors: Array<FieldError>
    messages: Array<string>
    resultCode: number
}
export type FieldError = {
    error: string
    field: string
}