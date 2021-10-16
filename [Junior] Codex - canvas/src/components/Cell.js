export const HORIZONTAL_LINE_FILLER = "-";
const VERTICAL_LINE_FILLER = "|";
const EMPTY_LINE_FILLER = " ";
const MARKED_LINE_FILLER = "x";

export default class Cell {
    constructor(x, y, isCeilFloorBorder, isLeftRightBorder, visited, filler) {
        this.x = x;
        this.y = y;

        this.isCeilFloorBorder = isCeilFloorBorder;
        this.isLeftRightBorder = isLeftRightBorder;
        this.visited = isCeilFloorBorder || isLeftRightBorder || visited;

        if (filler) {
            this.filler = filler;
        } else if (isCeilFloorBorder) {
            this.filler = HORIZONTAL_LINE_FILLER;
        } else if (isLeftRightBorder) {
            this.filler = VERTICAL_LINE_FILLER;
        } else {
            this.filler = EMPTY_LINE_FILLER;
        }
    }

    getCoords = () => ([this.x, this.y]);

    getKey = () => this.x + HORIZONTAL_LINE_FILLER + this.y;

    isBorder = () => this.isCeilFloorBorder || this.isLeftRightBorder;

    isVisited = () => this.visited;

    isFilled = () =>  this.filler !== EMPTY_LINE_FILLER || this.isBorder();

    getFiller = () => this.filler;

    setMarkedFiller() {
        this.visited = true;
        this.filler = MARKED_LINE_FILLER;
    }

    setBucketFiller(filler) {
        this.visited = true;
        this.filler = filler;
    }

    clone = () => new Cell(this.x, this.y, this.isCeilFloorBorder, this.isLeftRightBorder, this.visited, this.filler);
}
