export const BASE_URL = 'https://auth.nomoreparties.co';

function checkOk(res) {
	// console.log(res)
	if(res.ok) {
		// console.log(res.json);
		return res.json();
	} else {
		return Promise.reject(res.status);
	}
}

export const register = (password, email) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
	.then(res => checkOk(res))
}

export const login = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ password, email })
	})
	.then(res => checkOk(res))
}

export const getAuthorization = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"Authorization" : `Bearer ${token}`
		}
	})
	.then(res => checkOk(res))
}