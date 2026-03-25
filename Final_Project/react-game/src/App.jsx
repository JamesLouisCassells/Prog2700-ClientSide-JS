import Game from "./Game";
//root component --this is my main ui entry point
function App() {
    return (
        <div>
            <h1>Three in a Row!</h1> //tells the page to put a heading here
            <Game /> //this makes the game render at this point
        </div>
    );
}

export default App;