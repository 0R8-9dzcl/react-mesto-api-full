import { BASE_URL } from './auth';
class Api{
	constructor(selector) {
		this._url = selector.url;
		this._headers = selector.headers;
	}
	_checkOk(res) {
		if(res.ok) {
			return res.json();
		} else {
			return Promise.reject(res.status);
		}
	}
	getCards() {
		return fetch(this._url + '/cards', {
			method: 'GET',
			credentials: 'include',
			headers: this._headers
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	postCards(name, link) {
		return fetch(this._url + '/cards', {
			method: 'POST',
			credentials: 'include',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				link: link
			})
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	getUserInfo() {
		return fetch(this._url + '/users/me', {
			method: 'GET',
			credentials: 'include',
			headers: this._headers
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	setUserInfo(name, caption) {
		return fetch(this._url + '/users/me', {
			method: 'PATCH',
			credentials: 'include',
			headers: this._headers,
			body: JSON.stringify({
			name: name,
			about: caption
			})
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	updAvatar(src) {
		return fetch(this._url + '/users/me/avatar', {
			method: 'PATCH',
			credentials: 'include',
			headers: this._headers,
			body: JSON.stringify({
			avatar: src
			})
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	deleteCard(cardId) {
		return fetch(this._url + `/cards/${cardId}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: this._headers
		})
		.then(res => {
			return this._checkOk(res)
		})
	}
	changeLikeCardStatus(cardId, isLiked) {
		if(isLiked) {
			return fetch(this._url + `/cards/${cardId}/likes`, {
				method: 'PUT',
				credentials: 'include',
				headers: this._headers
			})
			.then(res => {
				return this._checkOk(res)
			})
		} else {
			return fetch(this._url + `/cards/${cardId}/likes`, {
				method: 'DELETE',
				credentials: 'include',
				headers: this._headers
			})
			.then(res => {
				return this._checkOk(res)
			})
		}
	}
}
const api = new Api({
    url: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
export default api;