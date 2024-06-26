// noinspection JSUnusedGlobalSymbols

import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {router} from "../router/Routers";
import {PaginatedResponse} from "../models/pagination";
import {store} from "../store/configureStore";
import {createFormData} from "../util/util";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

const responseBody = (response: AxiosResponse) => response.data;

//Custom Request Headers
axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

//Custom Response Headers
axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep()
    const pagination = response.headers['pagination']
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination))
        console.log(response)
        return response
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = []
                for (const errorsKey in data.errors) {
                    if (data.errors[errorsKey]) {
                        modelStateErrors.push(data.errors[errorsKey])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break
        case 401:
            toast.error(data.title)
            break
        case 403:
            toast.error("You are not allowed to do that!")
            break
        case 404:
            toast.error(data.title)
            break
        case 500:
            router.navigate('/server-error', {state: {error: data}}).then((value) => {
                console.log(value)
            })
            break
        default:
            break
    }

    return Promise.reject(error.response)
})

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
}

const Admin = {
    createProduct: (product: any) => requests.postForm('products', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('products', createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`products/${id}`)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const TestError = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) =>
        requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) =>
        requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Order = {
    list: () => requests.get('order'),
    fetch: (id: number) => requests.get(`order/${id}`),
    create: (values: any) => requests.post(`order`, values),
}

const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const agent = {
    Catalog,
    TestError,
    Basket,
    Account,
    Order,
    Payments,
    Admin
}

export default agent;