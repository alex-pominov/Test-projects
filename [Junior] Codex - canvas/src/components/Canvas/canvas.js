import React from 'react';

const Canvas = (props) => {
	let canvas = [];
	let field = {...props.canvas};
	const style = {display: 'inline-block', width: '12px'}
	
	//Устанавливаем символы для рендера элементов на экран
	for (let i in field) {
		field[Object.keys(field)[i]] = field[Object.keys(field)[i]].map(el => 
			{
				if (el.colour) {
					el = <span key={Math.random()} style={style}>{el.colour}</span>
				} else if (el === 'x') {
					el = <span key={Math.random()} style={style}>x</span>
				} else if (el === '-') {
					el = <span key={Math.random()} style={style}>–</span>
				} else if (el === '|') {
						el = <span key={Math.random()} style={style}>|</span>
				} else if (el !== '-' && el !== '|') {
					el = <span key={Math.random()} style={style}>&nbsp;</span>
				}
				return el;
			}
		)
	}

	//	Пушим JSX элементы в массив для последующего вывода на экран
	for (let i in field) {
		canvas.push(
			<p key={i} style={{margin: '0', verticalAlign: 'center', textAlign: 'center'}}> 
				{field[Object.keys(field)[i]]} 
			</p>
		)
	}
	
	return canvas;
}

export default Canvas;