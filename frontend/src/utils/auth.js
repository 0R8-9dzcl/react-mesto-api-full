export const BASE_URL = 'https://api.0R8-9dzcl.nomoredomains.work';

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
			'Content-Type': 'application/json',
			'credentials': 'include',
		},
		body: JSON.stringify({ password, email })
	})
	.then(res => checkOk(res))
}

export const login = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'credentials': 'include',
		},
		body: JSON.stringify({ password, email })
	})
	.then(res => checkOk(res))
}

export const getAuthorization = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'credentials': 'include',
		}
	})
	.then(res => checkOk(res))
}