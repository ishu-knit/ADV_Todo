import React, { useContext } from 'react'
import { useState } from 'react';
import "./Leftside.css"
import { Usercontext, showtaskbox, lga, globalprojectid } from './App';
import Todo from './Todo';
import { Delete } from '@mui/icons-material';


import AssignmentIcon from '@mui/icons-material/Assignment';

const Leftside = () => {

  const { garr, setgarr } = useContext(Usercontext);
  const { showtask, setShowtask } = useContext(showtaskbox);
  const { la, setla } = useContext(lga);
  const { gprojectid, setgprojectid } = useContext(globalprojectid);
  //upper left 
  // console.log(showtask)

  const [sen, setsen] = useState("");
  const [i, setI] = useState(0);
  const [projectid, setProjectid] = useState(0);
  
  

  let x;
  if (la.length === 0) { x =
    <h3>
      Start creating a new project
    </h3>
    }

  else {x = 
    <h3>

      Projects
    </h3>
  }

  function Words(e) {
    let p = e.target.value
    setsen(p)
  }


  function Adding() {
    if (sen !== "") {
      setI(i + 1)
      setla((pre) => { return [...pre, [sen, i]] })
      setsen("")
    }
  }

// remove   -
  function remove(e) {

    // to change left side view 
    let newarr = la.filter((elem, indx) => {
      return (elem[1] !== e)
    })
    setla(newarr)

    // to change right side view 
   let newgarr = garr.filter((ele,i)=>{
    return ele.projectid!==e
   }) 
    setgarr(newgarr)

    // to set global project id 
    
  }


  // activate add-Task
  function trigger(x) {

    setShowtask(!showtask)
    setProjectid(x)
    setgprojectid(x)
  }

  
  return (
    <>
      <div className='left'>

        <div className="upperleft">
          {x}
          <div className="add_project_title">
            <input
              className='add-projects'
              placeholder="Add Project Title"
              onChange={Words}
              maxLength="20"
              value={sen}

              onKeyDown={(e)=>{
                if(e.key==="Enter")
                {Adding()}
              }}
            ></input>

            <button style={{border:"0" , backgroundColor:"White" , outline:"None"}} onClick={Adding}>➕</button>
            <div style={{position:"absolute" , left:"0px" , zIndex:"2" } } >
            {showtask && <Todo projid={projectid} />}
            </div>
            <div className='allproject'>
              {la.map((ele, ind) => {
                return (
                  <>
                    <div className='project_list' key={ind+10} onClick={() => setgprojectid(ele[1])}>
                    <div className="creating_pointer">
                     <AssignmentIcon/> {ele[0]}

                    </div>  
                    
                    
                    <div>

                      <button className='add-task' onClick={() => {trigger(ele[1])}} >Add-Task</button>
                      <Delete className='delete'  style={{color:"red" , fontSize:"20px"}} onClick={() => remove(ele[1])}   />   
                    </div>

                    
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      
      {/* iniiatlly taskbox todo is here */}
        
        
      </div>
    </>
  )}

export default Leftside



// la = [  [name,id],[],[],[],[],[]  ] 
