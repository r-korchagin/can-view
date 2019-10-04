import { observable, 
    computed, 
    action, 
    decorate } from "mobx";

class PgnListStore {
    
    constructor(){
        this.filter = '';
        this.list = [];
        fetch('/api/pgnlist')
        .then(response => response.json())
        .then(list => {this.setList(list);});
    }

    setList(list) {
        this.list = list;
    }
      
    get getList() {
        return this.list.filter((el) => el.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1);
    }

    get checkedList() {
        return this.list.filter((el) => (el.checked===true));
    }

    checkList(pgnName){
        /* set check for list */
        this.list = this.list.map((v) => {
            if (v.name===pgnName) { 
                v.checked = !v.checked;
                return v;
            }
            return v;
        });
    }
    
    setfilter(filter) {
        this.filter = filter;
    }

    clearList() {
        fetch('/api/pgnclear')
        .then(response => {this.filter = ''; this.list = []; });
    }

    updateList() {
        fetch('/api/pgnlist')
        .then(response => response.json())
        .then(list => {this.setList(list);});
    }
}
    
decorate(PgnListStore, {
        filter: observable,
        list: observable,
        getList: computed,
        checkedList: computed,
        setfilter: action,
        clearList: action,
        updateList:action,
        checkList:action
});
    
      const pgnListStore = new PgnListStore();
    
      export default pgnListStore;
      export { PgnListStore };