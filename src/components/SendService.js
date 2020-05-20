import {config} from '../config';
import data from './Data';

let sendService = {
  async sendAsync (exchange, key, message) {
    await data.checkAccessTokenAsync();
    try {
      let accessToken = data.getField('accessToken');
      await fetch(`${config.URL}/messages`, {
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
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default sendService;