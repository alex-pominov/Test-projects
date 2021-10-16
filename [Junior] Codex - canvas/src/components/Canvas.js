import Cell, {HORIZONTAL_LINE_FILLER} from "./Cell";

// canvas always contains 2 borders in horizontal \ vertical axis
const CANVAS_BORDER = 2;

export default class Canvas {
    constructor(width, height, map) {
        this.width = width + CANVAS_BORDER;
        this.height = height + CANVAS_BORDER;
        this.canvasMap = map ? map : new Map();

        if (!this.canvasMap.size) this._initCanvas.call(this);
    }

    drawLine(x1, y1, x2, y2) {
        const isVertical = x1 === x2;
        const isHorizontal = y1 === y2;

        if (isVertical) {
            if (y1 > y2) [y1, y2] = this._vector(y1, y2);
            for (let y = y1; y <= y2; y++) this.markCell(x1, y);
        }

        if (isHorizontal) {
            if (x1 > x2) [x1, x2] = this._vector(x1, x2);
            for (let x = x1; x <= x2; x++) this.markCell(x, y1);
        }
    }

    drawRectangle(x1, y1, x2, y2) {
        this.drawLine(x1, y1, x2, y1); // First horizontal
        this.drawLine(x1, y1, x1, y2); // First vertical
        this.drawLine(x1, y2, x2, y2); // Second horizontal
        this.drawLine(x2, y1, x2, y2); // Second vertical
    }

    bucketFill(x, y, color) {
        const queue = [];
        queue.push(this.getCell(x, y));

        while (queue.length) {
            const cell = queue.pop();
            if (cell.isVisited() || cell.isFilled()) continue;
            cell.setBucketFiller(color);
            const [x, y] = cell.getCoords();

            // check cells in each direction
            queue.push(this.getCell(x + 1, y));
            queue.push(this.getCell(x - 1, y));
            queue.push(this.getCell(x, y + 1));
            queue.push(this.getCell(x, y - 1));
        }
    }

    markCell(x, y) {
        const cell = this.getCell(x, y);
        if (!cell.isFilled()) cell.setMarkedFiller();
    }

    _initCanvas() {
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                const isCeilFloorBorder = (h === 0 || h === this.height - 1);
                const isLeftRightBorder = (w === 0 || w === this.width - 1);
                const cellKey = w + HORIZONTAL_LINE_FILLER + h;
                this.canvasMap.set(cellKey, new Cell(w, h, isCeilFloorBorder, isLeftRightBorder));
            }
        }
    }

    getHeight = () => this.height;

    getWidth = () => this.width;

    getCell = (x, y) => this.canvasMap.get(x + HORIZONTAL_LINE_FILLER + y);

    clone() {
        const copyMap = new Map();
        for (const [key, cell] of this.canvasMap.entries()) {
            copyMap.set(key, cell.clone());
        }
        return new Canvas(this.width - CANVAS_BORDER, this.height - CANVAS_BORDER, copyMap);
    }

    _vector = (v1, v2) => ([Math.max(v1, v2), Math.max(v1, v2)]);
}


