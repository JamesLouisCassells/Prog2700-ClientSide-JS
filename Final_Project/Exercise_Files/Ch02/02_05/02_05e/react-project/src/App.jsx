import "./App.css";

function Header(props) {
  return (
    <header>
      <h1>{props.name}'s Kitchen</h1>
      <p>Copyright {props.year}</p>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header name="Alex" year={new Date().getFullYear()} />
      <main>
        <h2>We serve the most delicious food around</h2>
      </main>
    </div>
  );
}

export default App;
