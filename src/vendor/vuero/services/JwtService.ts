const ID_TOKEN_KEY = 'id_token' as string

/**
 *  remove token form localStorage
 *
 *  @returns {void}
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
}

/**
 *  get token form localStorage
 *
 *  @returns {string | null}
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY)
}

/**
 *  save token into localStorage
 *
 * @param {string} token
 * @returns {void}
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export default { getToken, saveToken, destroyToken }
