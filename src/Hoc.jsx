
// const WithBackgroundColor = (WrappedComponent) => {
//   return (props) =>{
//     return (
//       <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
//         <h1>parent component</h1>
//         <WrappedComponent {...props} />
//       </div>
//      )
//   }
// }

// const message = ({ text, name }) => {
//   return <div>
//     <h1>{text}</h1>
//     <h2>{name}</h2>
//   </div>
// }

// const Child = () => {
//   return <h2>child2</h2>
// }

// const EnhancedMessage = WithBackgroundColor(message);

// const EnhancedChild = WithBackgroundColor(Child);


// function Hoc() {
//   return <EnhancedMessage text="Hello, Cashapona!" name="bala" />;
// }

// export default Hoc;

// const Parent = ({ children }) => {
//   return (
//     <div style={{ border: "2px solid blue", padding: "20px" }}>
//       <h2>parent component</h2>
//       {children}
//     </div>
//   );
// };

// const ChildOne = () => <h3>child one</h3>;
// const ChildTwo = () => <h3>child two</h3>;

//  function Wrapping() {
//    return (
//      <Parent>
//        <ChildOne />
//        <ChildTwo/>
//     </Parent>
//   )
// }

// export default Wrapping;


// const Hoc = (WrappedComponent) => {
//   return (props) => {
//     return (
//       <div style={{ backgroundColor: "blue", padding: "20px" }}>
//         <h1>parent component</h1>
//         <WrappedComponent {...props} /> 
//       </div>
//     )
//   }
// }

// const Message = ({text}) => {
//   return <h1>{text }</h1>
// }

// const EnhancedMessage = Hoc(Message);
