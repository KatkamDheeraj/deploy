import React, { useState } from 'react'

export default function Home() {
  let [task,setData] = useState('');
  let [tasklist, setTasks] = useState({todo: [], ongoing: [], completed: []});
  const vone = (e) => {
    setData(e.target.value);
  }
let addTask = () => {
   if(task.trim() !== '') {
    setTasks((prevTask) => ({
      ...prevTask,
      todo: [...prevTask.todo, task],
    }));
    setData('');
   }
};
   let moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTask) => {
      const updateTask = prevTask[currentCategory].filter((t) => t !== taskToMove);
      const updateTatget = [...prevTask[targetCategory],taskToMove];
      return {
        ...prevTask, [currentCategory]: updateTask, [targetCategory]: updateTatget
      };
    });
   };
   let clearTask = (category) => {
    setTasks((prevTask) => ({
      ...prevTask, [category]: []
    }));
  };
  return (
    <div className='home'>
        <form className='task-form' onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}>
        <input type='text' placeholder='Add Task....' className='task-input' value={task} onChange={vone}></input>
        <button className='task-button'>ADD TASK</button><br></br>
        <br></br>
        </form>
        <div className='task-sections'>
          <div className='task-section'>
            <h1>To-Do List</h1>
            <ul>
              {tasklist.todo.map((t, index) => (
              <li key={index}>{t}
               <button onClick={() => moveTask('todo', 'ongoing', t)} className='moveto'>Move To Ongoing</button>
               <button onClick={() => moveTask('todo','completed', t)} className='movetodo'>Move To Completed</button>
              </li>
              ))}
              </ul>
              <button className='clearbutton' onClick={() => clearTask('todo')}>Clear Task</button>
          </div>
          <div className="task-section">
            <h1>Ongoing Task</h1>
            <ul>
              {tasklist.ongoing.map((t,index) => (
              <li key={index}>{t}
              <button onClick={() => moveTask('ongoing', 'todo', t)} className='moveon'>Move To To-Do</button>
              <button onClick={() => moveTask('ongoing','completed', t)} className='moveongoing'>Move To Completed</button>
              </li>
              ))}
              </ul>
              <button className='clearbutton' onClick={() => clearTask('ongoing')}>Clear Task</button>
          </div>
          <div className="task-section">
            <h1>Completed Task</h1>
            <ul>
              {tasklist.completed.map((t,index) => (
              <li key={index}>{t}
              <button onClick={() => moveTask('completed', 'todo', t)} className='movec'>Move To To-Do</button>
              <button onClick={() => moveTask('completed','ongoing', t)} className='movecomp'>Move To Ongoing</button>
              </li>
              ))}
              </ul>
              <button className='clearbutton' onClick={() => clearTask('completed')}>Clear Task</button>
          </div>
        </div>
    </div>
  )
}
