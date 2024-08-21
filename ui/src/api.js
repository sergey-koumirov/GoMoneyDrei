import axios from "axios";

const apiClient = axios.create({
  timeout: 4000,
  headers: {
    "Context-Type": "application/json",
  },
});

export const apiReports = async () => {
  return await apiClient.get(`/api/reports`).then((http) => {
    return http.data;
  });
};

export const apiCurrencies = async () => {
  return await apiClient.get(`/api/currencies`).then((http) => {
    return http.data;
  });
};

export const apiCurrenciesCreate = async (payload) => {
  return await apiClient
    .post(`/api/currencies`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiCurrenciesUpdate = async (payload) => {
  return await apiClient
    .put(`/api/currency/${payload.ID}`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiCurrenciesDelete = async (id) => {
  return await apiClient.delete(`/api/currency/${id}`).then((http) => {
    return http.data;
  });
};
