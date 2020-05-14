import axios from "axios";
const headers = {
    "Content-Type": "application/json",
  };
  const burl = "http://localhost:8800";

export default{
    login: function(email, password) {
        return axios.get(
            `${burl}/user`,
            {
                email: email,
                password: password
            },
            {
                headers: headers
            }
        );
    },
    signup: function(email, password, firstName, lastName, pseudo, birthDate) {
        return axios.post(
            `${burl}/user`,
            {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                pseudo:pseudo,
                birthDate: birthDate
            },
            {
                headers: headers
            }
        );
    },
    
    getCurrentLocation: function(token) {
        return axios.post(
            `${burl}/user/location`,
            {
                email: email,
                token: token
            },
            {
                headers: headers
            }
        );
    },

    history: function(token) {
        return axios.get(
            `${burl}/location`,
            {
                token: token
            },
            {
                headers: headers
            }
        );
    },
    

    addLocation: function(token, form) { //form est détaillé dans le swagger
        return axios.post(
            `${burl}/location`,
            {
                token: token,
                form: form
            },
            {
                headers: headers
            }
        );
    },
    archiveLocation: function(token, form) { //form est détaillé dans le swagger
        return axios.put(
            `${burl}/location`,
            {
                token: token,
                form: form
            },
            {
                headers: headers
            }
        );
    },

    deleteLocation: function(token, form) { //form est détaillé dans le swagger
        return axios.delete(
            `${burl}/location`,
            {
                token: token,
                form: form
            },
            {
                headers: headers
            }
        );
    },

    addFriend: function(token, friendEmail) { //form est détaillé dans le swagger
        return axios.post(
            `${burl}/friends`,
            {
                token: token,
                friendEmail: friendEmail
            },
            {
                headers: headers
            }
        );
    },

    acceptFriend: function(token, friendEmail) { //form est détaillé dans le swagger
        return axios.put(
            `${burl}/friends`,
            {
                token: token,
                friendEmail: friendEmail
            },
            {
                headers: headers
            }
        );
    },

    deleteFriend: function(token, friendEmail) { //form est détaillé dans le swagger
        return axios.delete(
            `${burl}/friends`,
            {
                token: token,
                friendEmail: friendEmail
            },
            {
                headers: headers
            }
        );
    },

    getFriends: function(token) { //form est détaillé dans le swagger
        return axios.get(
            `${burl}/friends`,
            {
                token: token
            },
            {
                headers: headers
            }
        );
    },


    isAuth: function() {
        if (localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }

};