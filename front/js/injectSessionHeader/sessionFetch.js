import { injectSessionHeader } from './injectSessionHeader.js'

/**
 * Wraps fetch by injecting the X-Session-Id header before sending.
 *
 * @param {RequestInfo | URL} resource - Resource to fetch.
 * @param {RequestInit} [options] - Optional fetch init options.
 * @returns {Promise<Response>} The fetch response.
 */
export async function sessionFetch(resource, options = {}) {
  const request = new Request(resource, options)
  injectSessionHeader(request)
  return fetch(request)
}