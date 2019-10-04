import { observable, 
    computed, 
    action, 
    decorate } from "mobx";


class MenuStore {
    constructor(){
        this.show = false;
        this.showCarModal = false;
        this.vehicaleName = 'Unknow Vehicale';
        fetch('/api/vehicleName')
        .then(response => response.json())
        .then(result => {this.setVehicaleName(result.name);});
    }
  
    get isOpenLeftPanel() {
        return this.show;
      }

    get isShowCarModal() {
        return this.showCarModal;
      }
    
    get getVehicalName() {
        return this.vehicaleName;
      }
    
    changeVehicaleName(){
      fetch('/api/changeName', {
        method: 'POST',
        headers: {  
          "Content-type": "application/json"  
        },
        body: JSON.stringify({name:this.vehicaleName})
      }).then(response => {if(response !== 'ok') this.loadVehicalName();});
    }

    loadVehicalName(){
      fetch('/api/vehicleName')
        .then(response => response.json())
        .then(result => {this.setVehicaleName(result.name);});
    }
    
    setVehicaleName(name) {
      this.vehicaleName = name;
    }

    toggleLeftPanel() {
        this.show = !this.show;
    }
    
    toggleCarModal() {
        this.showCarModal = !this.showCarModal;
      }
    
  }

  decorate(MenuStore, {
    show: observable,
    showCarModal: observable,
    vehicaleName: observable,
    isOpenLeftPanel: computed,
    isShowCarModal: computed,
    getVehicalName: computed,
    loadVehicalName: action,
    toggleLeftPanel: action,
    toggleCarModal: action,
    setVehicaleName: action
  });

  const menuStore = new MenuStore();

  export default menuStore;