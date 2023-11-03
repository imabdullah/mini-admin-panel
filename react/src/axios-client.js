import axios from "axios"

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try {
        const { response } = error;
        if (response.status === 401) {
            console.log("401..loging out")
            localStorage.removeItem('ACCESS_TOKEN')
        }


    } catch (e) {
        console.log(e)
    }
    throw error

})

export default axiosClient;