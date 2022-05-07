import "./App.css";
import { useState } from "react";

function App() {
  const def = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const [values, setValues] = useState(def);
  const [sendingStatus, setSendingStatus] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sendingStatus === false) {
      Promise.resolve(def);
      setSendingStatus(true);
      setSubmitClicked(true);
      console.log("successfully sent");
      console.log(values);
    } else if (sendingStatus === true) {
      Promise.reject(new Error("data was not sent"));
      setSendingStatus(false);
      setSubmitClicked(true);
      console.log("an error occured");
      console.log(values);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    setValues(values.filter((item) => item !== parseInt(name)));
    console.log(values);
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

      {!sendingStatus && submitClicked && <p>error: data was not sent</p>}
      {sendingStatus && submitClicked && <p>data successfully sent</p>}
    </form>
  );
}

export default App;
