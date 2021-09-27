export const setSession = (key: string, value: unknown):void => sessionStorage.setItem(key, JSON.stringify(value))
export const setLocal = (key: string, value: unknown):void => localStorage.setItem(key, JSON.stringify(value))

export const getSession = (key: string):unknown => JSON.parse(sessionStorage.getItem(key) || '""') || null
export const getLocal = (key: string): unknown => JSON.parse(localStorage.getItem(key) || '""') || null

export const removeSession = (key: string):void => sessionStorage.removeItem(key)
export const removeLocal = (key: string):void => localStorage.removeItem(key)

export const removeAllSession = ():void => sessionStorage.clear()
export const removeAllLocal = ():void => localStorage.clear()
