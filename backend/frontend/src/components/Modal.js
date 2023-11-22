import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const CustomModal = ({ toggle, onSave, activeItem: initialActiveItem }) => {
  const [activeItem, setActiveItem] = useState(initialActiveItem);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setActiveItem({ ...activeItem, [name]: value });
  };
  const handleSave = () => {
    if(activeItem.description.trim() === "") {
      return;
    }
    onSave(activeItem)
  }
  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
      <ModalBody>
        <Form>
              <FormGroup>
            <Label for="todo-description">Description</Label>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
            </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success"  onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
