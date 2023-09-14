import './App.css';
import { useEffect, useState } from "react";

function If(props) {
  return props.condition ? <>{props.children}</> : <></>;
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [packingItems, setPackingItems] = useState([]);

  const fetchData = () => {
    fetch("db.json")
    .then(data => data.json())
    .then(json => {
      setPackingItems(json.packingItems)
      setQuestions(json.questions)
    })
  }

  useEffect(fetchData, []);

  return (
    <div className="App">
      <h1>Create a packing list</h1>
      <form>
          {questions.map(q => <div><fieldset> inpu </fieldset></div> )}
      </form>
      <If condition={packingItems.length > 0}>
        {packingItems.map(item => <p>{item.name} | {item.tags.join(",")}</p>)}
      </If>
    </div>
  );
}

export default App;
