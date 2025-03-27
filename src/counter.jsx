import { useEffect, useState } from "react";


function Counter() {
  // const [count, setCount] = useState(0);
  // const [isRunning, setIsRunning] = useState(false)

  const [state, setState] = useState({
    count: 0,
    isRunning: false,
  })

  let timer;
  useEffect(() => {
    if (state.isRunning) {
      timer = setInterval(() => {
        setState((prevCount) => ({
          ...state,
          count: prevCount.count + 1,
        }))
        // setCount((count) => count + 1)
      }, 1000);
    }
    return () => clearInterval(timer)

  }, [state.isRunning]);

  const start = () => {
    // setIsRunning(true);
    setState({
      ...state,
      isRunning: true,
    })
  }

  const stop = () => {
    // setIsRunning(false)
    setState({
      ...state,
      isRunning: false,
    })
  }

  const Restart = () => {
    // setCount(0);
    // setIsRunning(true);
    setState({
      ...state,
      // count: 0,
      isRunning: true,

    })
  }

  return (
    <div className="counter-main">
      <div className="counter-app">
        <h2>Counter</h2>
        <h1>{state.count}</h1>
        <div className="buttons">
          <button onClick={start}>start</button>
          <button className="stop" onClick={stop}>stop</button>
          <button className="restart" onClick={Restart}>Resume</button>
        </div>

      </div>
    </div>

  );


}

export default Counter;