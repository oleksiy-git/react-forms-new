import "./App.css";
import {useState} from "react";

const defaultArray = [{alive: 10, val: 10}, {alive: 9, val: 9}, {alive: 8, val: 8}, {
    alive: 7,
    val: 7
}, {alive: 6, val: 6}, {alive: 5, val: 5}, {alive: 4, val: 4}, {alive: 3, val: 3}, {
    alive: 2,
    val: 2
}, {alive: 1, val: 1}];

function App() {

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

    const handleRemove = alive => (e) => {
        e.preventDefault();
        const index = values.map(({ alive }) => alive).indexOf(alive)
        values[index] = {
            ...values[index],
            alive: false
        }
        setValues([...values]);
    };

    return (
        <form>
            {values
                .filter(({ alive }) => alive !== false)
                .map(({ val, alive }, ) => {
                return (
                    <div key={alive}>
                        <input type="text" defaultValue={val}/>
                        <spal>{alive}</spal>
                        <input
                            type="button"
                            value="Remove"
                            onClick={handleRemove(alive)}
                        />
                    </div>
                );
            })}
            <input type="submit" onClick={handleSubmit}/>

            {<p>{dataProcessingStatus}</p>}
        </form>
    );
}

export default App;
