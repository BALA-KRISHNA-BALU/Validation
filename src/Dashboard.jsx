import MyComponent from "./ApiCalling";
import Counter from "./counter";
import Nav from "./Nav";
import App from "./props";
import TodoList from "./Todo";
// import Hoc from "./Hoc";
// import Wrapping from "./Hoc";
import Valid from "./AppHoc";


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
      <Valid/>
    </>
  );
}

export default DashBoard;