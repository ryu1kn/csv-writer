
export const resolveDelimiterChar = (char: string) => {
    if (char === ',' || char === ';') return char
    throw new Error('Invalid field delimiter')
}
