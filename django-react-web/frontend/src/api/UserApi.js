

// import dependencies
import axios from 'axios';


const baseUrl = '/api/v1';

class UserApi {

    /* Create user */
    create = () => { }

    /* Get user */
    read = () => {
        var token = localStorage.getItem('access');
        return axios.get(baseUrl + '/userprofile/',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }
        );
    }

    /* Update user */
    update = (data) => {
        var token = localStorage.getItem('access');

        var updatedUser = {
            email: data.email,
            first_name: data.first,
            last_name: data.last,
        }

        return axios.post(baseUrl + '/userprofile/update/', updatedUser,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }
        );
    }

    /* Get all users */
    readAll = () => {
        var token = localStorage.getItem('access');
        return axios.get('/api/v1/users/',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }
        );
    }
}

export default new UserApi();