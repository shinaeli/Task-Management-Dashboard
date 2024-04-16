import React, { createContext, useState, useEffect } from 'react';

// A global state called "tasksContext" is created to provide data easily to all components regardless of their positions  
export const TasksContext = createContext();

// The "TasksContextProvider" is a component which ensures that the data is made available throughout the entire application
export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskEdit, setTaskEdit] = useState({
    item: {},
    edit: false
  });

  useEffect(() => {
    getTasks();
  }, []);
  
//   Get Tasks
  async function getTasks() {
    try {
      const response = await fetch('https://teachmateai-task-manager-backend.onrender.com/tasks');
      if(!response.ok) {
        throw new Error(`${response.status} Error: ${response.statusText}`);
      }
      const data = await response.json();
      setTasks([...data]);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  }

// Post A Task
  const sendTask = async (item) => {
    try {
      const response = await fetch('https://teachmateai-task-manager-backend.onrender.com/tasks', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if(!response.ok) {
        throw new Error(`${response.status} Error: ${response.statusText}`);
      }
      setTasks([item, ...tasks]);
      alert('Task added successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  // Edit task
  const updateTask = async (id, updatedTask) => {
    const response = await fetch(`https://teachmateai-task-manager-backend.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers: {  //'headers' are required whenever we are sending a json file to the server
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    });

    //This is the json file we get as a response from the server
    const data = await response.json();  

    setTasks(tasks.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

   //Set task to be updated
   const editTask = item => {
    setTaskEdit({
      item,
      edit: true
    })
  }

   // Delete Task
   const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`https://teachmateai-task-manager-backend.onrender.com/tasks/${id}`, {method: "DELETE"});
      setTasks(tasks.filter(item => item.id !== id));
    }
  };

    return (
        <TasksContext.Provider value={{tasks, sendTask, isLoading, updateTask, editTask, taskEdit, deleteTask}}>
            {children}
        </TasksContext.Provider>
    )
}