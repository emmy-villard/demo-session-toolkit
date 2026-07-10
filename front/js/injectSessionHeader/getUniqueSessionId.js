/**
 * Returns a stable session identifier for the current browser storage.
 *
 * If a session id is already stored in localStorage under the
 * `uniqueSessionId` key, it is returned as-is. Otherwise a new id is
 * generated, stored, and then returned.
 *
 * @returns {string} The existing or newly generated session id.
 */
export function getUniqueSessionId() {
  const uniqueSessionIdKey = 'uniqueSessionId'
  const uniqueSessionId = localStorage.getItem(uniqueSessionIdKey)
  if(uniqueSessionId) {
    return uniqueSessionId
  }
  const newUniqueSessionId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  localStorage.setItem(uniqueSessionIdKey, newUniqueSessionId)
  return newUniqueSessionId
}