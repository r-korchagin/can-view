import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFileHandlers from './file/useFileHandlers';
import './App.css';

const Input = (props) => (
  /* jshint ignore:start */
  <input type='file' name='file-input' multiple {...props} />
  /* jshint ignore:end */
);

function App() {
  const {
    files,
    // pending,
    // next,
    // uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
  } = useFileHandlers();
  return (
  /* jshint ignore:start */
    <div className='container'>
      <Form className='form' onSubmit={onSubmit}>
          {
            status === 'FILES_UPLOADED' && (
              <div className='success-container'>
                <div>
                  <h2>Congratulations!</h2>
                  <small>You uploaded your files. Get some rest.</small>
                </div>
              </div>
            )
          }
        <Form.Group>
          <Input onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type='submit'>Submit</Button>
        <Form.Group>
          {files.map(({ file, src, id }, index) => (
            <div
              style={{
                opacity: uploaded[id] ? 0.2 : 1,
              }}
              key={`thumb${index}`}
              className='thumbnail-wrapper'
            >
              <img className='thumbnail' src={src} alt='' />
              <div className='thumbnail-caption'>{file.name}</div>
            </div>
          ))}
        
        </Form.Group>
      </Form>
  </div>
  /* jshint ignore:end */
  );
}

export default App;
