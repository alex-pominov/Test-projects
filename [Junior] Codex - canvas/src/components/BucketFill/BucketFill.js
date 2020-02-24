const bucketFill = (oldField, line, colour) => {
  let field = {...oldField};
  const height = Object.keys(field).length;

  //Заполняем цветом координату X/Y только в том случае если там нет линии/ прямоуголиника
  if (field[Object.keys(field)[line[1]]][line[0]] !== 'x')
   field[Object.keys(field)[line[1]]][line[0]] = {y: line[1], x: line[0], colour: colour}

  //Заполняем все ячейки на строке слева и справа от точки Х (вплодь до границы либо до ближайщей линии)
  const checkConditionToFill = (y, i) => {
    for (let x = i; x > 0; x++) {
      if (field[Object.keys(field)[y]][x] === '|') break;
      if (field[Object.keys(field)[y]][x] === 'x') break;
      field[Object.keys(field)[y]][x] = {y: y, x: x, colour: colour}
    }
    for (let x = i; x > 0; x--) {
      if (field[Object.keys(field)[y]][x] === '|') break;
      if (field[Object.keys(field)[y]][x] === 'x') break;
      field[Object.keys(field)[y]][x] = {y: y, x: x, colour: colour}
    }
  }

  checkConditionToFill(line[1], line[0]);

  //Экспансим заливку по всем возможным ячейкам (как вирус :)
  for (let i in field) {
    for (let el of field[Object.keys(field)[i]]) {
      if (el.colour === colour) {
        
        //Заполняем все ячейки в столбце снизу от точки Y (вплодь до границы либо до ближайщей линии)
        for (let y = el.y; y < height-1; y++) {
          if (field[Object.keys(field)[y]][el.x] === '|') break;
          if (field[Object.keys(field)[y]][el.x] === 'x') break;
          checkConditionToFill(y, el.x)
        }

        //Заполняем все ячейки в столбце сверху от точки Y (вплодь до границы либо до ближайщей линии)
        for (let y = el.y; y > 0; y--) {
          if (field[Object.keys(field)[y]][el.x] === '|') break;
          if (field[Object.keys(field)[y]][el.x] === 'x') break;
          checkConditionToFill(y, el.x)
        }

      }
    }
  }
  return field;
}

export default bucketFill;