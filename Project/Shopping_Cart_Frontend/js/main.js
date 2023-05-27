window.onload = async function () {
    token = sessionStorage.getItem('accessToken');
    const user= token.split('-')[1];
    document.getElementById("welcome").innerText = "Welcome " + user;
        getProducts(user).then(() => {
                // Update the cart table after adding the product
            getCart(user)
            })
            .catch(error => {
                console.log(error);
            });
};



async function getProducts(userName) {
    const response = await fetch("http://localhost:3000/products");
    const jsonData = await response.json();
    const productTableBody = document.getElementById('tbodyProductList');
    productTableBody.innerHTML = ''; // Clear existing rows

    for (let e of jsonData) {
        addNewProductRowToTable(userName,e.id, e.title, e.price, e.myImage, e.stock);
    }

}



function addNewProductRowToTable(userName,id, title, price, myImage, stock) {

    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(title));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    cell = document.createElement('td');
    const image = document.createElement('img');
    const imageUrl = `http://localhost:3000/${myImage}`;
    image.src = imageUrl;

    image.setAttribute("width", "60");
    image.setAttribute("alt", title);
    image.style.borderRadius = '10%';
    cell.appendChild(image);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(stock));
    row.appendChild(cell);

    cell = document.createElement('td');
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-shopping-cart");
    button.appendChild(icon);
    button.appendChild(document.createTextNode("     Add to Cart"));
    button.addEventListener('click', (event) => {
        document.getElementById('NoItemtext').style.display = "none";
        if (document.getElementById('mytable2').style.visibility = "hidden") {
            document.getElementById('mytable2').style.visibility = "visible"
        };
        postToCart(userName,id)
            .then(() => {
                // Update the cart table after adding the product
                getCart(userName);
            })
            .catch(error => {
                console.log(error);
            });
    });
    cell.appendChild(button);
    row.appendChild(cell);

    document.getElementById('tbodyProductList').appendChild(row);
}

async function postProduct(title, description, price) {
    let b = { "title": title, "description": description, "price": price }
    let setting = {
        method: 'POST',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch("http://localhost:3000/products", setting);
    const jsonData = await response.json();
    return jsonData;
}



async function getCart(userName) {
    const response = await fetch(`http://localhost:3000/carts/${userName}`);
    const jsonData = await response.json();

    const cartTableBody = document.getElementById('tbodyProductInCartList');
    cartTableBody.innerHTML = ''; // Clear existing rows
    const totalPrice = jsonData.myCart.totalPrice;
    if (totalPrice > 0) {
        document.getElementById('NoItemtext').style.display = "none";
        document.getElementById('mytable2').style.visibility = "visible"
    };

    for (let e of jsonData.myCart.products) {
        addNewProductToCartTable(userName,e.id, e.title, e.price, e.currentProductTotalPrice, e.quantity, totalPrice);
    }
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.appendChild(document.createTextNode(`Total Price = ${totalPrice}`));
    cell.setAttribute('colspan', '4');
    cell.style.textAlign = 'right';
    cell.style.fontWeight = 'bold';
    row.appendChild(cell);
    document.getElementById('tbodyProductInCartList').appendChild(row);

    const placeOrderRow = document.createElement('tr');
    const placeOrderCell = document.createElement('td');
    placeOrderCell.setAttribute('colspan', '4');
    placeOrderCell.style.textAlign = 'right';
    placeOrderRow.appendChild(placeOrderCell);
    document.getElementById('tbodyProductInCartList').appendChild(placeOrderRow);

    // Create the "Place Order" button with shopping cart icon
    const placeOrderButton = document.createElement('button');
    placeOrderButton.classList.add('btn', 'btn-primary');
    placeOrderButton.innerHTML = '<i class="fa fa-shopping-cart"></i> Place Order';
    placeOrderButton.addEventListener('click', (event) => {
        document.getElementById('NoItemtext').style.display = "block";
        document.getElementById('mytable2').style.visibility = "hidden";
        placeOrder(userName)
            .then(() => {
                getProducts(userName);
            })
            .catch(error => {
                console.log(error);
            });
    });
    placeOrderCell.appendChild(placeOrderButton);

}


function addNewProductToCartTable(userName,id, title, price, currentProductTotalPrice, quantity) {
    const row = document.createElement('tr');
    row.setAttribute('id', `cartRow_${id}`);

    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(title));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(currentProductTotalPrice));
    row.appendChild(cell);

    cell = document.createElement('td');

    const decreaseButton = document.createElement('button');
    decreaseButton.setAttribute('class', 'btn btn-primary btn-sm mr-2');
    decreaseButton.innerHTML = '-';
    decreaseButton.addEventListener('click', (event) => {
        const productId = id;
        if (quantity == 1) {
            removeProduct(userName,productId)
        }
        else {
            updateQuantityOfProduct(userName,productId, -1)
        }
    });
    cell.appendChild(decreaseButton);

    const quantitySpan = document.createElement('span');
    quantitySpan.setAttribute('id', `quantity_${id}`);
    quantitySpan.appendChild(document.createTextNode(quantity));
    cell.appendChild(quantitySpan);


    const increaseButton = document.createElement('button');
    increaseButton.setAttribute('class', 'btn btn-primary btn-sm ml-2');
    increaseButton.innerHTML = '+';
    increaseButton.addEventListener('click', (event) => {
        const productId = id;
        updateQuantityOfProduct(userName,productId, 1)
    });
    cell.appendChild(quantitySpan);
    cell.appendChild(increaseButton);

    row.appendChild(cell);
    document.getElementById('tbodyProductInCartList').appendChild(row);
}

async function postToCart(userName,productId) {
    let b = { "productId": productId };
    let setting = {
        method: 'POST',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`http://localhost:3000/carts/${userName}`, setting);
    const jsonData = await response.json();

    if (response.ok) {
        const { id, title, price, currentProductTotalPrice, quantity } = jsonData;
        addNewProductToCartTable(userName,id, title, price, currentProductTotalPrice, quantity);
    }

    return jsonData;
}

async function updateQuantityOfProduct(userName,productId, quantity) {
    let b = { "quantity": quantity };
    let setting = {
        method: 'PUT',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`http://localhost:3000/carts/${userName}/${productId}`, setting);
    const jsonData = await response.json();
    getCart(userName);
    return jsonData;
}

async function removeProduct(userName,productId) {
    const response = await fetch(`http://localhost:3000/carts/${userName}/${productId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        getCart(userName);

    } else {
        console.error('Failed to delete cart item.');
    }
}

async function placeOrder(userName) {
    const response = await fetch(`http://localhost:3000/carts/${userName}/placeOrder`);
    const jsonData = await response.json();
    return jsonData;
}

