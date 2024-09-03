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
export const apiTransactions = async (page, filter) => {
  const params = [];
  if (!!page) {
    params.push(`page=${page}`);
  }

  if (filter && !!filter.fromID) {
    params.push(`fromID=${filter.fromID}`);
  }

  if (filter && !!filter.toID) {
    params.push(`toID=${filter.toID}`);
  }

  return await apiClient
    .get(`/api/transactions?${params.join("&")}`)
    .then((http) => {
      return http.data;
    });
};

export const apiTransactionCreate = async (payload) => {
  return await apiClient
    .post(`/api/transactions`, payload)
    .then(({ data: { transaction, errors } }) => {
      return { transaction, errors };
    });
};

export const apiTransactionUpdate = async (payload) => {
  return await apiClient
    .put(`/api/transaction/${payload.ID}`, payload)
    .then(({ data: { transaction, errors } }) => {
      return { transaction, errors };
    });
};

export const apiTransactionDelete = async (id) => {
  return await apiClient.delete(`/api/transaction/${id}`).then((http) => {
    return http.data;
  });
};

// Templates
export const apiTemplates = async (page) => {
  return await apiClient.get(`/api/templates?page=${page}`).then((http) => {
    return http.data;
  });
};

export const apiTemplateCreate = async (payload) => {
  return await apiClient
    .post(`/api/templates`, payload)
    .then(({ data: { transaction, errors } }) => {
      return { transaction, errors };
    });
};

export const apiTemplateUpdate = async (payload) => {
  return await apiClient
    .put(`/api/template/${payload.ID}`, payload)
    .then(({ data: { transaction, errors } }) => {
      return { transaction, errors };
    });
};

export const apiTemplateDelete = async (id) => {
  return await apiClient.delete(`/api/template/${id}`).then((http) => {
    return http.data;
  });
};

// Stocks
export const apiStocks = async () => {
  return await apiClient.get(`/api/stocks`).then((http) => {
    return http.data;
  });
};

export const apiStockCreate = async (payload) => {
  return await apiClient
    .post(`/api/stocks`, payload)
    .then(({ data: { stock, errors } }) => {
      return { stock, errors };
    });
};

export const apiStockUpdate = async (payload) => {
  return await apiClient
    .put(`/api/stock/${payload.ID}`, payload)
    .then(({ data: { stock, errors } }) => {
      return { stock, errors };
    });
};

export const apiStockDelete = async (id) => {
  return await apiClient.delete(`/api/stock/${id}`).then((http) => {
    return http.data;
  });
};
