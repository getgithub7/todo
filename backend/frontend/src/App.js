import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [activeItem, setActiveItem] = useState({

    title: "",
    description: "",
    completed: false,
  });

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  
  useEffect(() => {
    refreshList();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const toggleCompleted = (item) => {
    const updatedItem = { ...item, completed: !item.completed };
    console.log(`Item ${item.id} is now ${updatedItem.completed ? 'completed' : 'not completed'}`);

    axios.put(`/api/todos/${item.id}/`, updatedItem).then(() => refreshList());
  };
  

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (item) => {
   // toggle();

    if (item.id) {
      axios.put(`/api/todos/${item.id}/`, item).then(() => refreshList());
    } else {
      axios.post("/api/todos/", item).then(() => refreshList());
    }
  };

  const handleDelete = (item) => {
    const isConfirmed = window.confirm(`are you sure you want to delete ${item.description}?`)
    if (isConfirmed) {
    axios.delete(`/api/todos/${item.id}/`).then(() => refreshList());
    }
    else{
      return
    }
  };

 
  const toggleComponent = (item) => {
    const updateItem = {...item, }
  }
  
  const crItem = () => {
    
    if(inputText.trim() === ""){
      return;
    }

    const newItem = {  description: inputText};

    setActiveItem(newItem);
    handleSubmit(newItem)
    setTodoList([...todoList, newItem]);
    setInputText(""); // Clear the input field after adding the task
  };
  

  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className= "nav-link active" >        
        </span>
      </div>
    );
  };

  const renderItems = () => {
    // Use the todoList directly without filtering based on completed
    return todoList.map((item, index) => (


  
  
      <li
        key={item.id}
        style={{textDecoration: item.completed ? 'line-through' : 'none'}}
        className={`list-group-item d-flex justify-content-between align-items-center`}


      onClick={() => toggleComponent(item)}

      >
        <span
          className={`todo-description mr-2`}
          title={item.description}
          onClick={() => toggleCompleted(item)}
          style={{ cursor: 'pointer' }} // Add this line to change cursor on hover
        >
          {item.description}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            <FontAwesomeIcon icon={faEdit} />

          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item)}
          >
                  <FontAwesomeIcon icon={faTrashAlt} />

          </button>
        </span>
      </li>

    ));
  };
  


  return (
    <main className="container" style={{backgroundColor: "#f0f0f0"}}>
      <h1 className="text-white text-uppercase text-center my-4"></h1>
      
      <div className="row" >
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4 d-flex align-items-start">
            <form>
  <label>  
      <input type="text" placeholder="What is the task?" value={inputText} onChange={handleInputChange}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        crItem();
      }
    }}
    style={{width: "430px", height: "100px"}}
    />
  </label>
</form>
<button className="btn btn-primary" style={{height: "100px"}} onClick={crItem}>
  Add task
</button>

            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
};

export default App;
