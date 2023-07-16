// let clos = document.getElementById("close");
// let ope = document.getElementById("open");
// let contanier = document.getElementById("contanier");

// contanier.classList.add("discont");
// clos.classList.add("disclo");

// ope.onclick=()=>{
//     ope.classList.add("disop");
//     contanier.classList.remove("discont");
//     clos.classList.remove("disclo");

// }
// clos.onclick=()=>{
//     ope.classList.remove("disop");
//     contanier.classList.add("discont");
//     clos.classList.add("disclo");
// }

// if (localStorage.length > 0) {
//   document.body.style.background = localStorage.color;
// }
// function setcolor(color) {
//   localStorage.setItem("color", color);
//   document.body.style.background = color;
// }

//dark Mode/ light Mode
let body = document.getElementById("body");
let dark = document.getElementById("dark");
let input = document.querySelectorAll("input");
if (localStorage.length > 0) {
  dark.innerHTML = localStorage.getItem("mode");
  body.classList = localStorage.getItem("color");
  dark.classList = localStorage.getItem("btn");
  input.forEach((inputelement) => {
    inputelement.classList = localStorage.getItem("input");
  });
}

dark.onclick = function () {
  body.classList.toggle("dark");
  dark.classList.toggle("light");
  input.forEach((inputelement) => {
    inputelement.classList.toggle("light");
    localStorage.setItem("input", inputelement.classList);
  });
  if (body.className != "dark") {
    dark.innerHTML = "Switch to Light Mode";
  } else {
    dark.innerHTML = "Switch to Dark Mode";
  }
  localStorage.setItem("mode", dark.innerHTML);
  localStorage.setItem("color", body.className);
  localStorage.setItem("btn", dark.className);
};
//end dark/lightmode

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let category = document.getElementById("category");
let mood = "create";
let tmp;

//get Total
function getTotal() {
  if (price.value != "") {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

//create product
let datPro;
if (localStorage.product != null) {
  datPro = JSON.parse(localStorage.product);
} else {
  datPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //count
  if (
    title.value != "" &&
    price.value != "" &&
    ads.value != "" &&
    taxes.value != "" &&
    category.value != "" &&
    newPro.count <= 100
  ) {
    if (mood == "create") {
      if (newPro.count > 0) {
        for (let i = 0; i < newPro.count; i++) {
          datPro.push(newPro);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your product has been added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      clearDate();
    } else {
      datPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  } else {
    datPro;
  }
  //save in localstorage

  localStorage.setItem("product", JSON.stringify(datPro));
  readData();
};

//clear Inputs

function clearDate() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
  total.style.background = "#a00d02";
}

//read

function readData() {
  let table = "";
  for (let i = 0; i < datPro.length; i++) {
    table += ` <tr>
              <td>${i + 1}</td>
              <td>${datPro[i].title}</td>
              <td>${datPro[i].price}</td>
              <td>${datPro[i].taxes}</td>
              <td>${datPro[i].ads}</td>
              <td>${datPro[i].discount}</td>
              <td>${datPro[i].total}</td>
              <td>${datPro[i].category}</td>
              <td><button onclick="updateProduct(${i})" id="update">update</button></td>
              <td><button  onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndelet = document.getElementById("deleteAll");
  if (datPro.length > 0) {
    btndelet.innerHTML = ` <td><button onclick="deleteAll()">delete All (${datPro.length})</button></td>`;
  } else {
    btndelet.innerHTML = "";
  }
}
readData();

//delete
function deleteProduct(i) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      datPro.splice(i, 1);
      localStorage.product = JSON.stringify(datPro);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      readData();
    }
  });
}

function deleteAll() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete all!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      datPro.splice(0);

      readData();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

//update
function updateProduct(i) {
  title.value = datPro[i].title;
  price.value = datPro[i].price;
  ads.value = datPro[i].ads;
  taxes.value = datPro[i].taxes;
  category.value = datPro[i].category;
  discount.value = datPro[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = `update`;
  mood = "update";
  tmp = i;
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
    readData();

}

//search
let searchMood = "title";
// getSearch Mod
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "serachTitle") {
    searchMood = "title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = `Search By ${searchMood}`;

  search.focus();
  search.value = "";
  readData();
}
//search function
function searchProduct(value) {
  let table = "";
  for (let i = 0; i < datPro.length; i++) {
    if (searchMood == "title") {
      if (datPro[i].title.includes(value.toLowerCase())) {
        table += ` <tr>
              <td>${i + 1}</td>
              <td>${datPro[i].title}</td>
              <td>${datPro[i].price}</td>
              <td>${datPro[i].taxes}</td>
              <td>${datPro[i].ads}</td>
              <td>${datPro[i].discount}</td>
              <td>${datPro[i].total}</td>
              <td>${datPro[i].category}</td>
              <td><button onclick="updateProduct(${i})" id="update">update</button></td>
              <td><button  onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    } else {
      if (datPro[i].category.includes(value.toLowerCase())) {
        table += ` <tr>
              <td>${i + 1}</td>
              <td>${datPro[i].title}</td>
              <td>${datPro[i].price}</td>
              <td>${datPro[i].taxes}</td>
              <td>${datPro[i].ads}</td>
              <td>${datPro[i].discount}</td>
              <td>${datPro[i].total}</td>
              <td>${datPro[i].category}</td>
              <td><button onclick="updateProduct(${i})" id="update">update</button></td>
              <td><button  onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
//scroll
let scroll = document.getElementById("scroll");
function scrolling() {
  if (scrollY > 700) {
    scroll.style.display = "block";
  } else {
    scroll.style.display = "none";
  }
}
addEventListener("scroll", scrolling);
scroll.onclick = function () {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
document.addEventListener("visibilitychange", function () {
  let ongle = document.getElementById("ongle");
  let ongleicone = document.getElementById("ongleicone");
  if (document.visibilityState === "visible") {
    // L'utilisateur est actuellement sur la page (onglet actif).
    ongle.innerHTML = `PRODUCT MANGEMENT SYSTEM`;
    ongleicone.href = "new-product.png";
  } else {
    // La page est cachée (l'utilisateur a basculé vers un autre onglet ou une autre fenêtre).
    ongle.innerHTML = `Come Back`;
    ongleicone.href = "please.png";
  }
});
