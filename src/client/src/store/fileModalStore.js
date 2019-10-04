import { observable, 
    computed, 
    action, 
    decorate } from "mobx";

    class ModalStore {
        constructor(){
            this.show = false;
            this.filesCount = 0;
            fetch('/api/fileCount')
            .then(response => response.json())
            .then(r => {this.setFilesCount(r.count);});
        }
      
        setFilesCount(n) {

          this.filesCount = n;
        }

        get isOpenModal() {
            return this.show;
          }
        
        openFileModal() {
            this.show = true;
          }
    
        closeFileModal() {
            this.show = false;
          }

        hideFileModal() {
            this.show = false;
        }

        appendFiles(count){
          this.filesCount += count;
        }

        clearFiles(){
          this.filesCount = 0;
        }

      }
    
      decorate(ModalStore, {
        show: observable,
        filesCount: observable,
        isOpenModal: computed,
        openFileModal: action,
        closeFileModal: action,
        hideFileModal: action,
        appendFiles:action,
        clearFiles:action,
      });
    
      const modalStore = new ModalStore();
    
export default modalStore;