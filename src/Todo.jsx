// import { useState } from 'react';

import { useState } from "react";

function TodoList() {
  // const [todos, setTodos] = useState([]);
  // const todos = [];

  const [state, setState] = useState({
    todos: [],
    newTask:'',
  })
 
  // const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (event) => {
    setState({
      ...state,
      newTask:event.target.value,
    })
  }
 

  const addTask = () => {
  //   if (newTask.trim() !== '') {
  //     if (editingIndex !== null) {
  //       const updatedTodos = todos.map((todo, index) =>
  //         index === editingIndex?{task:newTask}:todo
  //       )
  //       setTodos(updatedTodos);
  //       setEditingIndex(null);
  //     } else {
  //       setTodos([...todos,{task:newTask}])
  //     }
  //     setNewTask
    //  }
    // if (newTask.trim() !== '') {
    //   // setTodos([...todos,{task:newTask}])
      
    //   todos.push(newTask);
    //  }
    // const add = todos.push(newTask);
    // const todos = [];
    if (state.newTask !== '') {
      setState({
        ...state,
        todos: [...state.todos, { task:state.newTask }],
        newTask:'',
      })
    }
   
      
  };
  
  //  const editTask = (index) => {
  //   setNewTask(todos[index].task);
  //   setEditingIndex(index);
  // }


  // const deleteTask = (index) => {
  //   setTodos(todos.filter((element, i) => i !== index));
  // };

  return (
    <div className='todo-main'>
      <div className='todo'>
        <h3>Todo List</h3>
        <div className='input-block' value={state.newTask} onChange={handleInputChange}>
          <input type="text"/>
          {/* <button onClick={addTask}>{editingIndex !== null ? 'Update' : 'Add'}</button> */}
          <button onClick={addTask}>add</button>

        </div>
        <ul>
          {state.todos.map((todo,index) => (
            <li key={index}>{todo.task}
              <div className='buttons'>
              {/* <button  onClick={() => editTask(index)}>edit</button> */}
              {/* <button className='delete' onClick={() => deleteTask(index)}>delete</button> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;




