'use strict';


//global variable STORE; holds the shopping list items
const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];



//global variable uncheckedItems; holds the shopping list items that have checked set to false
let uncheckedItems = [];

let searchItems = [];

//global variable displayAll; set to true if user wants to display every shopping item, and false for just the unchecked items
let displayAll = true;


let displaySearch = false;

let input;
let filter;

//genterateItemElement function 
function generateItemElement(item, itemIndex, template) {
  return `
   
  <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}
      <input type="text" name="item-edit-entry" class="item-edit-form" placeholder="edit...">
        <button class='item-edit-submit hidden'>
          <span class='button-label'>submit</span>
        </button>
        </span>
      <div class="shopping-item-controls">
      <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
            
        </button>
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

//generateShoppingItemsString function
function generateShoppingItemsString(shoppingList) {
  //console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}

//renderShoppingList function
function renderShoppingList() {
  // render the shopping list in the DOM
  //console.log('`renderShoppingList` ran');
  uncheckedItems = [];
  STORE.forEach(function(element){
    if (element.checked === false){
      uncheckedItems.push(element);
    }
  });
  //console.log(uncheckedItems);
  //console.log(displayAll);
 
  if (displayAll === false){
    const shoppingListItemsString = generateShoppingItemsString(uncheckedItems);
    
    //console.log(shoppingListItemsString);
    //console.log(uncheckedItems);
    
    
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }

  else if (displaySearch === true){
    const shoppingListItemsString = generateShoppingItemsString(searchItems);
    console.log(shoppingListItemsString);

    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);

  }
  else if (displaySearch === false){
    //console.log('`displaySearch` is false. Resetting...');
    const shoppingListItemsString = generateShoppingItemsString(STORE);
    // console.log(shoppingListItemsString);
    
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
    //console.log('`html` ran');
  }
  else {
   
    const shoppingListItemsString = generateShoppingItemsString(STORE);
    // console.log(shoppingListItemsString);
    
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
}

//addItemToShoppingList function
function addItemToShoppingList(itemName) {
  //console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}


//handleNewItemSubmit function
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    //console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}


//handleDisplayButtonClicked function
function handleDisplayButtonClicked() {
  $('.js-show-all-or-unchecked').click(function () {
    //console.log('`handleDisplayButtonClicked` ran' );
    if (displayAll === true){
      displayAll = false;
      $('span', this).text('Display All');

    }
    else if (displayAll === false){
      displayAll = true;
      $('span', this).text('Display Unchecked');

    }
    //console.log('changed to '+ displayAll);
    renderShoppingList();

  });
}


//toggleCheckedForListItem function
function toggleCheckedForListItem(itemIndex) {
  //console.log('Toggling checked property for item at index ' + itemIndex);

  if (STORE[itemIndex].checked === true) {
    STORE[itemIndex].checked = false;

    addToUncheckedItems(itemIndex);
    //console.log('`addToUncheckedItems` ran' );

  } 
  else {
    STORE[itemIndex].checked = true;
    addToUncheckedItems(itemIndex);
    //console.log('item is checked');

  }
}

function addToUncheckedItems(itemIndex){
  
  let duplicateItem = false;
  for (let i=0; i < uncheckedItems.length; i++){
    if (uncheckedItems[i] === STORE[itemIndex]){
      duplicateItem = true;
    }
  }

  if (duplicateItem ===false){
    uncheckedItems.push(STORE[itemIndex]);
  }
  //  console.log(uncheckedItems);
  return uncheckedItems;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.container').on('click', '.js-item-toggle', event => {
    //console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
 
  });
}

function handleItemSearch(){
  //console.log('`handleItemSearch` ran');
  searchItems = STORE.filter(item => item.name.toUpperCase() === filter);
  renderShoppingList();
}

function handleItemSearchClicked(){
  $('#search-form').submit(function(event) {
    event.preventDefault();
    displaySearch = true;
    console.log('`handleItemSearchClicked` ran');
    handleItemSearch();
  });
}

function handleSearchReset(){
  $('.searchReset').click(function() {
    console.log('`handleSearchReset` ran');

    searchItems = [];
    displaySearch = false;
    renderShoppingList();
  });
}

function handleEditItemClicked() {
//   $('.js-shopping-list').on('click', '.js-item-edit', event => {
//     console.log('`handleEditItemClicked` ran');
//     $(event.currentTarget).closest('li').find('.item-edit-box').show();
//     $(event.currentTarget).closest('li').find('.item-edit-submit').show();
//   });
}

function handleEditItemSubmit(){
  
//   $('.item-edit-submit').click(function () {  
//     console.log('`handleEditItemSubmit` ran');
//     console.log ($('.item-edit-form').val());
//     let editedItemName = $('.item-edit-form').val();
//     console.log (editedItemName);

//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     console.log (editedItemName);
//     if(editedItemName !== ''){
//       STORE[itemIndex].name = editedItemName;
//     }click
//     editedItemName='';
//     console.log (editedItemName);

//     renderShoppingList();
//   });
}
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    //console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //   console.log (STORE[itemIndex]);
    delete STORE[itemIndex];
    //  console.log (STORE[itemIndex]);
    renderShoppingList();

  });
  
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleItemSearch();
  handleItemSearchClicked();
  handleDisplayButtonClicked();
  handleEditItemClicked();
  handleEditItemSubmit();
  handleSearchReset();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);