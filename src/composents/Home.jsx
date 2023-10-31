import React, { useState, useEffect } from 'react';
import Icon from '../icon/4812459.png';
import Icon2 from '../icon/free-check-mark-icon-3279-thumb.png';

export default function Home() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTaskList(storedTasks.split(','));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', taskList.join(','));
  }, [taskList]);

  const handleAddTask = () => {
    if (task) {
      setTaskList([...taskList, task]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks.splice(index, 1);
    setTaskList(updatedTasks);
  };
  

  const TodoItem = ({ text, index }) => {
    return (
      <div className='box'>
        <div className='info'>
          <div className='text'>
            <p>{text}</p>
          </div>
          <button className='check'>
            <img src={Icon2} alt="check" className='icheck' onClick={() => handleDeleteTask(index)}/>
          </button>
          <button className='poubelle'>
            <img src={Icon} alt="poubelle" className='ipoubelle' onClick={() => handleDeleteTask(index)} />
          </button>
        </div>
      </div>
    );
  };
  

  return (
    <div className='main'>
      <div className='contenaire'>
        <h2>Todo List</h2>
        <div className='ajouter'>
          <input type="text" className='todo' value={task} onChange={(e) => setTask(e.target.value)} />
          <input type="submit" value="Add" className='validez' onClick={handleAddTask} />
        </div>

        <div className='list'>
          <div className='box'>
            {taskList.map((text, index) => (
              <TodoItem key={index} text={text} index={index}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

