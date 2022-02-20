import { useState, useEffect } from 'react';
//make object.keys the first variable used to populate the list, then change the array to object.values much easier
function App() {
  const [data, setData]=useState({id:0, name:'', skills:[], likes:[], contact:''});
  const [meDisp, setMeDisp]=useState([...Object.keys(data)]);
  const changeProp = (_index, _item) => {
    var mutated = meDisp;
    if (Object.keys(data).includes(_item)) {
      mutated.splice(_index, 1, data[_item]);
      setMeDisp([...mutated]); 
    } else {
      mutated.splice(_index,1,Object.keys(data)[_index])
      setMeDisp([...mutated]);
    }
  }
  useEffect(()=>{
 //api fetch goes here
 //Note: template for actions is 'controller/action/id?'
 const fetchMe = async () => {
  const response = await fetch("https://localhost:7010/Owner/aboutme");
  let myData;
  try {
    myData = await response.json();
    setData(myData);
  } catch(err) {
    alert(err);
  }
  console.log(myData);
  }
  fetchMe();
  setMeDisp(Object.keys(data));
  },[]);
  return (
    <div id="content">
      <h1>About Me</h1>
      <div>
        <ul>{
          meDisp.slice(1,).map((item, index)=>
          <li id={'cues'+index} key={index}  className="tag" onMouseOver={()=>changeProp(index+1, item)}>
            {item.toString()}
          </li>
          )
        }</ul>
      </div>
  </div>
  );
}
export default App;
