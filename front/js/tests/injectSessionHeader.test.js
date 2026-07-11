import { expect, test, vi, afterEach } from 'vitest'
import { injectSessionHeader } from '../injectSessionHeader/injectSessionHeader.js'
import { getUniqueSessionId } from '../injectSessionHeader/getUniqueSessionId.js'

const unique_id = 'catX27'
const header_name = 'X-Session-Id'

vi.mock(import('../injectSessionHeader/getUniqueSessionId.js'), () => {
  return {
     getUniqueSessionId: vi.fn(() => unique_id)
  }
})

const endpoint = 'https://rest-endpoint.com/test'

const getRequest1 = new Request(endpoint, {
  method: 'GET',
  headers: {
    'Content-Type': 'Strict-Transport-Security',
  },
})

const getRequest2 = new Request(endpoint, {
  method: 'GET',
  headers: {
    [header_name]: 'CatX27',
  },
})

const postRequest = new Request(endpoint, {
  method: 'POST',
  body: '{ {id: 1, sockId:38}, {id:2, sockId:67} }'
})

async function getData(request) {
  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(error.message)
  }
}

afterEach(() => {
  vi.resetAllMocks()
})

test('use jsdom in this test file', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})

test('Get Request No X-Session-Id header', () => {
  expect(getRequest1.headers.has(header_name)).toBeFalsy()
  injectSessionHeader(getRequest1)
  expect(getRequest1.headers.has(header_name)).toBeTruthy()
  expect(getRequest1.headers.get(header_name)).toEqual(unique_id)
  expect(getRequest1.headers.has('content-type')).toBeTruthy()
  expect(getRequest1.headers.get('content-type')).toEqual('Strict-Transport-Security')
  expect(getUniqueSessionId).toHaveBeenCalledTimes(1)
})

test('Get Request with false X-Session-Id header', () => {
  expect(getRequest2.headers.has(header_name)).toBeTruthy()
  expect(getRequest2.headers.get(header_name)).not.toEqual(unique_id)
  injectSessionHeader(getRequest2)
  expect(getRequest2.headers.has(header_name)).toBeTruthy()
  expect(getRequest2.headers.get(header_name)).toEqual(unique_id)
  expect(getUniqueSessionId).toHaveBeenCalledTimes(1)
})

test('Post Request', () => {
  injectSessionHeader(postRequest)
  expect(postRequest.headers.has(header_name))
  expect(postRequest.headers.get(header_name)).toEqual(unique_id)
  expect(getUniqueSessionId).toHaveBeenCalledTimes(1)
})
