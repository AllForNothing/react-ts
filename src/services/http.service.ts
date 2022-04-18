import axios from 'axios'
import { history } from "./router/MyRouter";

export const SAFE_METHODS: string[] = ["GET", "HEAD", "OPTIONS", "TRACE"];


export const axiosInstance = axios.create({
    baseURL: '',
});



// 添加请求拦截器
axiosInstance.interceptors.request.use(function (request) {
    // Get the csrf token from localstorage
    const token = localStorage.getItem("__csrf");
    if (token) {
        if (request.method && SAFE_METHODS.indexOf(request.method.toUpperCase()) === -1) {
            request.headers!['X-Harbor-CSRF-Token'] = token;
        }
    }
    return request;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const responseToken: string = response.headers['x-harbor-csrf-token'];
    if (responseToken) {
        localStorage.setItem("__csrf", responseToken);
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error?.response?.headers) {
        const responseToken: string = error.response.headers['x-harbor-csrf-token'];
        if (responseToken) {
            localStorage.setItem("__csrf", responseToken);
        }
    }
    // 在非登录页出现401则跳转 登录页， 登录完成 则返回至原来的 页面
    if (error?.response?.status === 401 && history.location.pathname !== '/login') {

        console.info('在拦截器中被跳转至登录页');
        history.push('/login', {
            from: {
                pathname: history.location.pathname
            }
        })
    }
    // 如果是 403， 说明csrf token 过期 或者没有。在上面的代码中csrf token已刷新， 所以这里重发请求即可
    if (error?.response?.status === 403) {
        return axiosInstance.request(error.config);
    }
    return Promise.reject(error);
});
