import axios from "axios";

const API_URL = "http://localhost:8080/api/";
const headers = {
    'Content-Type': 'application/json'
};

class AuthService {


    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                if (response.data.jwt) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, password) {
        return axios.post(API_URL + "register",{
            email: email,
            password: password
            },
            {headers}
        )
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();