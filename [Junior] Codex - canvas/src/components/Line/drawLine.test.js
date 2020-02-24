import drawLine from './drawLine'

test('should return new object with line ', () => {
    //Создаем тестовый объект и линию
    const field = {1: [0, 1, 2, 3], 2:[0, 1, 2, 3]};
    const line = [1, 1, 2, 2]; // х должны стать элементы (1 - 2) во второй строке
    //Создаем объект который ожидаем должна выдать функция 
    const expectedObject = {"1": [0, 1, 2, 3], "2": [0, "x", "x", 3]}
    expect(drawLine(field, line)).toMatchObject(expectedObject);
})
