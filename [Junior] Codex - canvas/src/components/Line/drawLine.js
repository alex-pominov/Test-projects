 const drawLine = (oldField, line) => {
	let field = {...oldField};
	//Рисуем линии если линия передана как пропс
	for (let i in field) {
		if (line[1] <= i && line[3] >= i) {
			for (let el in field[Object.keys(field)[i]]) {
				if (field[Object.keys(field)[i]][el] === '-') break; 
				
				if (line[0] <= el && line[2] >= el) {
					if (field[Object.keys(field)[i]][el] === '|') break; 
					field[Object.keys(field)[i]][el] = 'x'
				}
			}
		}
	}

  return field;
}

export default drawLine;