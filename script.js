'use strict';

import menuArray from "./data.js";
const feed = document.getElementById('feed');
const fragment = new DocumentFragment();

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

    const MenuItemContainer = createElementAddClassAppend('div', 'testing', fragment);

    const leftSideContainer = createElementAddClassAppend('div', 'left-container', MenuItemContainer)

    const emojiIcon = createElementAddClassAppend('p', "emoji-icon", leftSideContainer);

    const foodTextContainer = createElementAddClassAppend('div', 'text-container', leftSideContainer);

    const foodItem = createElementAddClassAppend('h3', 'food-item', foodTextContainer);

    const foodIngredients = createElementAddClassAppend('p', 'food-ingredients', foodTextContainer);

    const foodPrice = createElementAddClassAppend('p', 'price', foodTextContainer);

    
    const addFoodToOrderIcon = createElementAddClassAppend('img', 'add-food', MenuItemContainer);
    addFoodToOrderIcon.setAttribute('src', "./images/add-btn.png");
    
    emojiIcon.textContent = item.emoji;
    foodItem.textContent = item.name;
    foodIngredients.textContent = item.ingredients;
    foodPrice.textContent = item.price;

    addFoodToOrderIcon
    




    
};


// Renders elements to the page
function render() {

    for(let item of menuArray) {
        createMenuItem(item);
    };

};

render();
feed.append(fragment);


