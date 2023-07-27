import './App.css';
import Container from './Container';
import React  from 'react';
import { useState } from 'react';

import { Usercontext , showtaskbox , lga , globalprojectid} from './global';

function App() {
 
const [garr,setgarr] = useState([]);
const [showtask, setShowtask] = useState(false);
const [la, setla] = useState([]);
const [gprojectid, setgprojectid] = useState();

  return (
    <>

    <globalprojectid.Provider value={{gprojectid,setgprojectid}}>

    <lga.Provider value={{la,setla}}>
    <showtaskbox.Provider value={{showtask,setShowtask}}>
    <Usercontext.Provider value={{garr,setgarr}}>
      <Container />
    </Usercontext.Provider>
    </showtaskbox.Provider>
    </lga.Provider>
    </globalprojectid.Provider>
    </>
  );
}

export default App;
export {Usercontext , showtaskbox , lga, globalprojectid} 
