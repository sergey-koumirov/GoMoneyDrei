import axios from "axios"

const apiClient = axios.create({
  timeout: 4000,
  headers: {
    "Context-Type": "application/json",
  },
})

export const apiReports = async () =>{
    return await apiClient.get(`/api/reports`)
        .then((http) => {
            return http.data;
        })
}

export const apiCurrencies = async () =>{
    return await apiClient.get(`/api/currencies`)
        .then((http) => {
            return http.data;
        })
}