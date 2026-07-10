import { expect, test, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import * as getUniqueSessionModule from '../injectSessionHeader/getUniqueSessionId.js'
import * as injectSessionHeaderModule from '../injectSessionHeader/injectSessionHeader.js'
import * as sessionFetchModule from '../injectSessionHeader/sessionFetch.js'

const sessionFetchSpy = vi.spyOn(sessionFetchModule, 'sessionFetch')
const injectHeaderSpy = vi.spyOn(injectSessionHeaderModule, 'injectSessionHeader')
const getIdSpy = vi.spyOn(getUniqueSessionModule, 'getUniqueSessionId')
const endpoint = 'https://hello.com'
const localStorageKey = 'uniqueSessionId'
const headerSessionKey = 'X-Session-Id'
let getRequest
let posts

export const restHandlers = [
  http.get(endpoint, ({ request }) => {
    const sessionId = request.headers.get(headerSessionKey)
    posts[0].sessionId=sessionId
    return HttpResponse.json(posts)
  }),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

beforeEach(() => {
    getRequest = new Request(endpoint, {
    method: 'GET',
    headers: {
        'Content-Type': 'Strict-Transport-Security',
    },
    })
    posts = [
        {
            userId: 1,
            id: 1,
            title: 'first post title',
            body: 'first post body',
        },
    ]
})

afterEach(() => {
    vi.resetAllMocks()
    server.resetHandlers()
    localStorage.clear()
})

test('use jsdom in this test file', () => {
    const element = document.createElement('div')
    expect(element).not.toBeNull()
})

test('sessionFetch : all functions called', () => {
    sessionFetchSpy(endpoint)
    expect(getIdSpy).toHaveBeenCalledTimes(1)
    expect(injectHeaderSpy).toHaveBeenCalledTimes(1)
})

test('injectSessionHeader : getUniqueSessionId called', () => {
    injectHeaderSpy(getRequest)
    expect(getIdSpy).toHaveBeenCalledTimes(1)
})

test('session id created and passed to backend', async () => {
    expect(localStorage.getItem(localStorageKey)).toBeNull()
    const res = await sessionFetchSpy(endpoint)
    const json = await res.json()
    const localStorageSessionId = localStorage.getItem(localStorageKey)
    expect(localStorageSessionId).not.toBeNull()
    expect(json[0].sessionId).toEqual(localStorageSessionId)
})

test('session id read and passed to backend', async () => {
    const localStorageSessionId = '2727_MARS'
    localStorage.setItem(localStorageKey, localStorageSessionId)
    const res = await sessionFetchSpy(endpoint)
    const json = await res.json()
    expect(json[0].sessionId).toEqual(localStorageSessionId)
})

test('overwrite header', async () => {
    const localStorageSessionId = '2727_VENUS'
    const misspelledSessionId = '2727-VENUS'
    localStorage.setItem(localStorageKey, localStorageSessionId)
    getRequest.headers.append(headerSessionKey, misspelledSessionId)
    injectHeaderSpy(getRequest)
    const res = await fetch(getRequest)
    const json = await res.json()
    expect(json[0].sessionId).toEqual(localStorageSessionId)
    expect(json[0].sessionId).not.toEqual(misspelledSessionId)
})

test('header not injected (oversight)', async () => {
    const localStorageSessionId = '2727_VENUS'
    const misspelledSessionId = '2727-VENUS'
    localStorage.setItem(localStorageKey, localStorageSessionId)
    getRequest.headers.append(headerSessionKey, misspelledSessionId)
    const res = await fetch(getRequest)
    const json = await res.json()
    expect(json[0].sessionId).not.toEqual(localStorageSessionId)
    expect(json[0].sessionId).toEqual(misspelledSessionId)
})