import { getUniqueSessionId } from "./getUniqueSessionId"

/**
 * Adds (or overwrites) the 'X-Session-Id' header on the given request.
 *
 * No copy is made: this function does not copy the object passed as a
 * parameter, it mutates it in place (via side effect). If the header
 * already exists, it is overwritten with a new unique session id.
 *
 * @param {Request} request - The request object to mutate.
 * @returns {Request} - The same request instance, with the session id header set.
 */
export function injectSessionHeader(request) {
  const headers = request.headers
  const header_name = 'X-Session-Id'
  if(headers.has(header_name)) {
    console.debug(`Overwriting ${header_name} header`)
    headers.set(header_name, getUniqueSessionId())
  }
  else {
    headers.append(header_name, getUniqueSessionId())
  }
  return request
}