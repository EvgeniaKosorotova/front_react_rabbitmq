import {config} from '../config';

let RoleService = {
    async getAsync() {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            let response = await fetch(`${config.URL}/roles`, requestOptions);

            if (response.ok) {
                let data = await response.json();
                return data;
            }

            return null;
        }
        catch (e) {
            console.log(e);
        }
    }
}

export default RoleService;