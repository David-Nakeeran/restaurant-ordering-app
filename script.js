'use strict';

import menuArray from "./data.js";
const feed = document.getElementById('feed');
const fragment = new DocumentFragment();
const orderContainer = document.getElementById('order-container');
const container = document.getElementById('container');


// Create Elements, Append and add classes functions
function createSingleEl(elType) {
    return document.createElement(elType)
};


function appendEl(parent,child) {
    return parent.append(child);
};

function setAttribute(element, key, value) {
    element.setAttribute(key, value);
}

function createElementAddClassAppend(elType, className, parent) {
    const element = createSingleEl(elType);
    element.classList.add(className);
    appendEl(parent, element);
    return element;

};

function createMenuItem(item) {

    const menuItemContainer = createElementAddClassAppend('div', 'menu-container', fragment);

    const leftSideContainer = createElementAddClassAppend('div', 'left-container', menuItemContainer)

    const emojiIcon = createElementAddClassAppend('p', "emoji-icon", leftSideContainer);

    const foodTextContainer = createElementAddClassAppend('div', 'text-container', leftSideContainer);

    const foodItem = createElementAddClassAppend('h3', 'food-item', foodTextContainer);

    const foodIngredients = createElementAddClassAppend('p', 'food-ingredients', foodTextContainer);
    

    const foodPrice = createElementAddClassAppend('p', 'price', foodTextContainer);

    
    const addFoodToOrderIcon = createElementAddClassAppend('button', 'add-food', menuItemContainer);
    addFoodToOrderIcon.setAttribute('id', `${item.id}`);
    
    emojiIcon.textContent = item.emoji;
    foodItem.textContent = item.name;
    foodIngredients.textContent = item.ingredients.join(', ');
    foodPrice.textContent = item.price;
};


// Renders elements to the page
function render() {

    for(let item of menuArray) {
        createMenuItem(item);
    };

};

render();
feed.append(fragment);


document.addEventListener('click', (e) => {
    if(e.target.id) {

        callAddToOrder(e.target.id)
    }
});

function callAddToOrder(foodId) {
    const targetObj = menuArray.filter((item) => {
        return item.id === Number(foodId);
    })[0];
    console.log(targetObj);

    
    createYourOrderElements(targetObj);
    isTotalOrder();
};

function createYourOrderElements(item) {
    
    const orderFoodContainer = createElementAddClassAppend('div', 'order-food-container', container)

    const divContainer = createElementAddClassAppend('div', 'div-container', orderFoodContainer);

    const foodItem = createElementAddClassAppend('h3', 'food-item', divContainer);

    const removeBtn = createElementAddClassAppend('button', 'remove-btn', divContainer)

    const foodPrice = createElementAddClassAppend('p', 'price', orderFoodContainer);
    
    foodItem.textContent = item.name;
    foodPrice.textContent = item.price;
    removeBtn.textContent = "Remove";
};



function totalOrder() {
    
        const totalPrice = createElementAddClassAppend('h3', 'total-price', orderContainer);

        totalPrice.setAttribute('id', 'testing')
        totalPrice.textContent = "Total Price";

        const completeOrderBtn = createElementAddClassAppend('button', 'complete-order-btn', orderContainer);
        completeOrderBtn.textContent = "Complete Order"
};

function isTotalOrder() {
    let willItWork = document.getElementById('testing');

    if(willItWork === null) {
        totalOrder();
    };
};
