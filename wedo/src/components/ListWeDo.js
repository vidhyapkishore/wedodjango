import React, {useState} from 'react'
import tdelete from './delete.png';
import './mystyle.css';
const ListWeDo= () => { 
  const [input, setInput] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [completedtodoList, setcompletedTodoList] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const handleClick = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
      },
    ]);
    setInput("");
  };

  const handleComplete = (id) => {
    let list = todoList.filter().map((task) => {
      let item = {};
      if (task.id === id) {
        item = { ...task, complete: !task.complete };
      } 
      else 
        item = { ...task };
      return item;
    });
    setTodoList(list);
  };


  return (
      <div>
        <div>
          <ul>
            {todoList.map((todo) => {
              return (
                <div className='row'> 
                  <div className='col-1'>
                  <input  onClick={() => handleComplete(todo.id)} className='checkbutton' type={"checkbox"} />
                  </div>
                  <div className='col-9'>
                  <li className='textboxtodo' complete={todo.complete} id={todo.id} style={{ listStyle: "none", textDecoration: todo.complete && "line-through",}} >{todo.task}</li>
                  </div>
                  <div className='col-2'>
                  <button type='submit' onClick={()=>handleComplete()} className='fl'><img src={tdelete} width='20px'/></button>
                  </div>        
                </div>
              );
            })}
          </ul>         
        </div>
        
        <input className='add' value={input} onInput={(e) => setInput(e.target.value)} />
        <button className='addbutton' onClick={() => handleClick()}>Add</button>
      </div>
  );
};

export default ListWeDo




