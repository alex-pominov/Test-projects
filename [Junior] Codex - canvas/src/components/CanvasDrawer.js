import React from 'react';

class CanvasDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = props.canvas;
    }

    draw() {
        const canvas = [];
        const height = this.canvas.getHeight();
        const width = this.canvas.getWidth();

        for (let row = 0; row < height; row++) {
            const cells = [];
            for (let w = 0; w < width; w++) {
                const cell = this.canvas.getCell(w, row);
                cells.push(this.wrapCell(cell));
            }
            canvas.push(this.wrapLine(cells, row))
        }

        return canvas;
    }

    wrapCell(cell) {
        return <div key={cell.getKey()} style={{width: 8, textAlign: 'center'}}>{cell.getFiller()}</div>;
    }

    wrapLine(cells, row) {
        return <div key={row} style={{display: 'flex'}}>{cells}</div>;
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{margin: '10px auto 0 auto'}}>
                    {this.draw()}
                </div>
            </div>
        );
    }
}

export default CanvasDrawer;
