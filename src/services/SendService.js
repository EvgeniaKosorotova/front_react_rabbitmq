import {config} from '../config';
import dataService from './DataService';
import TokenService from './TokenService';

let sendService = {
  async sendAsync (exchange, key, message) {
    await TokenService.checkAccessTokenAsync();
    
    try {
      let accessToken = dataService.getField('accessToken');
      let response = await fetch(`${config.URL}/messages`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            "exchange": exchange,
            "key": key,
            "message": message
          })
      });
      
      return response.ok ? true : false;
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default sendService;