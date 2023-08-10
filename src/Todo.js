import "./Todo.css"
import React, { useContext, useState  } from 'react'
import { Usercontext , showtaskbox} from './App';

import { lga } from "./App";



function Todo(props) {


const ran = Math.floor(Math.random()*100)


// props  it contain selected project id 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");

  const { garr, setgarr } = useContext(Usercontext);
  const {showtask,setShowtask}   = useContext(showtaskbox);
    const {la,setla} = useContext(lga);


    
     const y =  la.filter((ele,i)=>{
        return ele[1]===props.projid
      })
    





  function createtitle(e) {
    const x = e.target.value
    setTitle(x)
  }

  function createdescription(e) {
    const x = e.target.value
    setDescription(x)
  }

  function progress_status(e) {
    setProgress(e.target.value)
  }


  function Add() {

    const memo =
    {
      id:ran,
      title: title,
      description: description,
      status: progress,
      projectid:props.projid
    };

    if (title !== "" && progress !== "" && description !== "") {
      setgarr((pre) => { return [...pre, memo] })
      setShowtask(false) 
    
    setTitle("")
    setDescription("")
    setProgress("")
  }

  else
  {
    if (title===""){
      alert("title box not filled")
    }
    if (description==="")
    alert("descripiton is not filled")
  }
  }








  

  return (
    <>
      <div className= "task_box">
        
        <div className="task_box_heading">
        <div  className="task_box_close_btn"  onClick={()=>setShowtask(false)}>❌</div>
        <div className="text"> <b>Task</b>  </div>
        
        </div>


        <div >
          <input  className="input-field" type="text" onChange={createtitle} placeholder="Title" value={title} />
        </div>

        <div>
          <input className="input-field" type="text" onChange={createdescription} placeholder="Description" value={description} />
        </div>
        <div  >


          <select className="exp" value={progress} onChange={progress_status}>
            <option value="">Select status</option>
            <option value="todo">Todo</option>
            <option value="inprogress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div >
          <button className="addbtn" onClick={Add}>Add To {y[0][0]}
           </button>
        </div>
      </div>
   
    </>
  )
}


export default Todo