import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "Increment":
      return { count: state.count + 1, showText: state.showText }
    case "ToggleShowText":
      return { count: state.count + 1, showText: !state.showText }
    default:
      return state;
      
  }
};

const ReduceExample = () => {

  const [state, dispatch] = useReducer(reducer, {count:0, showText: true });
  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "Increment" });
          dispatch({type:"ToggleShowText"})
        }}
      >click here</button>
      {state.showText && <p>this is a text</p>}
    </div>
  );
}


export default ReduceExample;