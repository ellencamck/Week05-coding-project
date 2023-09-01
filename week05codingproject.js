console.log("Lists App");

class List {
    constructor(name, item) {
        this.name = name
        this.item = item;
        this.items = [];
    }

}

class Items {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity
        
    }

    addItem(item) {     
        if(item instanceof Items){
            this.items.push(item)
        }
    }

    describe() {
        return `${this.name} was added to the list, buy ${this.quantity}.`
    }

}

class Menu {
    constructor() {
        this.lists = [];
        this.selectedList = null;
    }

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

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create new list
            2) View list
            3) Delete list
            4) Display all lists
        `);
    }

    displayLists() {
        let listString = '';
        for(let i = 0; i < this.lists.length; i++) {
            listString += i + ') ' + this.lists[i].name + '\n';
        }
        alert(listString);
    }

    createList() {
        let name = prompt('Enter a name for your new list:');
        this.lists.push(new List(name));
    }

    viewList() {
        let index = prompt('Enter the number of the list you wish to view:');
        if(index > -1 && index < this.lists.length){
            this.selectedList = this.lists[index];
            let description = 'List Name: ' + this.selectedList.name + '\n';

            for(let i = 0; i < this.selectedList.items.length; i++){
                description += i + ') ' + this.selectedList.items[i].name + ' - ' + this.selectedList.items[i].quantity + '\n';
            }

            let selection = this.showMainMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2': 
                    this.deleteItem();
            }
        }
    }

    deleteList() {
        let index = prompt('Enter the number os the list you wish to delete: ');
        if(index > -1 && index < this.lists.length) {
            this.lists.splice(index, 1);
        }
    }

    //  showMainMenuOptions(listInfo) {
    //     return prompt(`
    //         0) Back
    //         1) Add item
    //         2) Delete item
    //         -----------------
    //         ${listInfo}
    //     `);
    // }

    createItem() {
        let name = prompt('Enter name for new item:');
        let quantity = prompt('Enter amount for new item:');
        this.selectedList.items.push(new Items(name, quantity));
    }

    deleteItem() {
        let index = prompt('Enter the index of the item you wish to delete:');
        if(index > -1 && index < this.selectedList.items.length){
            this.selectedList.items.splice(index, 1);
        }
    }
}

let list = new Menu();
list.start();