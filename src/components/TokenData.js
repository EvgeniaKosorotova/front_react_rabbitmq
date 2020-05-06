import { BehaviorSubject } from 'rxjs';
import {config} from '../config';

const currentTokensSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentTokens')));

export const tokenData = {
  login,
  refresh,
  logout,
  currentTokens: currentTokensSubject.asObservable(),
  get currentTokensValue () { return currentTokensSubject.value }
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${config.URI}/tokens`, requestOptions)
    .then((response) => {
      if (response.ok) {
        localStorage.setItem('currentTokens', response.json());
        currentTokensSubject.next(response.json());
      }
      else {
        window.location.reload(true);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function refresh(refreshToken) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`${config.URI}/tokens?refreshToken=${refreshToken}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        localStorage.setItem('currentTokens', response.json());
        currentTokensSubject.next(response.json());
      }
      else {
        window.location.reload(true);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function logout() {
  localStorage.removeItem('currentTokens');
  currentTokensSubject.next(null);
}