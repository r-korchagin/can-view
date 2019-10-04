import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useFileHandlers from "../file/useFileHandlers";
import { observer } from "mobx-react";

/* stores */
import modalStore from "../store/fileModalStore";
import pgnListStore from '../store/pgnListStore';

const Input = props => (
  /* jshint ignore:start */
  <input type="file" name="file-input" multiple {...props} />
  /* jshint ignore:end */
);

const FileModal = observer(() => {
  const {
    files,
    // pending,
    // next,
    // uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
    onInitialState,
  } = useFileHandlers();

  const closeForm = () => {
    modalStore.appendFiles(files.length);
    onInitialState();
    modalStore.hideFileModal();
    pgnListStore.updateList();
  };

  return (
    /* jshint ignore:start */
    <Modal
      show={modalStore.show}
      onHide={closeForm}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Send files</Modal.Title>
      </Modal.Header>
      <Form className="form" onSubmit={onSubmit}>
        <Modal.Body>
          {status === "FILES_UPLOADED" && (
            <div className="success-container">
              <div>
                <small>You uploaded your files. Get some rest.</small>
              </div>
            </div>
          )}
          <Form.Group>
            <Input onChange={onChange} />
          </Form.Group>
          <Form.Group>
            {files.map(({ file, src, id }, index) => (
              <div
                style={{
                  opacity: uploaded[id] ? 0.2 : 1
                }}
                key={`thumb${index}`}
                className="thumbnail-wrapper"
              > 
                <div className="thumbnail-caption">{uploaded[id] ? 'Loaded '+ file.name : file.name }</div>
              </div>
            ))}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeForm}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Send files
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    /* jshint ignore:end */
  );
});

export default FileModal;
