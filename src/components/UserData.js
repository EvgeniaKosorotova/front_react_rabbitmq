import { BehaviorSubject } from 'rxjs';
import {config} from '../config';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const userData = {
  register,
  logout,
  deleteUser,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
}

function register(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${config.URI}/users`, requestOptions)
    .then((response) => {
        if (!response.ok) {
          window.location.reload(true);
        }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`${config.URI}/users/${id}`, requestOptions)
    .then(() => {
      localStorage.removeItem('currentUser');
      currentUserSubject.next(null);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}