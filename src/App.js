import "./App.css";
import { useState } from "react";

function App() {
  const def = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const [values, setValues] = useState(def);
  const [sendingStatus, setSendingStatus] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [dataProcessingStatus, setDataProcessingStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitClicked(false);
    setDataProcessingStatus(true);

    if (sendingStatus === false) {
      setTimeout(() => {
        Promise.resolve(def);
        setSendingStatus(true);
        setSubmitClicked(true);
        setDataProcessingStatus(false);
        console.log("successfully sent");
      }, 2000);
    } else if (sendingStatus === true) {
      setTimeout(() => {
        Promise.reject(new Error("data was not sent"));
        setSendingStatus(false);
        setSubmitClicked(true);
        setDataProcessingStatus(false);
        console.log("an error occured");
      }, 2000);
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
      {dataProcessingStatus && <p>processing data..</p>}
    </form>
  );
}

export default App;
