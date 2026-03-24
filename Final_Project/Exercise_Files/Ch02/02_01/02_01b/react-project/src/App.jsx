import './App.css'
function Header({ name, year }) {
  return (
    <header>
      <h1>{name}'s kitchen</h1>
      <p>Copyright {year}</p>
    </header>
  );
}

function App() {
  return (<div><Header name = "Winnie" year = {new Date().getFullYear()} />
  <main>
    <h2> Yummy food</h2>
  </main></div>)
  ;

}
    

export default App
