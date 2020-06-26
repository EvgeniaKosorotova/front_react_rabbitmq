import {config} from '../config';
import moment from 'moment';
import UserService from './UserService';
import dataService from './DataService';

let TokenService = {
  async checkAccessTokenAsync () {
    let expiryDateField = dataService.getField('expiryDate');
    let isRefresh = false;

    if (expiryDateField != 'null') {
      let expiryDate = moment(new Date(expiryDateField).toISOString());
      let now = moment(new Date().toISOString());
  
      if (expiryDate <= now) {
        isRefresh = true;
      }
    }
    else {
      isRefresh = true;
    }
    
    isRefresh && await this.refreshAsync();
  },

  async refreshAsync() {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      };
    
      let response = await fetch(`${config.URL}/tokens?refreshToken=${dataService.getField('refreshToken')}`, requestOptions);
    
      if (response.ok) {
        let data = await response.json();
        dataService.setField('accessToken', data.accessToken);
        dataService.setField('refreshToken', data.refreshToken);
        dataService.setField('expiryDate', moment().add(data.lifeTime));
      }
      else {
        UserService.logout();
      }
    }
    catch (e) {
      console.log(e);
    }
  },
}

export default TokenService;