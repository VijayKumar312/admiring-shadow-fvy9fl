let productsData = [];
let activeTab = "Men";

const mainContainer = document.querySelector("#root");

const loadProductsToUi = () => {
  mainContainer.innerHTML = "";
  const activeCollection = productsData.filter(
    (collection) => collection.category_name === activeTab
  );
  const parentElement = document.createElement("div");
  parentElement.classList.add("products-container");
  activeCollection[0].category_products.forEach((product) => {
    const imageElement = document.createElement("div");
    imageElement.innerHTML = `<img src="${product.image}" alt="${product.name}" />`;
    parentElement.appendChild(imageElement);
  });

  mainContainer.appendChild(parentElement);
};

const fetchData = () => {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((res) => res.json())
    .then((data) => {
      productsData = data.categories;
      loadProductsToUi();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const updateActiveTab = (newTab) => {
  activeTab = newTab;
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelector(`#${newTab.toLowerCase()}-tab`)
    .classList.add("active");
  loadProductsToUi();
};

document
  .querySelector("#men-tab")
  .addEventListener("click", () => updateActiveTab("Men"));
document
  .querySelector("#women-tab")
  .addEventListener("click", () => updateActiveTab("Women"));
document
  .querySelector("#kids-tab")
  .addEventListener("click", () => updateActiveTab("Kids"));

// Initial setup
document.querySelector("#men-tab").classList.add("active");
fetchData();
