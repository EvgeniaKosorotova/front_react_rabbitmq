import {config} from '../config';
import moment from 'moment';
import dataService from './DataService';

let UserService = {
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
        dataService.setField('accessToken', data.accessToken);
        dataService.setField('refreshToken', data.refreshToken);
        dataService.setField('expiryDate', moment().add(data.lifeTime));
        dataService.setField('roleId', data.roleId);

        return true;
      }

      return false;
    }
    catch (e) {
      console.log(e);
    }
  },

  async registerAsync (username, password) {
    try {
      const roleDefault = 'User';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, roleDefault })
      };
  
      let response = await fetch(`${config.URL}/users`, requestOptions);
    
      if (response.ok) {
        let data = await response.json();
        dataService.setField('username', data.username);

        return true;
      }
  
      return false;
    }
    catch (e) {
      console.log(e);
    }
    },

    async getAsync() {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            let response = await fetch(`${config.URL}/users`, requestOptions);

            if (response.ok) {
                let data = await response.json();
                
                return data;
            }

            return null;
        }
        catch (e) {
            console.log(e);
        }
    },

    async updateAsync(user) {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };

            let response = await fetch(`${config.URL}/users`, requestOptions);

            return response.ok ? true : false;
        }
        catch (e) {
            console.log(e);
        }
    },

  logout() {
    dataService.setField('accessToken', null);
    dataService.setField('refreshToken', null);
    dataService.setField('expiryDate', null);
    dataService.setField('roleId', null);
  }
}

export default UserService;