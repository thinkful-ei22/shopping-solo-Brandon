# Shopping-Solo-Brandon

A shopping list app with extended functionality

This shopping list should do the following:

* take a string input (a item for a shopping list) submitted by the user
* store each item in an object
* give each item it's own unique id
* add new items to the list
* show (render) a list of items
* allow the user to delete items from the list
* User can press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked
* User can type in a search term and the displayed list will be filtered by item names only containing that search term
* User can edit the title of an item



Item Check Pseudo-Code
* Take in as a parameter the shopping list items
* Iterate through the list
* If the checked key is false,
    * check to see if the item is already in the unchecked items list
    * If it is not already in the list
        * push the item to the unchecked items list
    * Else
        * Do nothing
* Else
    * Do Nothing
* Return the unchecked items list

DisplayAll/Unchecked Pseudo-code
* The “display all/unchecked” button is clicked
* toggle display all between false/true (starts at true)

RenderShoppingList checked pseudo code
* if displayAll is true
    * run renderShoppingList as-is
* If false
    * generate the shopping list items from unchecked instead of the STORE
    * run renderShopping List normally from there