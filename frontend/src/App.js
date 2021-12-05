import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function App() {
	
	// 데이터베이스에 있는 값을 가져온다.
	useEffect(() => {
		axios.get(`/api/values`)
			.then(response => {
				console.log('response', response.data);
				setLists(response.data);
			})
	}, []);
	
	// onChange 이벤트를 다루는 이벤트 핸들러
	const changeHandler = (e) => {
		setValue(e.currentTarget.value);
	}
	
	// onSubmit 이벤트를 다루는 이벤트 핸들러
	const submitHandler = (e) => {
		e.preventDefault(); // 기존의 이벤트를 막아줌
		axios.post(`/api/value`, {value: value})
			.then(response => {
				if (response.data.success) {
					console.log('response', response);
					setLists([...lists, response.data.value]);
					setValue("");
				}
				else {
					alert('값을 DB에 넣는데 실패하였습니다.');
				}
			})
	}
	
	const [lists, setLists] = useState([]);
	const [value, setValue] = useState("");
	
	return (
		<div className="App">
		  <header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<div className="container">

				{lists && lists.map((list, index) => (
					<li key={index}>{list.value}</li>
				))}
				
				<form className="example" onSubmit={submitHandler}>
					<input type="text" placeholder="입력해주세요..."
					onChange={changeHandler}
					value={value}/>
					<button type="submit">확인</button>
				</form>
			</div>
		  </header>
		</div>
);
}

export default App;
