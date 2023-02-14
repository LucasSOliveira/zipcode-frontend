import axios from 'axios'

export const baseURL = process.env.REACT_APP_ZIPCODE_API
const responseType = 'json'
const instance = axios.create({ baseURL, responseType })
export default instance
