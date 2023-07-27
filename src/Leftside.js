import React, { useContext } from 'react'
import { useState } from 'react';
import "./Leftside.css"
import { Usercontext, showtaskbox, lga, globalprojectid } from './App';
import Todo from './Todo';
import { Delete } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';


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

      Add new projects
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

    setShowtask(true)
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
            ></input>

            <button style={{border:"0" , backgroundColor:"White" , outline:"None"}} onClick={Adding}>➕</button>
            <div className='allproject'>
              {la.map((ele, ind) => {
                return (
                  <>
                    <div className='project_list'>

                    <div>
                      {ele[0]}
                    </div>

                    <div>

                      <button className='add-task' onClick={() => trigger(ele[1])} >Add-Task</button>
                      <button className='show' onClick={() => setgprojectid(ele[1])}><VisibilityIcon/></button>
                      <button className='delete' onClick={() => remove(ele[1])} ><Delete style={{color:"red"}}/></button>
                    </div>

                    
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        {showtask && <Todo projid={projectid} />}
      </div>
    </>
  )}

export default Leftside



// la = [  [name,id],[],[],[],[],[]  ] 
