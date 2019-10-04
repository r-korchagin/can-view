import React from 'react';
import Charts from './Charts';
import PgnListStore from '../../store/pgnListStore';
import { observer } from 'mobx-react';

const Content = observer(() => {
  return (
  /* jshint ignore:start */
  <section className="content">
    {PgnListStore.checkedList.map((el,index) => { 
      return(
      <div key = {index} className="row">
        <Charts pgn = {el.name} count = {el.count} key = {el.name}/>
      </div>  
    )}
    )}
    
  </section>
  /* jshint ignore:end */
  );}
);

export default Content;