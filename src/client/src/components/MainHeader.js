import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { observer } from 'mobx-react';

/* stores */
import menuStore from '../store/menuStore';
import modalStore from '../store/fileModalStore';
import pgnListStore from '../store/pgnListStore';

const MainHeader = observer(() => {

  const toggleLeftPanel = (e) => {
    e.preventDefault(); 
    menuStore.toggleLeftPanel();
  };

  const toggleCarModal = (e) => {
    e.preventDefault(); 
    menuStore.toggleCarModal();
  };

  const clearData = (e) => {
    e.preventDefault();  
    modalStore.clearFiles(); 
    pgnListStore.clearList();
  };

  const fileModal = (e) => {
    e.preventDefault(); 
    modalStore.openFileModal();
  };

  return (
  /* jshint ignore:start */
  <header className="main-header">
    <a href="index2.html" className="logo"><b>CAN</b>View</a>
    <Nav className="navbar navbar-static-top" role="navigation">
        <a href="index.html" onClick={toggleLeftPanel} className="sidebar-toggle">
            <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown messages-menu">
              <a href="index.html" onClick={clearData} className="dropdown-toggle">
                  <i className="fa fa-eraser"></i>
                </a>
            </li>
            <li className="dropdown messages-menu">
              <a href="index.html" onClick={fileModal} className="dropdown-toggle">
                  <i className="fa fa-folder-o"></i>
                  <span className="label label-success">{modalStore.filesCount}</span>
                </a>
            </li>
            <li className="dropdown user user-menu">
              <a href="index.html" className="dropdown-toggle" onClick={toggleCarModal} >
                  <img src="/img/car_view.png" className="user-image" alt="Car View"/>
                  <span className="hidden-xs">{menuStore.vehicaleName}</span>
              </a>
            </li>
          </ul>
        </div>
    </Nav>
    </header>
  /* jshint ignore:end */
  );
  });


export default MainHeader;