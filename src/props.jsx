const Greeting = (props) => {
  return <div>
    <h1>hello {props.name}</h1>
    <h1>{props.age}</h1>
    <h1>{props.location }</h1>
  </div>
  
};

const App = () => {
  return (
    <div>
      <Greeting name = "bala" age ={25} location ="america" />
    </div>
  );

}

export default App;