import logo from './logo.svg';
import './App.css';
import {  useState } from 'react';



function App() {  
  let [todos, setTodos] = useState([]);
  let [todoitem, setTodoItem] = useState('');
  let [editingIndex, setEditingIndex] = useState(-1);
  let [editingItem, setEditingItem] = useState('');
  let [completedItems, setCompletedItems] = useState([]);


  const updateTodo = (e) => {
    setTodoItem(e.target.value);
  }

  const updateEditingItem = (e) => {
    console.log('updateEditingItem called')
    setEditingItem(e.target.value);
  }

  let username = "";
  const addnewItem = () => {
    setTodos([...todos, todoitem]);
    setTodoItem('');
  }

  const deleteItem = (index) => {
    const newTodos = todos.filter((item, idx) => idx !== index);
    setTodos(newTodos);
  }


  const updateItem = (index) => {
    if (editingIndex === index) {
      const updatedTodos = [...todos];
    updatedTodos[index] = editingItem;
      setEditingIndex(-1);
      setEditingItem('');
      setTodos(updatedTodos);
    }
  }

  const editingIndexChange = (index) => {
    setEditingItem(todos[index])
    setEditingIndex(index);
  }

  const markAsComplete = (index) => {
    const itemToComplete = todos[index];
    setCompletedItems([...completedItems, itemToComplete]);

    const newTodos = todos.filter((item, idx) => idx !== index);
    setTodos(newTodos)
  }


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
        <div style={{padding: '30px', backgroundColor: 'lightblue', marginBlockStart: '40px', width: '60%', alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: '12px'}}>
          <input style={{height:'40px', borderRadius: '8px' }} id = "newtodo" type="textarea" value={todoitem} onChange={updateTodo}></input>
          &nbsp;&nbsp;&nbsp;
          <button style={{height: '40px', backgroundColor: 'limegreen', borderRadius: '12px'}} onClick={addnewItem} >Add new item</button>
        </div>
        <h3>To do items</h3>
        <ul>
           {todos.map((item, idx) => (
            <li key={idx}>
              <div>
                <input type='text' 
                  disabled={editingIndex !== idx} 
                  value={editingIndex === idx ? editingItem : item} 
                  onChange={updateEditingItem}/>
                <i className="fa fa-pencil-square-o" 
                  style={{ cursor: "pointer", marginLeft: 8 }}
                  aria-hidden="true"
                  onClick={()=> editingIndexChange(idx) }></i>
                <button onClick={() => updateItem(idx )}>Update</button>
                <button onClick={() => markAsComplete(idx)}>Mark As Complete</button>
                <button onClick={() => deleteItem(idx)}>Delete</button>
              </div>
            </li>
           ))}
        </ul>
        <h3>Completed Items</h3>
        <ul>
          {completedItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
    </div>
  );
}

export default App;
