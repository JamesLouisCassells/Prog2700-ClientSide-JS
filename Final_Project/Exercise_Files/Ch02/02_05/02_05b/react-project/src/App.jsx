import "./App.css";

function Header() {
  return (
    <header>
      <h1>Eve's Kitchen</h1>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header name="Alex" />
      <main>
        <h2>We serve the most delicious food around</h2>
      </main>
    </div>
  );
}

export default App;
