import ProviderMethods from './ProviderMethods';
import axios from 'axios';
import { Config } from '../Config';

class ProviderManager {

    static async getData(funcName, params) {

        let methodData = ProviderMethods[funcName];

        let fetchObj = await this.getFetchObj(methodData, params);

        try {
            return axios(fetchObj)
                .then((res) => {
                    if (res.status === 200) {
                        //debugger;
                        return Promise.resolve(res.data);
                    } else {
                        //debugger;
                        return Promise.reject(
                            new Error('Unauthorized')
                        );
                    }
                })
                .catch((e) => {
                    //debugger;
                    if (e.toString().includes('401')) {
                        window.location.href = '/login';
                    }
                    return Promise.reject(e);
                });
        } catch (e) {
            //debugger;
            if (e === 'TypeError: Failed to fetch' || e === 'TypeError: Network request failed') {
                return Promise.reject(
                    new Error('ConnectionError')
                );
            }
            else { return Promise.reject(e); }
        }

    }

    static async getFetchObj(funcObj, params) {
        let headers = {};

        headers['Content-Type'] = 'application/json';

        if (funcObj.requiredLogin) {
            const token = localStorage.getItem('token');
            headers['Authorization'] = 'Bearer ' + token;
        }

        let url = '';

        if (funcObj.httpMethod === 'get') {
            if ((!params || Object.keys(params).length === 0)) {
                url = funcObj.apiName;
            }
            else {
                url = funcObj.apiName + '/' + Object.entries(params).map(e => e[1]).join('/');
            }
        }
        else {
            url = funcObj.apiName;
        }

        let fetchObj = {
            baseURL: Config.baseApiUrl,
            url: url,
            method: funcObj.httpMethod,
            timeout: 40000,
            data: (funcObj.httpMethod == 'get' ? undefined : params),
            headers: headers,
        };

        return fetchObj;
    }

}

export default ProviderManager;
