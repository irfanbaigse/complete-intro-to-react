import React from 'react';
import {
    render
} from "react-dom";
import Pet from './Pet';


// class components
class App extends React.Component {
    handleTitleClick() {
        alert("you clicked the title");
    }
    render() {
        return React.createElement("div", {}, [
            React.createElement(
                "h1", {
                    onClick: this.handleTitleClick
                },
                "Adopt Me!"
            ),
            React.createElement(Pet, {
                name: "Luna",
                animal: "Dog",
                breed: "Havanese"
            }),
            React.createElement(Pet, {
                name: "Peeper",
                animal: "Bird",
                breed: "Cockteil"
            }),
            React.createElement(Pet, {
                name: "Any dog",
                animal: "Dog",
                breed: "Mix"
            })
        ]);
    }
}

render(React.createElement(App), document.getElementById("root"));