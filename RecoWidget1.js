// **Product Recommendations Widget**

//Apply CSS

const injectCSS = (css) => {
  let el = document.createElement("style");
  el.type = "text/css";
  el.innerText = css;
  document.head.appendChild(el);
  return el;
};
injectCSS(`.arrow {
transition-duration: 0.4s;
}

.arrow:hover {
background-color: #444444;
color: white;
}

.recommendation-widget-slots {
display: "flex";
justifyContent: center;
alignItems: center;
height: 35vh;

}

.recommendation-slot {

height: 200px;
width: 200px;
margin: 0 10px;
display: none;
justify-Content: center;
align-Items: center;
flex-Direction: column;
border: 1px solid black;

}

img{
width: auto;
height: auto;
margin: 0 10px;

}
`);

// Define a function to create a product recommendation widget
function createRecommendationWidget() {
  //  1. Define all new divs
  const recommendationWidgetContainer = document.createElement("div");
  recommendationWidgetContainer.classList.add("widget-container");

  const recommendationWidgetSlots = document.createElement("div");
  recommendationWidgetSlots.classList.add("recommendation-widget-slots");

  const recommendationWidgetTitle = document.createElement("div");
  recommendationWidgetTitle.classList.add("widget-title");
  recommendationWidgetTitle.innerHTML = "<h2>Product Recommendations</h2>";

  recommendationWidgetSlots.style.display = "flex";
  recommendationWidgetSlots.style.justifyContent = "center";
  recommendationWidgetSlots.style.alignItems = "center";
  recommendationWidgetSlots.style.height = "35vh";

  recommendationWidgetContainer.appendChild(recommendationWidgetTitle);
  recommendationWidgetContainer.appendChild(recommendationWidgetSlots);

  //CODE BELOW WAS MEANT TO GRAB PRODUCTS FROM AN EXTERNAL DOC IN JSON. A CORS ERROR DOES NOT ALLOW HOWEVER

  // const jsonUrl =
  //   "https://gist.githubusercontent.com/angaba92/d1001225f5ab825efd32a9f8b07a143c/raw/701a331ea83d310676051e159cd7d216a403be6e/products.json";

  // // Create a new XMLHttpRequest object
  // const xhr = new XMLHttpRequest();

  // // Configure the XMLHttpRequest for a synchronous request
  // xhr.open("GET", jsonUrl, false); // The third parameter here makes it synchronous

  // const products = [];

  // try {
  //   // Send the XMLHttpRequest
  //   xhr.send();

  //   if (xhr.status === 200) {
  //     // Parse the JSON response
  //     products.push(JSON.parse(xhr.responseText));

  //     // Now you can work with the JSON data
  //     console.log(jsonResponse);
  //   } else {
  //     console.error("Error loading JSON:", xhr.status, xhr.statusText);
  //   }
  // } catch (error) {
  //   console.error("An error occurred:", error);
  // }

  const products = [
    {
      name: "Oversized Hoodie in Navy",
      price: "$49.99",
      imageUrl:
        "https://ae01.alicdn.com/kf/S26a9fb8232d140b19a35b3e8de8c07ec4/Sudadera-con-capucha-con-estampado-de-letras-para-hombres-y-mujeres-ropa-de-calle-de-alta.jpg_80x80.jpg",
    },
    {
      name: "Black T-Shirt",
      price: "$19.99",
      imageUrl:
        "https://ae01.alicdn.com/kf/Sabef13dbda5c47798ab87b7644f0b2141/Camiseta-de-algod-n-para-hombre-y-mujer-ropa-de-manga-corta-holgada-de-Color-liso.jpg_80x80.jpg",
    },
    {
      name: "Jeans",
      price: "$59.99",
      imageUrl:
        "https://ae01.alicdn.com/kf/Sca93d595e2674440b3155ad9a2d21303Y/Pantalones-vaqueros-de-punto-para-hombre-ropa-de-calle-de-pierna-ancha-pantalones-vaqueros-sueltos-informales.jpg_80x80.jpg",
    },
    {
      name: "Sneakers",
      price: "$69.99",
      imageUrl:
        "https://ae01.alicdn.com/kf/S4c93e29a98ae48e6b858785e12d9fe51G/Zapatos-Deportivos-informales-para-hombre-zapatillas-ligeras-de-malla-transpirable-para-exteriores-color-blanco-y-negro.jpg_80x80.jpg",
    },
    {
      name: "Hat",
      price: "$14.99",
      imageUrl:
        "https://ae01.alicdn.com/kf/Sc856c4202d8740d1b175bd5922e21b5ap/Sombrero-de-Fedora-Para-hombre-y-Mujer-gorro-de-Panam-de-Camel-decoraci-n-de-boda.jpg_80x80.jpg",
    },
    {
      name: "Sunglasses",
      price: "$29.99",
      imageUrl:
        "https://ae01.alicdn.com/kf/S400bedb385104ba280aeaa8b7d83e32by/Gafas-de-sol-de-coche-para-hombre-y-mujer-C65.jpg_80x80.jpg",
    },
  ];

  //2. Create slots for product recommendations
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.classList.add("recommendation-slot");
    recommendationWidgetSlots.appendChild(slot);
  }

  // 3. Update the displayed products based on the current index
  function updateDisplayedProducts(index) {
    const slots = recommendationWidgetSlots.querySelectorAll(
      ".recommendation-slot"
    );
    for (let i = 0; i < 3; i++) {
      slots[i].style.display = "flex";
      const productIndex = (index + i) % 6;
      slots[i].textContent = products[productIndex];
      slots[
        i
      ].innerHTML = `<img src="${products[productIndex].imageUrl}" alt="${products[productIndex].name}">
    <div class="product-name">${products[productIndex].name}</div>
    <div class="product-price">${products[productIndex].price}</div>`;
    }
  }

  let currentIndex = 0;
  updateDisplayedProducts(currentIndex);

  // 4. Create left and right arrow buttons for scrolling

  const leftArrow = document.createElement("button");

  leftArrow.textContent = "<";
  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 5) % 6;
    updateDisplayedProducts(currentIndex);
  });
  leftArrow.classList.add("arrow", "arrow-left"); // Add class for styling
  recommendationWidgetSlots.insertBefore(
    leftArrow,
    recommendationWidgetSlots.firstChild
  );

  const rightArrow = document.createElement("button");

  rightArrow.textContent = ">";
  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % 6;
    updateDisplayedProducts(currentIndex);
  });
  rightArrow.classList.add("arrow", "arrow-right"); // Add class for styling
  recommendationWidgetSlots.appendChild(rightArrow);

  return recommendationWidgetContainer;
}

// 6. Insert the recommendation widget underneath the product information
const productInfo = document.querySelector(
  '[data-group="center"].list-container'
);
const recommendationWidgetContainer = createRecommendationWidget();
productInfo.appendChild(recommendationWidgetContainer);
