const drawRect = (oldField, rect) => {
  let field = {...oldField};
  //Рисуем прямоугольник
  for (let i in field) {
    //Рисуем горизонтальные линии прямоугольника
    if (rect[1] === parseInt(i) || rect[3] === parseInt(i)) {
      for (let el in field[Object.keys(field)[i]]) {
        if (field[Object.keys(field)[i]][el] === '-') break; 
        
        if (rect[0] <= el && rect[2] >= el) {
          if (field[Object.keys(field)[i]][el] === '|') break; 
          field[Object.keys(field)[i]][el] = 'x'
        }
      }
    }

    //Рисуем вертикальные линии прямогольника
    if (rect[1] < parseInt(i) && rect[3] > parseInt(i)) {
      for (let el in field[Object.keys(field)[i]]) {
        if (field[Object.keys(field)[i]][el] === '-') break; 

        if (rect[0] === parseInt(el) || rect[2] === parseInt(el)) {
          if (field[Object.keys(field)[i]][el] === '|') break; 
          field[Object.keys(field)[i]][el] = 'x'
        }
      }
    }
    
  }
  return field;
}

export default drawRect;