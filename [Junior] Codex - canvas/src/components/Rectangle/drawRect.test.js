import drawRect from './drawRect'

test('should return new object with rect', () => {
    //Создаем тестовый объект и линию
    const field = {
        1: [0, 1, 2, 3],
        2: [0, 1, 2, 3],
        3: [0, 1, 2, 3],
        4: [0, 1, 2, 3]
    };
    const rect = [1, 1, 2, 2]; // х должны стать элементы (1 - 2) во второй и третей строке
    //Создаем объект который ожидаем должна выдать функция 
    const expectedObject = {
        "1": [0, 1, 2, 3],
        "2": [0, "x", "x", 3],
        "3": [0, "x", "x", 3],
        "4": [0, 1, 2, 3]
    }
    expect(drawRect(field, rect)).toMatchObject(expectedObject);
})
