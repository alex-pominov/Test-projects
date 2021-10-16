import React from "react";
import Canvas from "./components/Canvas";
import CanvasDrawer from "./components/CanvasDrawer";
import text from './assets/input.txt';

function parseArgs(args) {
    return args.map(a => parseInt(a));
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canvases: []
        }
    }

    componentDidMount() {
        fetch(text)
            .then((r) => r.text())
            .then(text => {
                const commandQueue = text.split('\n').filter(Boolean).map(el => el.split(" "));
                commandQueue.forEach((c) => this.performCommand.call(this, c));
            });
    }

    performCommand(command) {
        const [commandType, ...args] = command;
        const {canvases} = this.state;
        let canvas = canvases.length ? canvases[canvases.length - 1].clone() : null;

        switch (commandType) {
            case "C":
                canvas = new Canvas(...parseArgs(args));
                break;
            case "L":
                canvas.drawLine(...parseArgs(args));
                break;
            case "R":
                canvas.drawRectangle(...parseArgs(args));
                break;
            case "B":
                const [x, y, color] = args;
                canvas.bucketFill(+x, +y, color);
                break;
            default:
                throw Error("Unknown command");
        }
        this.setState({canvases: [...canvases, canvas]});
    }

    render() {
        const {canvases} = this.state;
        return (
            <div className="App">
                {canvases.map((canvas, k) =>
                    <CanvasDrawer key={k} canvas={canvas}/>
                )}
            </div>
        )
    }
}

export default App;
