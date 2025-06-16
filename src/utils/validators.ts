export const isValidDate = (date: Date): boolean => {
    return date != null && date != undefined
}

export const isNotEmptyString = (str: string): boolean => {
    return str != null && str != undefined && str.length > 0
}