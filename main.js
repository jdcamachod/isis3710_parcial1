const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";


// Generic function to generate the products from a category 
const loadByCategory = (button, card, prodName, products, shoppingCar, car, cardList, name) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".carta").forEach((element) => {
            element.remove();
        });
        products.forEach((element) => {
            prodName.innerHTML = name;
            const auxCard = card.cloneNode(true);
            auxCard.children[0].children[0].src = element.image;
            auxCard.children[0].children[1].children[0].innerHTML = element.name;
            auxCard.children[0].children[1].children[1].innerHTML = element.description;
            auxCard.children[0].children[1].children[2].innerHTML = `$${element.price}`;
            auxCard.children[0].children[1].children[3].addEventListener("click", () => {
                shoppingCar.push(element);
                car.innerHTML = `${shoppingCar.length} items`;
            });
            cardList.appendChild(auxCard);
        });
        card.remove();
    });
};


fetch(url).then(res => res.json()).then(res => {
    const products = res;
    let burguers;
    let tacos;
    let salads;
    let desserts;
    let drinkSides;
    const shoppingCar = new Array();
    const car = document.getElementById("items");
    const exRow = document.querySelector("#compra");
    products.forEach(element => {
        console.log(element);
        if (element.name === "Burguers") {
            burguers = [...element.products];
        }
        else if (element.name === "Tacos") {
            tacos = [...element.products];
        }
        else if (element.name === "Salads") {
            salads = [...element.products];
        }
        else if (element.name === "Desserts") {
            desserts = [...element.products];
        }
        else {
            drinkSides = [...element.products];
        }
    });

    const prodName = document.getElementById("prodname");
    const cardList = document.querySelector(".lista-cartas");
    const card = document.querySelector(".carta");

    //Initial load
    const tabla = document.querySelector(".tabla");
    const tableStriped = document.querySelector(".table-striped");
    const tabBody = document.querySelector("#tab-body");
    const section = document.querySelector("#Burgers");
    tabla.remove();
    console.log(tabla);
    document.querySelectorAll(".carta").forEach((element) => {
        element.remove();
    });
    burguers.forEach((element) => {
        prodName.innerHTML = "Burguers";
        const auxCard = card.cloneNode(true);
        auxCard.children[0].children[0].src = element.image;
        auxCard.children[0].children[1].children[0].innerHTML = element.name;
        auxCard.children[0].children[1].children[1].innerHTML = element.description;
        auxCard.children[0].children[1].children[2].innerHTML = `$${element.price}`;
        auxCard.children[0].children[1].children[3].addEventListener("click", () => {
            shoppingCar.push(element);
            car.innerHTML = `${shoppingCar.length} items`;
        });
        cardList.appendChild(auxCard);
    });


    // Burguers
    const burgButton = document.getElementById("burguers");
    loadByCategory(burgButton, card, prodName, burguers, shoppingCar, car, cardList, "Burguers");

    //tacos
    const tacosButton = document.getElementById("tacos");
    loadByCategory(tacosButton, card, prodName, tacos, shoppingCar, car, cardList, "Tacos");
    
    //Salads
    const saladsButton = document.getElementById("salads");
    loadByCategory(saladsButton, card, prodName, salads, shoppingCar, car, cardList, "Salads");

    //Desserts
    const dessertsButton = document.getElementById("desserts");
    loadByCategory(dessertsButton, card, prodName, desserts, shoppingCar, car, cardList, "Desserts");

    //Dreinks & sides
    const drinksButton = document.getElementById("drinks-sides");
    loadByCategory(drinksButton, card, prodName, drinkSides, shoppingCar, car, cardList, "Drinks & Sides");


    const carButton = document.getElementById("cart");
    carButton.addEventListener("click", () => {
        if (shoppingCar.length > 0) {
            document.querySelectorAll(".carta").forEach((element) => {
                element.remove();
            });
            exRow.remove();
            
            let numItem = 1;
            shoppingCar.forEach((element) => {
                console.log(element);
                const newRow = exRow.cloneNode(true);
                newRow.children[0].innerHTML = numItem;
                numItem++;
                newRow.children[1].innerHTML = 1;
                newRow.children[2].innerHTML = element.name;
                newRow.children[3].innerHTML = element.price;
                newRow.children[4].innerHTML = element.price * 1;
                newRow.children[5].innerHTML = "pendiente";
                tabBody.appendChild(newRow);
                tableStriped.appendChild(tabBody);
                tabla.append(tableStriped);
                console.log(newRow.children);
            });
            section.append(tabla);
            
        }
        
        
    });

});

