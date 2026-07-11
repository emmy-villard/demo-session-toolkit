import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { sessionFetch } from '../injectSessionHeader/sessionFetch.js'
import { injectSessionHeader } from '../injectSessionHeader/injectSessionHeader.js'


vi.mock(import('../injectSessionHeader/injectSessionHeader.js'), () => {
  return {
     injectSessionHeader: vi.fn((request) => request)
  }
})

const originalFetch = globalThis.fetch

let getRequest
let injectedGetRequest
const endpoint = 'https://rest-endpoint.com/test'

beforeEach(() => {
    globalThis.fetch = vi.fn(async (request) => request)
    getRequest = new Request(endpoint, {
        method: 'GET',
    })
    injectedGetRequest = new Request(endpoint, {
        method: 'GET',
        headers: {
            'X-Session-Id': '2727',
        },
    })
})

afterEach(() => {
    vi.resetAllMocks()
    globalThis.fetch = originalFetch
})

test('use jsdom in this test file', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})

test('injectSessionHeader called', async () => {
    const res = await sessionFetch(getRequest)
    expect(injectSessionHeader).toHaveBeenCalledTimes(1)
})

test('fetch called', async () => {
    const res = await sessionFetch(getRequest)
    expect(fetch).toHaveBeenCalledTimes(1)
})