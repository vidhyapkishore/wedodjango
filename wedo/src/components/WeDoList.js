import logo from './logo.png';
import tdelete from './components/delete.png';
import './App.css';
import './components/mystyle.css'
import { useState } from 'react';
function App() {
  const[toDo,setToDo]=useState('')//one todo
  const[toDos,setToDos]=useState([])//all to do array

  //remove item
  function removeobj(id) {
    const newToDOs = toDos.filter((e)=> e.id !== id);
    setToDos(newToDOs)
  }




  return (
    <div className="App">      
       <div className="container text-center">
          <div className="row ">
              <div className="col-10 offset-1">
                  <div className="card boxbg mt-5 text-center">
                    <div className="card-body">
                      <img src={logo} className="logo" alt="logo" />
                      <ul>
                        { toDos.map((obj)=>{
                          if (!obj.status){
                      return (<div className='row'> 
                                <div className='col-1'>
                                <input onChange={(e)=>{
                                  setToDos(toDos.filter(obj2=>{
                                      if(obj2.id===obj.id){
                                        obj2.status=e.target.checked
                                      }
                                        return obj2
                                  }))
                                  } }value={obj.status} className='checkbutton' type={"checkbox"} />
                                </div>
                                <div className='col-9'>
                                <li className='textboxtodo' style={{ listStyle: "none",}}  >{obj.text}</li>
                                </div>
                                <div className='col-2'>
                                <button type='submit' onClick={()=>removeobj(obj.id)} className='fl'><img src={tdelete} width='20px'/></button>
                                </div>        
                            </div>);
                            }} )}
                      </ul>
                     
                      <input value={toDo} onChange={(e)=>setToDo(e.target.value)} placeholder='Add list item' className='add'  />
                      <button onClick={()=>setToDos([...toDos,{id:Date.now(),text:toDo,status:false}])} className='addbutton' >Add</button>
                      <ul>
                        <h1 className='colorwhite mt-5'>Completed Tsak</h1>
                        { toDos.map((obj4)=>{
                          if(obj4.status){
                            return (<div className='row'> 
                            <div className='col-1'>
                            <input onChange={(e)=>{console.log(e.target.value) 
                              console.log(obj4)
                              setToDos(toDos.filter(obj3=>{
                                  if(obj3.id===obj4.id){
                                    obj3.status=e.target.checked
                                  }
                                    return obj3
                              }))
                              } }value={obj4.status} checked='true' className='checkbutton' type={"checkbox"} />
                            </div>
                            <div className='col-9'>
                            <li className='textboxtodo' style={{ listStyle: "none",textDecoration: "line-through",}}  >{obj4.text}</li>
                            </div>
                            <div className='col-2'>
                            <button type='submit' onClick={()=>removeobj(obj4.id)} className='fl'><img src={tdelete} width='20px'/></button>
                            </div>        
                        </div>);
                          }
                         } )}
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
