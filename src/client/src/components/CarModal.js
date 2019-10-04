import React, { PureComponent } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { observer } from "mobx-react";

import menuStore from '../store/menuStore';

class CarModal extends PureComponent {
    

    closeForm() {
        menuStore.toggleCarModal();
        menuStore.loadVehicalName();
    }

    changeName(name) {
        menuStore.setVehicaleName(name);
    }

    updateName() {
        menuStore.toggleCarModal();
        menuStore.changeVehicaleName();
    }

    render() {
        return (
        /* jshint ignore:start */
        <Modal
        show={menuStore.showCarModal}
        onHide={this.closeForm}
        animation={false}
            >
        <Modal.Header closeButton>
            <Modal.Title>Change Vehicle Name</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <Form.Control 
                size="lg" 
                type="text" 
                placeholder="Vehicle Name" 
                value={menuStore.vehicaleName}
                onChange={(e) => {this.changeName( e.target.value )}} />
            </Modal.Body>
            <Modal.Footer>
            <Button
                variant="secondary"
                onClick={this.closeForm}
            >
                Close
            </Button>
            <Button variant="primary" type="submit" onClick={()=>this.updateName()}>
                Change
            </Button>
            </Modal.Footer>
        </Modal>
        /* jshint ignore:end */
        );
    }
}

export default observer(CarModal);