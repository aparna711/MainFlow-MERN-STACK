import {useState} from 'react';
function Counter(){
    let [count, setCount] = useState(0);
    const incrementCount = () => {
        setCount(++count);
        console.log("Incremented count:", count);
    }
    const decrementCount = () => {
        setCount(--count);
        console.log("Decremented count:", count);
    }
    return (
        <>
        <h1>Counter App</h1>
        <p>{count}</p>
        <button onClick={incrementCount}>Increment</button>
        <br></br>
        <button onClick={decrementCount}>Decrement</button>
        <hr></hr>
        </>
    )
}

export default Counter;