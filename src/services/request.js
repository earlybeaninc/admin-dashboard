import { stringify } from 'query-string'
import Cookies from 'js-cookie'
import { Buffer } from 'buffer'

export function url(uri, queryParams, routeApi) {
	const baseUrl = `${routeApi}${uri}`
	return queryParams
	? `${baseUrl}?${stringify(queryParams)}`
	: baseUrl
}

export function get(url, kwargs = {}) {
	const { token, ...options } = kwargs
	const defaults = {
		// credentials: 'include',
		headers: Object.assign({ // eslint-disable-line
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		}, token ? { 'Authorization': `Bearer ${token}` } : {}),
		method: 'GET'
	}
	return request(url, _mergeOptions(defaults, options))
}

export function post(url, data, kwargs = {}) {
	const { token, ...options } = kwargs
	const defaults = {
		// credentials: 'include',
		headers: Object.assign({ // eslint-disable-line
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-CSRFToken': Cookies.get('csrf_token')
		}, token ? { 'Authorization': `Bearer ${token}` } : {}),
		method: 'POST',
		body: JSON.stringify(data)
	}
	return request(url, _mergeOptions(defaults, options))
  }

  export function postFormData(url, data, kwargs = {}) {
	const { token, ...options } = kwargs
	const defaults = {
		headers: Object.assign(token ? { 'Authorization': `Bearer ${token}` } : {}),
		method: 'POST',
		body: data
	}
	return request(url, _mergeOptions(defaults, options))
  }

  export function authHeader(url, data, kwargs = {}) {
	const { ...options } = kwargs
	const encodedString = Buffer.from(`${data.email}:${data.password}`).toString('base64');
	const defaults = {
		headers: Object.assign({ // eslint-disable-line
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Basic ${encodedString}`
		}),
		method: 'POST'
	}
	return request(url, _mergeOptions(defaults, options))
  }
  
export function put(url, data, options = {}) {
	return post(url, data, _setMethod(options, 'PUT'))
}

export function putFormData(url, data, options = {}) {
	return postFormData(url, data, _setMethod(options, 'PUT'))
}
  
export function patch(url, data, options = {}) {
	return post(url, data, _setMethod(options, 'PATCH'))
}
  
export function delete_(url, options = {}) {
	return get(url, _setMethod(options, 'DELETE'))
}
  

export const request = async (url, options) => {
	return fetch(url, options)
		.then(_checkStatusAndParseJSON)
		.catch((e) => {
		return new Promise((_, reject) => {
			if (e.response) {
				reject(e)
			} else {
				// should only end up here if the flask application has gone away
				e.response = {
					status: -1,
					statusText: e.message,
					error: e.message
				}
				reject(e)
			}
		})
	})
}

function _checkStatusAndParseJSON(response) {
	return new Promise((resolve, reject) => {
		response.json()
		.then((json) => {
			if (_checkStatus(response)) {
				// success response with json body
				resolve(json)
			} else {
				// error response with json error message
				reject(json.messages)
			}
		})
		// response with no body (response.json() raises SyntaxError)
		.catch(() => {
			if (_checkStatus(response)) {
				// success response with no body (most likely HTTP 204: No Content)
				resolve(null)
			} else {
				// error response, create generic error message from HTTP status
				reject(_responseError(response, { error: response.statusText }))
			}
		})
	})
  }
  
function _mergeOptions(defaults, options) {
	return Object.assign({}, defaults, { // eslint-disable-line
		...options,
		headers: {
		...defaults.headers,
		...options.headers
		}
	})
}

function _setMethod(options, method) {
	return Object.assign({}, options, { method }) // eslint-disable-line
}  
  
function _checkStatus(response) {
	return response.status >= 200 && response.status < 300
}
  
function _responseError(response, json) {
	const error = new Error(response.statusText)
	error.response = Object.assign({ // eslint-disable-line
		status: response.status,
		statusText: response.statusText
	}, json)
	return error
}
  