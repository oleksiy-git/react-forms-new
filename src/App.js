import "./App.css";
import { useState } from "react";

function App() {
  const defaultArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const [values, setValues] = useState(defaultArray);
  const [count, setCount] = useState(0);
  const [dataProcessingStatus, setDataProcessingStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataProcessingStatus("fetching data...");
    setCount(count + 1);

    setTimeout(() => {
      if (count % 2) {
        Promise.resolve(values).then(
          setDataProcessingStatus("successfully sent")
        );
      } else {
        Promise.reject(new Error("data was not sent")).then(
          setDataProcessingStatus("data was not sent")
        );
      }
    }, 2000);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    setValues(values.filter((item) => item !== parseInt(name)));
  };

  return (
    <form>
      {values.map((value) => {
        return (
          <div key={value}>
            <input type="text" defaultValue={value} />
            <input
              name={value}
              type="button"
              value="Remove"
              onClick={handleRemove}
            />
          </div>
        );
      })}
      <input type="submit" onClick={handleSubmit} />

      {<p>{dataProcessingStatus}</p>}
    </form>
  );
}

export default App;
