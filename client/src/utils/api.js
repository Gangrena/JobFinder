const Config = {
  development: {
      'apiUrl': 'http://localhost:5000/'
  },
  production:  {
      'apiUrl': ''
  }
};

export const getConfig = () => process.env.NODE_ENV === 'production' ? Config.production : Config.development;


const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

const getRequestInfo = (url) => (`${getConfig().apiUrl}${url}`);

const init = (method) => {
  return {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };
};

const getRequestInit = (queryOrBody, method, token) => {
  let requestInit = init(method);

  if (method === 'GET') {
    requestInit.query = JSON.stringify(queryOrBody);
  } else {
    requestInit.body = JSON.stringify(queryOrBody);
  }

  token && requestInit.headers.append('Authorization',`Bearer ${token}`);

  return requestInit;
};

const Api = {
  get: (url, query = {}, token = '') => (
    fetch(getRequestInfo(url), getRequestInit(query, 'GET', token))
      .then(handleErrors)
      .then(response => response.json())
  ),
  post: (url, body = {}, token = '') => (
    fetch(getRequestInfo(url), getRequestInit(body, 'POST', token))
      .then(handleErrors)
      .then(response => response.json())
  )
};

export default Api;
