import React from 'react';
import MainHeader from './components/MainHeader';
import MainSidebar from './components/MainSidebar';
import MainContent from './components/MainContent';
import MainFooter from './components/MainFooter';
import cn from 'classnames';
import { observer } from 'mobx-react';

/* stores */
import menuStore from './store/menuStore';

const App = observer(() => (
  /* jshint ignore:start */
    <div className={ cn('skin-blue', { 'sidebar-collapse': menuStore.show}, {'sidebar-open': menuStore.show}) } >
    <div className="wrapper">
        <MainHeader/>
        <MainSidebar/>
        <MainContent/>
        <MainFooter/>
    </div>
   </div>
  /* jshint ignore:end */
  ));

export default App;
