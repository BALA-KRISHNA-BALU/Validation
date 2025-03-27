import MyComponent from "./ApiCalling";
import Counter from "./counter";
import Nav from "./Nav";
import App from "./props";
import TodoList from "./Todo";
// import Hoc from "./Hoc";
// import Wrapping from "./Hoc";


function DashBoard() {
  return (
    <>
      <Nav />
      <TodoList />
      <Counter />
      <MyComponent />   
      <App />
      {/* <Hoc/> */}
      {/* <Wrapping/> */}
    </>
  );
}

export default DashBoard;