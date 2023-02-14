type SetTypeObject = { tag: string }

const BrowserStorage = {
  set(key: string, value: string) {
    window.localStorage[key] = value
    return window.localStorage[key]
  },
  get(key: string, defaultValue = '') {
    return window.localStorage[key] || defaultValue
  },
  setObject(key: string, value: SetTypeObject) {
    window.localStorage[key] = JSON.stringify(value)
    return this.getObject(key)
  },
  getObject(key: string): SetTypeObject {
    return JSON.parse(window.localStorage[key] || null)
  },
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}

export default BrowserStorage
