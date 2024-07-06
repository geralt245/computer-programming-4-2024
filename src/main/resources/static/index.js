const getProducts = () => {
    return fetch("/api/products")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to load products. Please try again later.');
        });
}

const createHtmlEl = (productData) => {
    const randomImageId = Math.floor(Math.random() * 1000);
    const template = `
        <div class="product">
            <h4>${productData.name}</h4>
            <img src="https://picsum.photos/id/${randomImageId}/200/300" alt="${productData.name}" />
            <div class="product__price">
                <span>$${productData.price.toFixed(2)}</span>
                <button data-id="${productData.id}">Add to cart +</button>
            </div>
        </div>
    `;
    const el = document.createElement("li");
    el.innerHTML = template.trim();

    el.querySelector('button').addEventListener('click', () => {
        alert(`${productData.name} has been added to your cart!`);
    });

    return el;
}

(() => {
    const productList = document.querySelector("#productList");

    getProducts()
        .then(productsAsJson => productsAsJson.map(createHtmlEl))
        .then(productsAsHtml => productsAsHtml.forEach(productEl => productList.appendChild(productEl)))
        .catch(error => console.error('Error in rendering products:', error));
})();
