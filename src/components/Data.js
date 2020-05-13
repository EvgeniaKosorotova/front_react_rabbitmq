import {config} from '../config';

let data = {
  currentUser: {
    username: "",
    accessToken: null,
    refreshToken: null,
  },

  async loginAsync (username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
  
    let response = await fetch(`${config.URL}/tokens`, requestOptions);
  
    if (response.ok) {
      let data = await response.json();
      this.currentUser.accessToken = data.accessToken;
      this.currentUser.refreshToken = data.refreshToken;
      return true;
    }

    return false;
  },

  async refreshAsync () {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    };
  
    let response = await fetch(`${config.URL}/tokens?refreshToken=${this.currentUser.refreshToken}`, requestOptions);
  
    if (response.ok) {
      let data = await response.json();
      this.currentUser.accessToken = data.accessToken;
      this.currentUser.refreshToken = data.refreshToken;
    }
  },

  async registerAsync (username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };

    let response = await fetch(`${config.URL}/users`, requestOptions);
  
    if (response.ok) {
      let data = await response.json();
      this.currentUser.accessToken = data.username;
      return true;
    }

    return false;
  },

  logout() {
    this.currentUser.accessToken = null;
    this.currentUser.refreshToken = null;
  }
}

export default data;