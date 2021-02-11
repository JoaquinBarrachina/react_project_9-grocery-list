import "./App.css";

import React, { useState, useEffect } from "react";

//Components
import List from "./components/List";
import Alert from "./components/Alert";

//bring old data from storage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  }
};

function App() {
  //APP States
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  //Methods

  //Submit item to list
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      //no name
      showAlert(true, "danger", "Please enter some value");
    } else if (name && isEditing) {
      //edit mode
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          } else {
            return item;
          }
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
    } else {
      //Create new list entry
      showAlert(true, "success", "item added to list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "list removed");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    showAlert(true, "success", "editing");
    const item = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(item.title); //makes appear current name in input
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className="section-center">
        <form onSubmit={handleSubmit} className="grocery-form">
          {alert.show ? (
            <Alert {...alert} list={list} removeAlert={showAlert} /> //alert is linked to list to reset useeffect when something in list change
          ) : (
            ""
          )}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g: eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 ? (
          <div className="grocery-container">
            <List
              items={list}
              deleteMethod={removeItem}
              editMethod={editItem}
            />
            <button className="clear-btn" onClick={clearList}>
              Clear Items
            </button>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default App;
