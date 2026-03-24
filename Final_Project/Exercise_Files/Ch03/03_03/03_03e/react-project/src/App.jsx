import "./App.css";
import chef from "./images/chef.jpg";

function Header({ name, year }) {
  return (
    <header>
      <h1>{name}'s Kitchen</h1>
      <p>Copyright {year}</p>
    </header>
  );
}
const items = [
  "Macaroni and Cheese",
  "Salmon with Potatoes",
  "Tofu with Vegetables",
  "Minestrone Soup"
];

const dishObjects = items.map((dish, i) => ({
  id: i,
  title: dish
}));

function Main({ dishes }) {
  return (
    <main>
      <img
        src={chef}
        height={200}
        alt="A photo of a smiling chef owner"
      />
      <ul>
        {dishes.map((dish) => (
          <li
            key={dish.id}
            style={{ listStyleType: "none" }}
          >
            {dish.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

function App() {
  return (
    <div>
      <Header name="Alex" year={new Date().getFullYear()} />
      <Main dishes={dishObjects} />
    </div>
  );
}

export default App;
