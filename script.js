'use strict';

import menuArray from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const feed = document.getElementById('feed');
const fragment = new DocumentFragment();
const orderContainer = document.getElementById('order-container');
const container = document.getElementById('container');


const totalOrderPriceArr = [];

// Event Handlers
document.addEventListener('click', (e) => {
    const yourOrderHidden = document.getElementById('hidden');
    if(e.target.dataset.add) {
        addToOrder(e.target.dataset.add);
        addClass(yourOrderHidden, 'unhidden');
        removeClass(yourOrderHidden, 'hidden');
        hideConfirmationText();

    } else if (e.target.dataset.remove) {
        const yourOrderHidden = document.getElementById('hidden');
        removeFromOrder(e.target.dataset.remove);
        addClass(yourOrderHidden, 'hidden');

    } else if(e.target.id === 'complete-order-btn') {
        popUpPayModal()
    };

});

document.getElementById('pay-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const modalForm = document.querySelector(".modal-form");
    removeClass(modalForm, 'unhidden');
    addClass(modalForm, 'hidden');


    totalOrderPriceArr.splice(0, totalOrderPriceArr.length);

    const parentEl = document.getElementById('container');

    if(parentEl.children.length > 0) {
        const childEl = document.getElementById('total-order-container');
        childEl.remove();   
    };

    while(parentEl.firstChild) {
        parentEl.removeChild(parentEl.lastChild);
    };

    const yourOrderHeading = document.getElementById('hidden');
    removeClass(yourOrderHeading, 'unhidden');
    addClass(yourOrderHeading, 'hidden');
    displayConfirmationText();

    clearInputFields();
    
});


// Create Elements, Append and add classes functions
function createSingleEl(elType) {
    return document.createElement(elType)
};

function appendEl(parent,child) {
    return parent.append(child);
};

function createElementAddClassAppend(elType, className, parent) {
    const element = createSingleEl(elType);
    element.classList.add(className);
    appendEl(parent, element);
    return element;
};

function addClass(element, className) {
    element.classList.add(className);
};

function removeClass(element, className) {
    element.classList.remove(className);
};




// Create elements for menu
function createMenuItem(item) {

    const menuItemContainer = createElementAddClassAppend('div', 'menu-container', fragment);

    const leftSideContainer = createElementAddClassAppend('div', 'left-container', menuItemContainer)

    const emojiIcon = createElementAddClassAppend('p', "emoji-icon", leftSideContainer);

    const foodTextContainer = createElementAddClassAppend('div', 'text-container', leftSideContainer);

    const foodItem = createElementAddClassAppend('h3', 'food-item', foodTextContainer);

    const foodIngredients = createElementAddClassAppend('p', 'food-ingredients', foodTextContainer);
    
    const foodPrice = createElementAddClassAppend('p', 'price', foodTextContainer);

    const addFoodToOrderIcon = createElementAddClassAppend('button', 'add-food', menuItemContainer);

    addFoodToOrderIcon.setAttribute('data-add', `${item.id}`);

    emojiIcon.textContent = item.emoji;
    foodItem.textContent = item.name;
    foodIngredients.textContent = item.ingredients.join(', ');
    foodPrice.textContent = `$${item.price}`;
};

// Create elements for your order
function createYourOrderElements(item) {
    
    const orderFoodContainer = createElementAddClassAppend('div', 'order-food-container', container)
    orderFoodContainer.setAttribute('id', 'order-food-container');

    const divContainer = createElementAddClassAppend('div', 'div-container', orderFoodContainer);

    const foodItem = createElementAddClassAppend('h3', 'food-item', divContainer);

    const removeBtn = createElementAddClassAppend('button', 'remove-btn', divContainer)
    removeBtn.setAttribute('data-remove', `${uuidv4()}`);
    removeBtn.setAttribute('id', 'remove-btn');

    const foodPrice = createElementAddClassAppend('p', 'price', orderFoodContainer);
    foodPrice.setAttribute('data-price', `${uuidv4()}`);

    foodItem.textContent = item.name;
    foodPrice.textContent = `$${item.price}`;
    removeBtn.textContent = "remove";
};

// Calls createYourOrderElements for corresponding food item
function addToOrder(foodId) {
    const targetObj = menuArray.filter((item) => {   
        return item.id === Number(foodId);
    })[0];

    createYourOrderElements(targetObj);

    isTotalOrder();
    totalOrderPriceArr.push(targetObj.price);
    updateTotalOrder();
};

// Remove food item from your order
function removeFromOrder(buttonId) {
    const yourOrderHidden = document.getElementById('hidden');

    const removeBtn = document.querySelectorAll('.remove-btn');
    const buttons = Array.from(removeBtn);

    for(let button of buttons) {
        if(buttonId === button.getAttribute('data-remove')) {
            const currentContainer = button.parentElement.parentElement;
            removeFromArr(currentContainer);
            
            button.parentElement.parentElement.remove();
            
            
        };
    };
    removeChildEl();

    const parentEl = document.getElementById('container');

    if(parentEl.children.length === 0) {
        removeClass(yourOrderHidden, 'unhidden');
    };

};

// Create elements for total order
function totalOrder() {

    const totalOrderContainer = createElementAddClassAppend('div', 'total-price', orderContainer)

    const totalOrderPriceContainer = createElementAddClassAppend('div', 'total-order-price-container', totalOrderContainer)

    const totalPrice = createElementAddClassAppend('h3', 'price', totalOrderPriceContainer);

    const totalOrderPrice = createElementAddClassAppend('p', 'total-order-price', totalOrderPriceContainer);
    totalOrderPrice.textContent = ``;
    totalOrderPrice.setAttribute('id', 'total-order-price')

    totalOrderContainer.setAttribute('id', 'total-order-container')
    totalPrice.textContent = "Total Price";

    const completeOrderBtn = createElementAddClassAppend('button', 'complete-order-btn', totalOrderContainer);
    completeOrderBtn.classList.add('font');

    completeOrderBtn.textContent = "Complete Order"
    completeOrderBtn.setAttribute('id', 'complete-order-btn');
};

// Removes elements from removeFromArr Array
function removeFromArr(currentPrice) {
    const price = currentPrice.querySelector('.price');
    const num = +price.textContent;
    console.log(num);

    let index;
   for(let i = 0; i < totalOrderPriceArr.length; i++) {
    if(totalOrderPriceArr[i] === num) {
        index = [i];
        console.log(index);
    };
   };

   totalOrderPriceArr.splice(index, 1);

   updateTotalOrder();
};

// Updates array
function updateTotalOrder() {
    const totalOrderPrice = document.getElementById('total-order-price');
    totalOrderPrice.textContent = `$${totalOrderPriceArr.reduce((total, currentValue) => {
        return total + currentValue;
    }, 0)}`;
};

// Checks if parent element has any children, if none removes child element
function removeChildEl() {
    const parentEl = document.getElementById('container');

    if(parentEl.children.length === 0) {
        const childEl = document.getElementById('total-order-container');
        childEl.remove();
    };
};

// Checks if container is empty
function isTotalOrder() {
    let totalOrderCheck = document.getElementById('total-order-container');

    if(totalOrderCheck === null) {
        totalOrder();
    };

};


// Modal functions
function popUpPayModal() {
    const modalForm = document.querySelector(".modal-form");
    removeClass(modalForm, 'hidden')
    addClass(modalForm, 'unhidden');
    applyShadow()
};

function displayConfirmationText() {
    const orderConfirmationContainer = document.getElementById('order-confirmation-container');
    const orderConfirmationText = document.getElementById('order-confirmation-text');
    const name = document.getElementById('name');
    
    removeClass(orderConfirmationContainer, 'hidden');

    orderConfirmationText.textContent = `Thanks, ${name.value}! Your order is on its way!`;
};

function hideConfirmationText() {
    const orderConfirmationContainer = document.getElementById('order-confirmation-container');

    addClass(orderConfirmationContainer, 'hidden');
};

// Apply box shadow to pop up modal
function applyShadow() {
    const modalForm = document.getElementById('modal-form');
    addClass(modalForm, 'box-shadow');
};

// Clear input fields
function clearInputFields() {
    const inputFields = document.querySelectorAll('input');
    for(let item of inputFields) {
        item.value = "";
    };
};

// Renders elements to the page
function render() {
    for(let item of menuArray) {
        createMenuItem(item);
    };
};

render();
feed.append(fragment);

