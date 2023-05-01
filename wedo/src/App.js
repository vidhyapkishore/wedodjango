import logo from "./logo.png";
import tdelete from "./components/delete.png";
import tedit from "./components/edit.png";
import "./App.css";
import "./components/mystyle.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import API from "./components/API";

function App() { 
  const [todoname, setToDoName] = useState("");
  const [closeedit, setCloseEdit] = useState("none");//for close button in edit
  const [toDo, setToDo] = useState(""); //one todo
  const [toDos, setToDos] = useState([]); //all to do array

  useEffect(() => {
    refreshTodos();
  }, []);

  const refreshTodos = () => {
    API.get("/")
      .then((res) => {
        setToDos(res.data);
      })
      .catch(console.error);
  };

  function removeobj(id) {
    fetch(`http://127.0.0.1:8000/todo_details/${id}`, {
      method: "DELETE",
    }).then(() => refreshTodos());
    const newToDOs = toDos.filter((e) => e.id !== id);
    setToDos(newToDOs);
  }

  function sett() {
    if (toDo !== "") {
      let item = { name: toDo, status: false, edit: false };
      API.post("/", item).then(() => refreshTodos());
    }
    setToDo("");
  }

  function inputHandle(name) {
    if (name !== " ") {
      setToDo(name);
    }
  }

  function statuch(ch, id) {
    fetch(`http://127.0.0.1:8000/todo_details/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: ch,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => refreshTodos());
  }

  // sending PUT request with fetch API in javascript

  function edittt(id) {
    setToDos(
      toDos.filter((obj2) => {
        if (obj2.id === id) {
          obj2.edit = "true";
          obj2.close = "block";
        } else obj2.edit = "false";

        return obj2;
      })
    );
  }

  function edittext(name,id) {
    
    fetch(`http://127.0.0.1:8000/todo_details/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name:name
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => refreshTodos());
  }

  return (
    <div className="App">
      <div className="container text-center">
        <div className="row ">
          <div className="col">
            <div className="card boxbg mt-5 text-center">
              <div className="card-body">
                <img src={logo} className="logo" alt="logo" />
                <br></br>
                <input
                  value={toDo}
                  onChange={(e) => inputHandle(e.target.value)}
                  placeholder="Add list item"
                  className="add"
                />
                <button onClick={() => sett()} className="addbutton">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row ">
          <div className="col-6">
            <div className="card boxbg mt-5 text-center">
              <div className="card-body">
                <ul>
                  <h1 className="colorwhite m-3">ToDo Tasks</h1>
                  {toDos.map((obj) => {
                    if (!obj.status) {
                      return (
                        <div>
                          <div className="row">
                            <div className="col-1">
                              <input
                                onChange={(e) =>
                                  statuch(e.target.checked, obj.id)
                                }
                                value={obj.status}
                                className="checkbutton"
                                type={"checkbox"}
                              />
                            </div>
                            <div className="col-9">
                              <li
                                className="textboxtodo"
                                contentEditable={obj.edit}
                                style={{ listStyle: "none" }}   onChange={(e) =>
                                  console.log(e.target.value)
                                }               
                              >
                                {obj.name}
                                <button onClick={() => edittext(todoname,obj.id)} className="closebutton" style={{display:obj.close}}  type="submit">&times;</button>
                              </li>
                            </div>
                            <div className="col-2">
                              <button
                                type="submit"
                                onClick={() => removeobj(obj.id)}
                                className="fl"
                              >
                                <img alt="Delete" src={tdelete} width="20px" />
                              </button>
                              <button
                                type="submit"
                                onClick={() => edittt(obj.id)}
                                className="fl"
                              >
                                <img alt="Edit" src={tedit} width="20px" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="card boxbg mt-5 text-center">
              <div className="card-body">
                <ul>
                  <h1 className="colorwhite m-3">Completed Tasks</h1>
                  {toDos.map((obj4) => {
                    if (obj4.status) {
                      return (
                        <div>
                          <div className="row">
                            <div className="col-1">
                              <input
                                onChange={(e) =>
                                  statuch(e.target.checked, obj4.id)
                                }
                                value={obj4.status}
                                checked="true"
                                className="checkbutton"
                                type={"checkbox"}
                              />
                            </div>
                            <div className="col-9">
                              <li
                                className="textboxtodo"
                                contentEditable={obj4.edit}
                                style={{
                                  listStyle: "none",
                                  textDecoration: "line-through",
                                }}
                              >
                                {obj4.name}
                                <button onClick={() => edittext(todoname,obj4.id)} className="closebutton" style={{display:obj4.close}}  type="submit">&times;</button>
                              </li>
                            </div>
                            <div className="col-2">
                              <button
                                type="submit"
                                onClick={() => removeobj(obj4.id)}
                                className="fl"
                              >
                                <img alt="Delete" src={tdelete} width="20px" />
                              </button>
                              <button
                                type="submit"
                                onClick={() => edittt(obj4.id)}
                                className="fl"
                              >
                                <img alt="Edit" src={tedit} width="20px" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
