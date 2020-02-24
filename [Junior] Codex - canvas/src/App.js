import React from 'react';
import './App.css';

//Файл с командами для выполнения
import text from './assets/input.txt';

//Функциональные компоненты
import Canvas from './components/Canvas/canvas'
import setCanvas from './components/Canvas/setCanvas'
import drawLine from './components/Line/drawLine'
import drawRect from './components/Rectangle/drawRect'
import bucketFill from './components/BucketFill/BucketFill'

const App = (props) => {
	const [data, setData] = React.useState(null);
	let width, height, drawingField;
	let canvasOutput = [];

	// Сохраняем команды из файла input.txt в переменную -> data
	React.useEffect(() => {
		fetch(text)
			.then((r) => r.text())
			.then(text  => setData(text.split('\n').map(el => el.split(" "))))
	}, [])

	// Выполяем команду C - Canvas
	const commandC = (arr, step) => {
		let strokes = [];
		width = parseInt(arr[1]) + 2; // +2 для отрисовки границ канваса
		height = parseInt(arr[2]) + 2;

		//Создаем хеш таблицу с информацией о позиции каждого элемента будующего канваса
		for (let y = 0; y < height; y++) {
			strokes.push([])
		}
		for (let y in strokes) {
			for (let x = 0; x < width; x++) {
				strokes[y].push({x: x, y: y})
			}
		}

		//Вызываем функцию setCanvas для отрисовки границ поля
		drawingField = setCanvas(strokes, width);
		canvasOutput[step] =(<Canvas key={arr} canvas={drawingField} />)
	}

	const invalidLine = (step) => {
		canvasOutput[step] = (
			<React.Fragment key={step}>
				<p>Please set the line command correctly!<strong> Your line won't be displayed.</strong></p>
				<p>You could use only <strong>vertical</strong> or <strong>horisontal</strong> line. So, be sure you use the right one.</p>
				<p>For example you could use this command: <strong>L 1 2 6 2</strong></p>
			</React.Fragment>
		)
	}

	// Выполяем команду L - Line
	const commandL = (arr, step) => {
		let line = [...arr].filter(el => el !== 'L').map((el => el = parseInt(el))).filter(el => !isNaN(el))

		//Проверяем валидность линий на коректно введенные данные
		if (line.length < 4) return invalidLine(step);
		//Проверяем валидность линий на ТОЛЬКО горизонтальные / вертикальные линии
		if (line[0] !== line[2] && line[1] !== line[3]) return invalidLine(step);

		canvasOutput[step] = <Canvas key={arr} canvas={drawLine(drawingField, line)} />;
	}

	const invalidRectangle = (step) => {
		canvasOutput[step] = (
			<React.Fragment key={step}>
				<p>Please set the rectangle command correctly!<strong> Your rectangle won't be displayed.</strong></p>
				<p>Please choose right coordinate for X0, Y0 and X1, Y1. Be sure you are using right queue.</p>
				<p>For example you could use this command: <strong>R 16 1 20 3</strong></p>
			</React.Fragment>
		)
	}
	
	// Выполяем команду R - Rectangle
	const commandR = (arr, step) => {
		const rect = [...arr].filter(el => el !== 'R').map((el => el = parseInt(el))).filter(el => !isNaN(el));
		
		//Проверяем валидность прямоугольника на коректно введенные данные
		if (rect.length < 4) return invalidRectangle(step);
		//Проверяем валидность прямоугольника на верно заданные координаты
		if (rect[0] >= rect[2] || rect[1] >= rect[3]) return invalidRectangle(step);

		canvasOutput[step] = <Canvas key={arr} canvas={drawRect(drawingField, rect)} />
	}

	const invalidBucketFill = (step) => {
		canvasOutput[step] = (
			<React.Fragment key={step}>
				<p>Please set the bucketFill command correctly!<strong> Your bucketFill won't be displayed.</strong></p>
				<p>I guess you setup wrong coordinate for X and Y there. Be sure, coordinates stay in Canvas area.</p>
				<p>For example you could use this command: <strong>B 10 3 o</strong></p>
			</React.Fragment>
		)
	}

	// Выполяем команду В - Bucket Fill
	const commandB = (arr, step) => {
		const [x, y, colour] = [...arr].filter(el => el !== 'B').map((el => el))
		const starterPoint = [parseInt(x), parseInt(y)].filter(el => !isNaN(el));

		if (starterPoint.length !== 2) return invalidBucketFill(step);
		if (starterPoint[0] > width-2 || starterPoint[1] > height-2) return invalidBucketFill(step);

		canvasOutput[step] = <Canvas key={arr} canvas={bucketFill(drawingField, starterPoint, colour)} output={props.canvas} />
	}

	// Диспетчер выполняемых комманд
	const dispatchCommands = (arr, step) => {
		switch (arr[0]) {
			case 'C': return commandC(arr, step);
			case 'L': return commandL(arr, step);
			case 'R': return commandR(arr, step);
			case 'B': return commandB(arr, step);
			default: return alert(`Команда ${arr} - не опознана, укажите одну из команд L, R or B`);
		}
	}

	let isValid = true;
	if (data) {
		//Проверяем валидацию первой команды, если команда === C, то продолжаем отрисовку
		if (data[0][0] !== 'C' || isNaN(parseInt(data[0][1])) || isNaN(parseInt(data[0][2]))) {
			canvasOutput = (
				<React.Fragment>
					<p>Please set the canvas using command <strong>C!</strong></p> 
					<p>For example you could use this command: <strong>C 20 4</strong></p>
				</React.Fragment>
			)
			isValid = false;
		}
	}

	if (isValid && data) {
		// Берем команды полученые из файла и отпавляем их в диспетчер
		for (let step = 1; step <= data.length; step++) {
			// Выполяем команды последовательно с повторением предыдущих шагов 
			const command = data.slice(0, step);
			for (let i of command) {
				dispatchCommands(i, step);
			}
		}
	}
	
	
	return (
		<div className="App">
			<h1>Hello, Developer!</h1>
			<p>First of all, lemme introduce you to this little triky projects :D. So, feel free playing around.</p>
			<ol style={{textAlign: 'left'}}>
				<li>You could use any area of canvas you want.</li>
				<li>If you put any incorrect commant - it won't be displayed. At least you see the error instead of canvas output ... ghrr</li>
				<li>You could set any number of lines, rectangles and bucketFills.</li>
				<li>Also, I want to appologize for quality of my unit tests. They're not perfect at all. I did it first time, but did as best as could.</li>
				<li>Hope you enjoy it as I did. See you!</li>
			</ol>
			<div>
				{canvasOutput}
			</div>
		</div>
	);
}

export default App;