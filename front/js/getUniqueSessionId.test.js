import { expect, test, vi, beforeAll, beforeEach, afterEach } from 'vitest'
import { getUniqueSessionId } from './getUniqueSessionId.js'

const uniqueSessionIdKey = 'uniqueSessionId'
let originalLocalStorage;

beforeEach(() => {
  originalLocalStorage = window.localStorage;
  window.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] ?? null;
    },
    setItem(key, value) {
      this.store[key] = value;
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    },
  };
});

afterEach(() => {
  window.localStorage = originalLocalStorage;
});

test('use jsdom in this test file', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})

test('testing my mocked localStorage', () => {
  window.localStorage.setItem('key', 3)
  expect(window.localStorage.getItem('key')).toBe(3);
})

test('create, store and get random session id', () => {
  const sessionId = getUniqueSessionId()
  expect(window.localStorage.getItem(uniqueSessionIdKey)).toBe(sessionId);
})

test('get existing session id', () => {
  const originalSessionId = 'BÉPO13'
  localStorage.setItem(uniqueSessionIdKey, originalSessionId)
  const sessionId = getUniqueSessionId()
  expect(window.localStorage.getItem(uniqueSessionIdKey)).toBe(sessionId);
})