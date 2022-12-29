export function wait(t: number): Promise<void> {
    return new Promise((r) => setTimeout(r, t))
}

export function isNum(v: string): boolean {
    return /^-?\d*\.?\d+$/.test(v)
}

/**
 * Convert strings to numbers.
 * Strings with letters will be returned without converting
 * @param input
 * @returns
 */
export function stringToInt(input: string): string | number {
    return isNum(input) ? Number(input) : input
}
