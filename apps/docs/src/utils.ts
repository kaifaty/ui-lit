export const getURL = (url: string) => new URL(url, import.meta.url) as unknown as string
