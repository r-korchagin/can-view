import React from 'react';
import ContentHeader from './content/Header';
import Content from './content/Content'; 
import FileModal from './FileModal';
import CarModal from './CarModal';

function MainContent() {
  
  return (
  /* jshint ignore:start */
  <div className="content-wrapper">
      <ContentHeader/>
      <FileModal/>
      <CarModal/>
      <Content/>
  </div>
  /* jshint ignore:end */
  );
}

export default MainContent;