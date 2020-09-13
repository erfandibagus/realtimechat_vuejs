import Vue from 'vue';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

Vue.prototype.$api = api;

export {
    api
};