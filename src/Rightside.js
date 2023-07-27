import React, { useContext, useState } from "react";
import "./Rightside.css"
import { Usercontext, lga, globalprojectid } from "./App";




const Rightside = (props) => {
    const { la, setla } = useContext(lga);
    const { garr, setgarr } = useContext(Usercontext)
    const { gprojectid, setgprojectid } = useContext(globalprojectid);



    function moveforwardtodo(arr) {
        garr.map((ele, ind) => {
            if (ele.projectid === arr.projectid && arr.status === "todo") {
                arr.status = "inprogress"
            }
        })

        setgarr((pre) => [...pre])
    }


    function moveforwardprogress(arr) {

        garr.map((ele, ind) => {
            if (ele.projectid === arr.projectid && arr.status === "inprogress") { arr.status = "completed" }
        })
        setgarr((pre) => [...pre])
    }





    const y = la.filter((ele) => {
         return (ele[1]===gprojectid)  
    })


    const x = y.length===0?(        
       ( (la.length!==0)?(
        <div>
            {la[la.length-1][0]}
            {setgprojectid(la[la.length-1][1])}
        </div>

        ):(""))
        ):(y[0][0])

    return (
        <>
            <div className="right">
                <div>

                    {garr.length === 0   ? (
                        <>
                            <h3 className="blinking-element" style={{ display: "flex", alignItem: "center", justifyContent: "center" }}>Empty Project!!!</h3>
                        </>
                    ) : (

                        <div>
                            <div className="rightheading" >
                            {x}
                            </div>

                            <div className="status">
                                <div className="item   to_do ">
                                    <div>
                                        <div style={{ textAlign: "center", border: "2px solid grey", marginBottom: "10px" }} >
                                          <b>
                                            Todo
                                          </b>
                                        </div>

                                        <div >
                                            {garr.map((ele, ind) => {
                                                if (ele.status === "todo" && ele.projectid === gprojectid)
                                                    return (<>
                                                        <ol className="project_block">
                                                           <div >
                                                           {ele.title}
                                                           </div> 
                                                           <div style={{textAlign:"center"}}>

                                                            <button  style={{ backgroundColor:"#F77D24" , borderRadius:"10px 10px 0 0"}} onClick={() => moveforwardtodo(ele)} >Start</button>
                                                           </div>
                                                        </ol>
                                                    </>)
                                            })}
                                        </div>

                                    </div>

                                </div>
                                <div className="item In_progess">
                                    <div style={{ textAlign: "center", border: "2px solid grey", marginBottom: "10px" }} >
                                       <b>
                                        In progress
                                       </b>
                                    </div>
                                    <div >
                                        {garr.map((ele, ind) => {

                                            if (ele.status === "inprogress" && ele.projectid === gprojectid)
                                                return (<>
                                                    <div className="project_block">
                                                        <div>
                                                        • {ele.title}
                                                        </div>
                                                        <div>
                                                            {ele.description}
                                                        </div>
                                                        <div style={{textAlign:"center"}}>

                                                        <button style={{ backgroundColor:"#5adbb5" , borderRadius:"10px 10px 0 0"}} onClick={() => moveforwardprogress(ele)}>Completed</button>
                                                        </div>
                                                    </div>
                                                </>)
                                        })}

                                    </div>

                                </div>
                                <div className="item Completed">
                                    <div style={{ textAlign: "center", border: "2px solid grey", marginBottom: "10px" }}>
                                      <b>
                                        Completed
                                      </b>
                                    </div>
                                    <div >

                                        {garr.map((ele, ind) => {

                                            if (ele.status === "completed" && ele.projectid === gprojectid)
                                                return (<>
                                                    <div className="project_block" style={{backgroundColor:"#5adbb5"}}>
                                                        <div>
                                                        • {ele.title}
                                                        </div>
                                                        <div>
                                                            {ele.description}
                                                        </div>
                                                    </div>
                                                </>)

                                        })}
                                    </div>

                                </div>
                            </div>


                        </div>
                    )}

                </div>


            <div>

            </div>
            </div>
        </>
    );
}

export default Rightside;