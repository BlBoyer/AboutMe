import { useState, useEffect } from 'react';
//make object.keys the first variable used to populate the list, then change the array to object.values much easier
function App() {
  const [data, setData]=useState({id:0, name:'', skills:[], likes:[], contact:''});
	const [meDisp, setMeDisp] = useState([...Object.keys(data)]);
	const changeProp = (_index, cb) => {
		//if the display item is a key of the object, set it to the value
		var el = document.getElementById(`cues${_index}`);
		var detailRow = document.getElementById('content');
		if (!cb) {
			var keys = Object.keys(data);
			var childP = document.createElement('p');
			el.classList.add('transitive');
			var txt = '';
			//if the value is an array format it for reading
			typeof data[keys[_index + 1]] === 'object'
				? (txt = data[keys[_index + 1]].join(', '))
				: (txt = data[keys[_index + 1]]);
			el.style.opacity = 0.4;
			el.style.paddingRight = '15px';
			el.textContent += '  ->';
			detailRow.appendChild(childP).textContent = txt;
		} else {
			el.style.opacity = 1;
			el.style.paddingRight = '.5em';
			el.textContent = el.textContent.slice(0, -4);
			detailRow.removeChild(detailRow.lastChild);
		}
	};
	useEffect(() => {
		//api fetch goes here
		//Note: template for actions is 'controller/action/id?'
		const fetchMe = async () => {
			const response = await fetch('https://localhost:7010/Owner/aboutme');
			let myData;
			try {
				myData = await response.json();
				setData(myData);
			} catch (err) {
				alert(err);
			}
			console.log(myData);
		};
		fetchMe();
		setMeDisp(Object.keys(data));
	}, []);
	return (
		<div id="content">
			<h1 id="header">About Me</h1>
			<div id="traitList">
				<ul id="prop-list">
					{meDisp.slice(1).map((item, index) => (
						<li
							id={'cues' + index}
							key={index}
							className="tag"
							onMouseEnter={() => changeProp(index, false)}
							onMouseLeave={() => changeProp(index, true)}>
							{item.toString()}
						</li>
					))}
				</ul>
			</div>
			<footer id="footer">Created with React and ASP.Net WebApi</footer>
		</div>
	);
}
export default App;
