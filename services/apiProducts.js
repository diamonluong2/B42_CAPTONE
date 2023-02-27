const URL = "https://63e864155f3e35d898f01f1a.mockapi.io/api/products";

function apiCreateProducts(product) {
  return axios({
    method: "POST",
    url: URL,
    data: product,
  });
}

function apiGetProducts(searchValue) {
  return axios({
    method: "GET",
    url: URL,
    // Những cặp key value khai báo bên trong object param sẽ được đưa lên url
    // example.com/products?key1=value
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiDeleteProduct(productId) {
  return axios({
    method: "DELETE",
    url: `${URL}/${productId}`,
  });
}

function apiGetProductsById(productId) {
  return axios({
    method: "GET",
    url: `${URL}/${productId}`,
  });
}

function apiUpdateProduct(productId, product) {
  return axios({
    method: "PUT",
    url: `${URL}/${productId}`,
    data: product,
  });
}
