import { useState } from "react";
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
    <>
      <div>
        <h2>Welcome to this beautiful restaurant!</h2>
      </div>
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
    </>
  );
}

function App() {
  const [status, setStatus] = useState(true);

  return (
    <div>
      <h1>
        The restaurant is currently{" "}
        {status ? "open" : "closed"}.
      </h1>
      <button onClick={() => setStatus(!status)}>
        {status ? "Close" : "Open"} Restaurant
      </button>
      <Header name="Alex" year={new Date().getFullYear()} />
      <Main dishes={dishObjects} />
    </div>
  );
}

export default App;
