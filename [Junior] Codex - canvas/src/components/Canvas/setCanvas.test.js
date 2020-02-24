import setCanvas from './setCanvas'

test('should return new object with rect', () => {
    //Создаем тестовый объект c координатами Х каждого элемента
    const field = [
        [{x: 0}, {x: 1}, {x: 2}, {x: 3}],
        [{x: 0}, {x: 1}, {x: 2}, {x: 3}],
        [{x: 0}, {x: 1}, {x: 2}, {x: 3}],
        [{x: 0}, {x: 1}, {x: 2}, {x: 3}]
    ];
    //Создаем ожидаем объект на выходе функции - Канвас с границами верхняя - "-" боковая - "|"
    const expectedObject = {
        "0": ["-",   "-",   "-",   "-"],
        "1": ["|", {x: 1}, {x: 2}, "|"],
        "2": ["|", {x: 1}, {x: 2}, "|"],
        "3": ["-",   "-",   "-",   "-"]
    }
    expect(setCanvas(field, 4)).toMatchObject(expectedObject);
})
