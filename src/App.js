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
    setEditingItem(e.target.value);
  }

  const addnewItem = () => {
    if (todoitem.trim() === '') return;
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
      <header className="App-header">
        <h1>ToDo Tracker&nbsp;&nbsp;
          <i className="fa fa-check-square"></i>
        </h1>
      </header>
        <div style={{padding: '15px', backgroundColor: 'lightblue', marginBlockStart: '40px', width: '60%',
           alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: '12px'}}>
          <input style={{height:'40px', borderRadius: '8px', width: '400px' }} id = "newtodo" type="textarea" value={todoitem} onChange={updateTodo}></input>
          &nbsp;&nbsp;&nbsp;
          <button style={{height: '40px', backgroundColor: 'limegreen', borderRadius: '16px', cursor: "pointer"}} onClick={addnewItem} >Add new item</button>
        </div>
        <div style={{padding: '30px', backgroundColor: 'lightgrey', marginBlockStart: '30px', width: '50%',
           alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: '12px'}}>
            <h3 style={{color: 'Brown'}}>To do items</h3>
            <ul>
            {todos.map((item, idx) => (
              <li key={idx} style={{marginBottom:'5px', listStyleType: 'none'}}>
                <div>
                  <input type='text' 
                    disabled={editingIndex !== idx} 
                    value={editingIndex === idx ? editingItem : item} 
                    onChange={updateEditingItem}/>
                 
                    <i className="fa fa-pencil-square-o" 
                    style={{ cursor: "pointer", marginLeft: 8, height: '15px', backgroundColor: 'white' }}
                    aria-hidden="true"
                    onClick={()=> editingIndexChange(idx) }></i>
                  &nbsp;&nbsp;
                  <button style={{height: '30px', backgroundColor: 'lightblue', borderRadius: '12px', cursor: "pointer"}} hidden={editingIndex !== idx} onClick={() => updateItem(idx )}>Update</button>&nbsp;&nbsp;
                  <button style={{height: '30px', backgroundColor: 'lightgreen', borderRadius: '12px', cursor: "pointer"}} onClick={() => markAsComplete(idx)}>Mark As Complete</button>&nbsp;&nbsp;
                  <button style={{height: '30px', backgroundColor: 'lightcoral', borderRadius: '12px', cursor: "pointer"}} onClick={() => deleteItem(idx)}>Delete</button>&nbsp;&nbsp;
                </div>
              </li>
            ))}
            </ul>
        </div>
        
       
        <div style={{padding: '20px', backgroundColor: 'azure', marginBlockStart: '30px', width: '50%',
           alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: '12px'}}>
             <h3 style={{color: 'Green' }}>Completed Items</h3>
          <ul>
              {completedItems.map((item, idx) => (
                <li key={idx} style={{listStyleType: 'none', alignContent: 'center', alignItems: 'center'}}>
                  <div style={{height: '40px',  backgroundColor: 'lightgray', borderRadius: '15px'}}>
                    <span style={{textAlign: 'center'}}>{item}</span>&nbsp;&nbsp;
                    <i className="fa fa-check-circle-o"></i>
                  </div><br/>
                </li>
              ))}
          </ul>
        </div>
    </div>
  );
}

export default App;
