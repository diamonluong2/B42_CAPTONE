getProducts();

// Hàm gửi yêu cầu lấy danh sách sản phẩm từ API
function getProducts(searchValue) {
  apiGetProducts(searchValue)
    .then((response) => {
      // Call API thành công
      const product = response.data.map((product) => {
        return new Products(
          product.id,
          product.name,
          product.price,
          product.screen,
          product.backCam,
          product.frontCam,
          product.img,
          product.description,
          product.type
        );
      });
      renderProducts(response.data);
    })
    .catch((error) => {
      // Call API thất bại
      alert("API get products error");
    });
}
// Hàm xóa sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then((response) => {
      getProducts();
    })
    .catch((error) => {
      alert("Lỗi rùi");
    });
}

// Hàm cập nhật sản phẩm
function updateProduct(productId) {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    screen: getElement("#screen").value,
    backCam: getElement("#backCam").value,
    frontCam: getElement("#frontCam").value,
    img: getElement("#img").value,
    description: getElement("#desc").value,
    type: getElement("#type").value,
  };

  apiUpdateProduct(productId, product)
    .then((response) => {
      getProducts();
    })
    .catch((error) => {
      alert("Lỗi rùi");
    });
}

//Hàm lấy chi tiết 1 sản phẩm và hiển thị modal
function selectProduct(productId) {
  apiGetProductsById(productId)
    .then((response) => {
      const product = response.data;

      getElement("#name").value = product.name;
      getElement("#price").value = product.price;
      getElement("#screen").value = product.screen;
      getElement("#backCam").value = product.backCam;
      getElement("#frontCam").value = product.frontCam;
      getElement("#img").value = product.img;
      getElement("#desc").value = product.description;
      getElement("#type").value = product.type;

      getElement("#header-title").innerHTML = "Cập nhật sản phẩm";
      getElement(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
        <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Cập nhật</button>
      `;
      $("#exampleModal").modal("show");
    })
    .catch((error) => {
      // Tắt modal

      alert("Lỗi rùi");
    });
}

// Hàm thêm sản phẩm: DOM và gửi yêu cầu thêm sản phẩm tới API
function createProduct() {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    screen: getElement("#screen").value,
    backCam: getElement("#backCam").value,
    frontCam: getElement("#frontCam").value,
    img: getElement("#img").value,
    description: getElement("#desc").value,
    type: getElement("#type").value,
  };

  apiCreateProducts(product)
    .then((response) => {
      // Sau khi gọi API thêm sản phẩm thành công, dữ liệu chỉ mới thay đổi ở phía server
      // Cần gọi lại API lấy danh sách sản phẩm (lúc này sẽ bao gồm sản phẩm vừa được thêm thành công) và tạo ra giao diện
      getProducts();
    })
    .catch((error) => {
      alert("Lỗi rùi");
    });
}

// Hàm hiển thị danh sách sản phẩm ra table
function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
          <img src="${product.img}" with="70" height="70" />
        </td>
        <td>${product.description}</td>
        <td>
          <button class="btn btn-primary" onclick="selectProduct('${
            product.id
          }')">Xem</button>
          <button class="btn btn-danger" onclick="deleteProduct('${
            product.id
          }')">Xoá</button>
        </td>
      </tr>
    `
    );
  }, "");

  document.getElementById("table-phone").innerHTML = html;
}

// DOM
// document.getElementById("btnThemSP").addEventListener("click", () => {
//   getElement(".modal-title").innerHTML = "Thêm sản phẩm";
//   getElement(".modal-footer").innerHTML = `
//     <button class="btn btn-secondary" data-dismiss="modal" ">Hủy</button>
//     <button class="btn btn-primary" onclick="createProduct()">Thêm</button>
//   `;
// });

// getElement("#txtSearch").addEventListener("input", (event) => {
//   // event là một cái object thông tin sự kiện được sinh ra
//   // event.target: trả ra cái element phát sinh ra sự kiện
//   console.log(event);
//   const searchValue = event.target.value;
//   getProducts(searchValue);
// });
// getElement("#txtSearch").addEventListener("keydown", (event) => {
//   // event là một cái object thông tin sự kiện được sinh ra
//   // event.target: trả ra cái element phát sinh ra sự kiện
//   console.log(event.key);
//   if (event.key !== "Enter") return;
//   const searchValue = event.target.value;
//   getProducts(searchValue);
// });

// // Helper
// function getElement(selector) {
//   return document.querySelector(selector);
// }
