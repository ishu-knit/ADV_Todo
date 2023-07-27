import React from 'react'
import Rightside from './Rightside';
import Leftside from './Leftside';
import "./Container.css"


const Container = () => {
  return (
    <div className='con'>
     <Leftside/>
     <Rightside/> 
    </div>
  )
}

export default Container
