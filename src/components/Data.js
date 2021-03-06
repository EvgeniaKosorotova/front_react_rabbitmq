import {config} from '../config';

let data = {
  getField(name) {
    return localStorage.getItem(name);
  },

  setField(name, value) {
    localStorage.setItem(name, value);
  },

  async loginAsync (username, password) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      };
    
      let response = await fetch(`${config.URL}/tokens`, requestOptions);
    
      if (response.ok) {
        let data = await response.json();
        this.setField('accessToken', data.accessToken);
        this.setField('refreshToken', data.refreshToken);
        return true;
      }

      return false;
    }
    catch (e) {
      console.log(e);
    }
  },

  async refreshAsync () {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      };
    
      let response = await fetch(`${config.URL}/tokens?refreshToken=${this.getField('refreshToken')}`, requestOptions);
    
      if (response.ok) {
        let data = await response.json();
        this.setField('accessToken', data.accessToken);
        this.setField('refreshToken', data.refreshToken);
        return true;
      }
      else {
        this.logout();
        return false;
      }
    }
    catch (e) {
      console.log(e);
    }
  },

  async registerAsync (username, password) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      };
  
      let response = await fetch(`${config.URL}/users`, requestOptions);
    
      if (response.ok) {
        let data = await response.json();
        this.setField('username', data.username);
        return true;
      }
  
      return false;
    }
    catch (e) {
      console.log(e);
    }
  },

  logout() {
    localStorage.clear();
  }
}

export default data;