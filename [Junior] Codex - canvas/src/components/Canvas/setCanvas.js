const setCanvas = (strokes, width) => {
	let field = {...strokes};
    //Устанавливаем поле канваса - горизонтальные линии
    field[Object.keys(field)[0]] = field[Object.keys(field)[0]].map(item => item = '-');
    field[Object.keys(field)[Object.keys(field).length -1]] = 
	  field[Object.keys(field)[Object.keys(field).length -1]].map(item => item = '-');

	//Устанавливаем поле канваса - вертикальные боковые линии
	for (let i in field) {
		field[Object.keys(field)[i]] = field[Object.keys(field)[i]].map(el => 
			{
				if (el.x === 0 || el.x === width-1) el = '|'
				return el;
			}
		)
	}
	return field;
}

export default setCanvas;