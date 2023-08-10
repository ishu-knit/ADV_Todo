import React, { useContext, useState  , useEffect} from "react";
import "./Rightside.css"
import { Usercontext, lga, globalprojectid } from "./App";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Rightside = (props) => {


    const { la, setla } = useContext(lga);
    const { garr, setgarr } = useContext(Usercontext)
    const { gprojectid, setgprojectid } = useContext(globalprojectid);
    const [filter_arr, setfilter_arr] = useState(garr);



    function moveforwardtodo(arr) {
        garr.map((ele, ind) => {
            if (ele.id === arr.id && arr.status === "todo") {
                arr.status = "inprogress"
                setgarr((pre) => [...pre])
            }
        })
    }


    function moveforwardprogress(arr) {

        garr.map((ele, ind) => {
            if (ele.projectid === arr.projectid && arr.status === "inprogress") 
            { arr.status = "completed" }
        })
        setgarr((pre) => [...pre])
    }


const y = la.filter((ele) =>{
        return (ele[1] === gprojectid)
    })



// display right side  on deleting any project title 
    const x = y.length === 0 ? (
        ((la.length !== 0) ? (
            <div>
                
                {la[la.length - 1][0]}
                {setgprojectid(la[la.length - 1][1])}
            </div>
        ) : (""))

    ) : (y[0][0])
    





    
useEffect(() => {
    setfilter_arr([...garr])

}, [garr]);


// drag AND drop 
    const handledragdrop = (result) => {

        // console.log(result)
        const { destination, source } = result
        const index = source.index

        if (!destination) { return }

        if (source.droppableId === destination.droppableId && source.index === destination.droppableId) {
            return
        }
        // console.log("garr: ",garr)
        // console.log("source: ",source)
        // console.log("destination: ",destination)


        if (source.droppableId === "todoid" && destination.droppableId === "todoid") {
            const updatedArr = [...garr]
            const [dragged_element] = updatedArr.splice(source.index, 1)
            updatedArr.splice(destination.index, 0, dragged_element)
            setgarr(updatedArr)
        }

        else if (source.droppableId === "todoid" && destination.droppableId === "progressid") {
            garr.map((ele, ind) => {
                if (ele.id === source.index) 
                {
                    
                    ele.status = "inprogress" }
            })
            
        }

        else if (source.droppableId === "progressid" && destination.droppableId === "todoid") {
            garr.map((ele, ind) => {
                if (ele.id === index) {
                    ele.status = "todo"
                }
            })
        }


        else if (source.droppableId === "progressid" && destination.droppableId === "completedid") 
        {
            garr.map((ele, ind) => {
                if (ele.id === index) 
                { ele.status = "completed"}
            })
    
        }


        else if (source.droppableId === "completedid" && destination.droppableId === "progressid") {
            garr.map((ele, ind) => {
                if (ele.id === index) 
                { ele.status = "inprogress" } 
            })
            
     
        }
        
        
        setgarr([...garr])
    setfilter_arr([...filter_arr])
    }
    



// searching 
function search(e) {
    const searched_val = e.target.value
    
    if (searched_val!=="")

    {
     const Filter_arr =garr.filter((ele)=>
        {
           return ele.title.includes(searched_val)}        
     )   
    setfilter_arr(Filter_arr)
    }
    else{
        setfilter_arr(garr)}
                    }




const todos = filter_arr.filter((ele)=>(ele.status === "todo" && ele.projectid === gprojectid))
const progresses = filter_arr.filter((ele)=>(ele.status === "inprogress" && ele.projectid === gprojectid))
const completes = filter_arr.filter((ele)=>(ele.status === "completed" && ele.projectid === gprojectid))
    return (
        <>
            
            <div className="right">
                <div>
                
                    {garr.length === 0 ? (
                        la.length===0?(

                            <h3 className="blinking-element" style={{ display: "flex", alignItem: "center", justifyContent: "center" }}>Empty Project!!!</h3>
                        ):(
                            <h3 className="blinking-element" style={{ display: "flex", alignItem: "center", justifyContent: "center" }}>Add tasks!!!</h3>
                        )
                     
                    ) : ("")
                    
                }

                        <DragDropContext onDragEnd={handledragdrop}>

                            <div>
                                <div className="rightheading" >
                                    {x}
                                </div>

                                {/* searching  */}
                                <div className="searching">

                                    <input type="text" placeholder=" Search" onChange={search} />
                                   
                                </div>

{/* TODO */}
                                <div className="status">
                                    <div className="item to_do ">

                                        <div>
                                            <div style={{ textAlign: "center", borderBottom: "3px solid grey", marginBottom: "31px" }} >
                                                <div>
                                                <b>
                                                    Todo
                                                </b>
                                                </div>
                                                <div>
                                                {todos.length}

                                                </div>

                                            </div>


                                            <Droppable droppableId="todoid" >
                                                {(Provided) => (
                                                    <div {...Provided.droppableProps} ref={Provided.innerRef}>
                                                    
                                                         {todos.map((ele, ind) => {
                                                                return (<>
                                                                    <Draggable draggableId={ele.id.toString()} key={ele.id} index={ele.id}>
                                                                        {(Provided) => (
                                                                            <div className="project_block"  {...Provided.dragHandleProps}  {...Provided.draggableProps} ref={Provided.innerRef}>

                                                                                {ele.title}
                                                                                
                                                                                <div style={{ textAlign: "center" }}>
                                                                                    <button style={{ backgroundColor: "#F77D24", borderRadius: "10px 10px 0 0" }} onClick={() => moveforwardtodo(ele)} >Start</button>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                    </Draggable>
                                                                </>)
                                                        })}
                                                        

                                                     
                                                    
                                                        {Provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    </div>


{/* progress */}
                                    <div className="item In_progess">
                                        <div style={{ textAlign: "center", borderBottom: "3px solid grey", marginBottom: "31px" }} >
                                           <div>
                                           <b>
                                                In progress
                                            </b>
                                           </div>
                                           <div>
                                            {progresses.length}
                                           </div>
                                           

                                        </div>
                                        <div >

                                            <Droppable droppableId="progressid" >
                                                {(Provided) => (

                                                    <div {...Provided.droppableProps} ref={Provided.innerRef}  >

                                                        {progresses.map((ele, ind) => {

                                                                return (<>

                                                                    <Draggable draggableId={ele.id.toString()} key={ele.id} index={ele.id} >
                                                                        {(Provided) => (

                                                                            <div className="project_block"
                                                                                {...Provided.dragHandleProps}
                                                                                {...Provided.draggableProps}
                                                                                ref={Provided.innerRef}>
                                                                                <div className="title">
                                                                                    
                                                                                    {ele.title}
                                                                                </div>
                                                                                <div className="description">
                                                                                    {ele.description}
                                                                                </div>
                                                                                <div style={{ textAlign: "center" }}>

                                                                                    <button style={{ backgroundColor: "#5adbb5", borderRadius: "10px 10px 0 0" }} onClick={() => moveforwardprogress(ele)}>Completed</button>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                </>)
                                                        })}
                                                        {Provided.placeholder}
                                                    </div>
                                                )}

                                            </Droppable>

                                        </div>

                                    </div>

{/*completed  */}

                                    <div className="item Completed">
                                        <div style={{ textAlign: "center", borderBottom: "3px solid grey", marginBottom: "31px" }}>
                                            <div>
                                            <b>
                                                Completed
                                            </b>
                                            </div>
                                            <div>
                                            {completes.length}
                                            </div>
                                        </div>
                                        <div >
                                            <Droppable droppableId="completedid">
                                                {(provide) => (


                                                    <div {...provide.droppableProps} ref={provide.innerRef} >

                                                        {completes.map((ele, ind) => {

                                                                return (<>

                                                                    <Draggable draggableId={ele.id.toString()} key={ele.id} index={ele.id}>
                                                                        {(Provided) => (

                                                                            <div className="project_block"
                                                                                {...Provided.dragHandleProps}
                                                                                {...Provided.draggableProps}
                                                                                ref={Provided.innerRef}
                                                                            >

                                                                                <div className="title">
                                                                                    {ele.title}
                                                                                
                                                                                </div>
                                                                                <div className="description">
                                                                                    {ele.description}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    
                                                                    </Draggable>

                                                                </>)

                                                        })}
                                                        {provide.placeholder}
                                                    </div>

                                                )}
                                            </Droppable>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </DragDropContext>


                </div>
                <div>
                </div>
            </div>
        </>
    );
}

export default Rightside;