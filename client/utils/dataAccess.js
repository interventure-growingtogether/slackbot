import fetch from 'isomorphic-unfetch';

const http = (
  url,
  data,
  method = 'post',
  headers = { 'Content-Type': 'application/json' }
) =>
  fetch(`http://localhost:${process.env.PORT}${url}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers,
  }).then((res) => {
    if (res.status >= 400) {
      return Promise.reject(res);
    }
    return res.json();
  });

export const getArticles = () => http('/api/articles', '', 'get');
export const addNewArticle = (link, tags) => http('/api/articles', {link, tags} );
export const updateNewArticle = (id, link, tags) => http(`/api/articles/${id}`, {link, tags}, 'put');
export const acceptNewArticle = (id) => http(`/api/articles/${id}/accept`, {}, 'put');
export const deleteArticle = (id) => http(`/api/articles/${id}`, {}, 'delete');