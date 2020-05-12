import {config} from '../config';

let data = {
  currentUser: {
    username: "",
    accessToken: "",
    refreshToken: "",
  },

  async login (username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
  
    var response = await fetch(`${config.URI}/tokens`, requestOptions);
  
    if (response.ok) {
      var data = await response.json();
      this.currentUser.accessToken = data.accessToken;
      this.currentUser.refreshToken = data.refreshToken;
    }
  },

  async refresh () {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    };
  
    var response = await fetch(`${config.URI}/tokens?refreshToken=${this.currentUser.refreshToken}`, requestOptions);
  
    if (response.ok) {
      var data = await response.json();
      this.currentUser.accessToken = data.accessToken;
      this.currentUser.refreshToken = data.refreshToken;
    }
  },

  logout() {
    this.currentUser.accessToken = "";
    this.currentUser.refreshToken = "";
  }
}

export default data;