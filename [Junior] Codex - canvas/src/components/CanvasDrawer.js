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

        for (let h = 0; h < height; h++) {
            const lineJsx = [];
            for (let w = 0; w < width; w++) {
                const cell = this.canvas.getCell(w, h);
                lineJsx.push(<div key={cell.getKey()} style={{width: 8, textAlign: 'center'}}>{cell.getFiller()}</div>)
            }
            canvas.push(<div key={h} style={{display: 'flex'}}>{lineJsx}</div>)
        }

        return canvas;
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
