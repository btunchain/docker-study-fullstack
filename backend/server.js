const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// Express 서버 생성
const app = express();

// json 형태로 오는 request 본문 해석해줄 수 있게 등록
app.use(bodyParser.json());

// 테이블 생성하기 => initialize.sql로 이동
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields) => {
// 	console.log('results', results)
// })

app.listen(5000, () => {
	console.log('애플리케이션이 5000번 포트에서 시작되었습니다.')
});

// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', (req, res, next) => {
	// 데이터베이스에서 모든 정보 가져오기
	db.pool.query('SELECT * FROM lists', 
		(err, results, field) => {
			if (err)
				return res.status(500).send(err)
			else res.json(results)
	})
});

// 클라이언트에서 입력한 값을 DB lists 테이블에 넣어주기
// 문자열에 ` 억음을 사용하는 것은 ES6부터 사용하는 것으로 문자열에 변수를 사용하거나 개행이 적용가능하다.
app.post('/api/value', (req, res, next) => {
	// DB 값 넣어주기
	// bodyParser를 사용하기 때문에 req.body를 받아올 수 있음
	db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
		(err, results, fields) => {
			if (err)
				return res.status(500).send(err)
			else
				return res.json({success: true, value: req.body.value})
		})
});