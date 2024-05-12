import React, { useState, useEffect } from 'react';
import './css.css'; 



function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
<div>
  
      <div className='cun'>
                <h2 >Task List</h2>
              <div className='row'>
                    <input
                      type="text"
                      value={newTask}
                      onChange={handleInputChange}
                      placeholder="Add new task :"
                    />
                    <button onClick={handleAddTask}>Add</button>
               </div>

              <ul className='uls'>
              {tasks.map(task => (
                <li key={task.id}>
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                  </span>
                  <button className='del' onClick={() => handleDeleteTask(task.id)}><i class="fa-solid fa-trash"></i></button>
                  <button className='mar' onClick={() => toggleTaskCompletion(task.id)}>
                    {task.completed ? 'Incompleted' : 'Completed'}
                  </button>
                </li>
              ))}
            </ul>
      </div>

</div>



  );
}

export default TaskList;