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
        const isVertical = y1 !== y2;
        const isHorizontal = x1 !== x2;

        if (isVertical) {
            if (y1 > y2) [y1, y2] = this._swap(y1, y2);
            for (let y = y1; y <= y2; y++) {
                const cell = this.getCell(x1, y);
                if (!cell.isFilled()) cell.setMarkedFiller();
            }
        } else if (isHorizontal) {
            if (x1 > x2) [x1, x2] = this._swap(x1, x2);
            for (let x = x1; x <= x2; x++) {
                const cell = this.getCell(x, y1);
                if (!cell.isFilled()) cell.setMarkedFiller();
            }
        }
    }

    drawRectangle(x1, y1, x2, y2) {
        this.drawLine(x1, y1, x2, y1); // First horizontal
        this.drawLine(x1, y1, x1, y2); // First vertical
        this.drawLine(x1, y2, x2, y2); // Second horizontal
        this.drawLine(x2, y1, x2, y2); // Second vertical
    }

    bucketFill(x, y, c) {
        this._bucketFill(this.getCell(x, y), c);
    }

    // TODO: can be replaced with while loop for large canvases
    _bucketFill(cell, color) {
        if (cell.isVisited()) return;
        if (!cell.isFilled()) {
            cell.setBucketFiller(color);
            const [x, y] = cell.getCoords();

            // run recursively in each direction
            this._bucketFill(this.getCell(x + 1, y), color);
            this._bucketFill(this.getCell(x - 1, y), color);
            this._bucketFill(this.getCell(x, y + 1), color);
            this._bucketFill(this.getCell(x, y - 1), color);
        }
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

    _swap(v1, v2) {
        let temp = v1;
        v1 = v2;
        v2 = temp;
        return [v1, v2];
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
}


