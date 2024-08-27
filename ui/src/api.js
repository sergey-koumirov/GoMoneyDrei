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

// Currencies
export const apiCurrencies = async () => {
  return await apiClient.get(`/api/currencies`).then((http) => {
    return http.data;
  });
};

export const apiCurrencyCreate = async (payload) => {
  return await apiClient
    .post(`/api/currencies`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiCurrencyUpdate = async (payload) => {
  return await apiClient
    .put(`/api/currency/${payload.ID}`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiCurrencyDelete = async (id) => {
  return await apiClient.delete(`/api/currency/${id}`).then((http) => {
    return http.data;
  });
};

// Accounts
export const apiAccounts = async (page) => {
  return await apiClient.get(`/api/accounts?page=${page}`).then((http) => {
    return http.data;
  });
};

export const apiAccountCreate = async (payload) => {
  return await apiClient
    .post(`/api/accounts`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiAccountUpdate = async (payload) => {
  return await apiClient
    .put(`/api/account/${payload.ID}`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiAccountDelete = async (id) => {
  return await apiClient.delete(`/api/account/${id}`).then((http) => {
    return http.data;
  });
};

export const apiAccountReport = async (id) => {
  return await apiClient.get(`/api/account/${id}/report`).then((http) => {
    return http.data;
  });
};

// Transactions
export const apiTransactions = async (page) => {
  return await apiClient.get(`/api/transactions?page=${page}`).then((http) => {
    return http.data;
  });
};

export const apiTransactionCreate = async (payload) => {
  return await apiClient
    .post(`/api/transactions`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiTransactionUpdate = async (payload) => {
  return await apiClient
    .put(`/api/transaction/${payload.ID}`, payload)
    .then(({ data: { currency, errors } }) => {
      return { currency, errors };
    });
};

export const apiTransactionDelete = async (id) => {
  return await apiClient.delete(`/api/transaction/${id}`).then((http) => {
    return http.data;
  });
};
