import { createContext } from "react";

const Usercontext = createContext(null);
const showtaskbox = createContext();

// left side global array 
const lga = createContext();

// global project id 
const globalprojectid = createContext();

export {Usercontext,showtaskbox ,lga,globalprojectid}