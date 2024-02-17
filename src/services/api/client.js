export const client = async (
  endpoint,
  { method, body, ...customConfig } = {}
) => {
  const headers = {
    Accept: "*/*",
  };
  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    if (body instanceof FormData) {
      config.headers = {
        ...customConfig.headers,
        Accept: "*/*",
      };
      config.body = body;
    } else {
      (config.headers = {
        ...customConfig.headers,
        "Content-Type": "application/json",
      }),
        (config.body = JSON.stringify(body));
    }
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) return data;
    throw new Error(response.statusText + " - " + data.error);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data);
  }
};

client.get = (endpoint, customConfig = {}) => {
  return client(endpoint, { ...customConfig, method: "GET" });
};
client.delete = (endpoint, customConfig = {}) => {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};
client.post = (endpoint, body, customConfig = {}) => {
  return client(endpoint, { ...customConfig, body, method: "POST" });
};
client.put = (endpoint, body, customConfig = {}) => {
  return client(endpoint, { ...customConfig, body, method: "PUT" });
};
