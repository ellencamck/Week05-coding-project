console.log("List App");

// List App
//
//Create a menu app as seen in this week’s video.
// What you create is up to you as long as it meets the following requirements:
// Use at least one array.
// Use at least two classes.
// Your menu should have the options to create, view, and delete elements.

//*********************************************************************/

//this class is the template to create lists, each list will have a name 
//and items added to it.
class List {
    constructor(name, item) {
        this.name = name
        this.item = item;
        this.items = [];//this is an array where the items for each list
        // will be stored. It starts empty because the user will create them.
    }
}

//this class is the template to create items, as well as adding the amount for
// each of them.
class Items {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity
        
    }
    //this method adds the new item to the items array in the list class.
    addItem(item) {     
        if(item instanceof Items){
            this.items.push(item)
        }
    }

}

//the menu class is where the app actually starts, this class will have the menu
//options and what the user can do with them, like create, view, delete and display lists.
class Menu {
    constructor() {
        this.lists = []; //this is an array where the lists will be stored, it starts 
        //empty because the user will create them.
        this.selectedList = null;
    }
    //the start method controls what happens based on which number the user selects.
    start() { 
        let selection = this.showMainMenuOptions();
        while(selection != 0) {
            switch (selection) {
                case '1':
                    this.createList();
                    break;
                case '2': 
                    this.viewList();
                    break;
                case '3':
                    this.deleteList();
                    break;
                case '4':
                    this.displayLists();
                    break;
                default:
                    selection = 0;
            }
         selection = this.showMainMenuOptions();
        }

        alert('Thank you for using List App!');//if the user selects 0 (exit) a "thank you" message pops up.
    }

    showMainMenuOptions() {
        return prompt(`
            List App:

            0) Exit App
            1) Create new list
            2) View list
            3) Delete list
            4) Display all lists
        `);
    }
    //display method will show the user all the lists created.
    displayLists() {
        let listString = '';
        for(let i = 0; i < this.lists.length; i++) {
            listString += i + ') ' + this.lists[i].name + '\n';
        }
        alert(listString);
    }
    //the create method will add any list created by the user into our list array in the menu class.
    createList() {
        let name = prompt('Enter a name for your new list:');
        this.lists.push(new List(name));
    }
    //viewlist method will ask the user which list they wish to view and will allow the 
    //user to add or delete items from the list chosen.
    viewList() {
        let index = prompt('Enter the number of the list you wish to view:');
        console.log(index)
        if (index > -1 && index < this.lists.length){
            this.selectedList = this.lists[index];
            let description = 'List Name: ' + this.selectedList.name + '\n';

            for(let i = 0; i < this.selectedList.items.length; i++){
                description += i + ') ' + this.selectedList.items[i].name + ' - ' + this.selectedList.items[i].quantity + '\n';
            }

            let selection = this.showListMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2': 
                    this.deleteItem();
            }
        }
    }
    //delete method will allow the user to delete lists.
    deleteList() {
        let index = prompt('Enter the number os the list you wish to delete: ');
        if(index > -1 && index < this.lists.length) {
            this.lists.splice(index, 1);
        }
    }

     showListMenuOptions(listInfo) {
        return prompt(`
            What do you want to do?

            0) Go Back
            1) Add item
            2) Delete item
            -----------------
            ${listInfo}
        `);
    }

    //create method will allow the user to create new items inside an specific list.
    createItem() {
        let name = prompt('Enter name for new item:');
        let quantity = prompt('Enter amount for new item:');
        this.selectedList.items.push(new Items(name, quantity));
    }
    //deleteItem will allow the user to delete item from a list.
    deleteItem() {
        let index = prompt('Enter the index of the item you wish to delete:');
        if(index > -1 && index < this.selectedList.items.length){
            this.selectedList.items.splice(index, 1);
        }
    }
}

let list = new Menu();
list.start();