class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(`Ошибка: ${response.status}`)
    }
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkServerResponse)
  }

  getCardList() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }

  getUserData() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  sendUserData(userData) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: userData.name, about: userData.about})
    })
  }

  postNewCard(cardData) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: cardData.imageName, link: cardData.imageLink})
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  updateUserAvatar(userData) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: userData.avatar })
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
    } else {
      return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
    }
}

  // // likeCard(cardId) {
  //   return this._request(`${this._url}/cards/${cardId}/likes`, {
  //     method: 'PUT',
  //     headers: this._headers,
  //   })
  // }

  // dislikeCard(cardId) {
  //   return this._request(`${this._url}/cards/${cardId}/likes`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   })
  // }


}

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: { 
    authorization: '0dc6bfd0-470c-4381-8a8e-7fcf3998b4b1',
    'Content-Type': 'application/json' 
  }
})

export default api;