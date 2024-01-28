import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [edit, setEdit] = useState(true);
  const [sections, setSections] = useState([
    `c26360b4-b28e-41c1-a371-8fb4d1528aa2`,]);

  const addSection = (e: any) => {
    e.preventDefault();
    const myUUID = uuidv4();
    setSections((prev) => [...prev, myUUID]);
  };

  const deleteSection = (e: any, sec:string) => {
    e.preventDefault();
    const newSections = sections.filter( section => section !== sec)
    setSections(() => [...newSections]);
  };

  const setPositionMinus1 = (e: any, sec:string) => {
    e.preventDefault();
    setSections((prev) => [sec, ...prev])
  };


let myArray = [1, 2, 3, 4, 5];
const indexToMove = 2;
const newPosition = 4;
let x = moveElementInArray(myArray, indexToMove, newPosition);
myArray = x

  function moveElementInArray(array:any, indexToMove:any, newPosition:any) {
    return array.map((element:any, index:any) => {
      if (index === indexToMove) {
        return array[newPosition];
      } else if (index === newPosition) {
        return array[indexToMove];
      } else {
        return element;
      }
    });
  }



  return (
    <div className="app">
      <h1>edit mode</h1>
      {edit ? <p>edit mode true</p> : <p>preview mode</p>}
      <div>
        <button onClick={() => setEdit(true)}>edit</button>
        <button onClick={() => setEdit(false)}>preview</button>
        <button onClick={() => setEdit(false)}>save</button>
      </div>

      <div className="container">
        <button onClick={(e: any) => addSection(e)}>add section</button>
      </div>
      {sections.map((section) => (
        <div style={{border:`1px solid black`, padding:`5px`}}>
        <p>{section}</p>
        <input type="text" placeholder='content'/>
        <button onClick={(e: any) => deleteSection(e, section)}>delete</button>
        <button onClick={(e: any) => setPositionMinus1(e, section)}>move back</button>
        </div>
      ))}
    </div>
  );
};

export default App;
