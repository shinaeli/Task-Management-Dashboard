import React, { useContext, useState } from 'react'
import Form from './components/Form'
import ReminderFilter from './components/ReminderFilter'
import RemindersList from './components/RemindersList'
import { TasksContext } from './Tasks Context/TasksContext'
import Footer from './components/Footer'

const App = () => {
  // The cretaed "TasksContext" is imported and destructured to get the value of "tasks"
  const { tasks } = useContext(TasksContext);
  
  // the default state of "selectedFilter" is set to "all"
  const [selectedFilter, setSelectedFilter] = useState("all");

const getFiltered = (itemsToFilter, status) => {
  // If "all" is selected, the array "itemsToFilter" is returned unsorted
  if(status === "all") {
    return tasks;
} else {
    // the sorted array "itemsToFilter" is returned based on the value passed to it as "status"
    const result = itemsToFilter.filter(reminder => String(reminder.isCompleted) === status);
    return result;
}
}

// 'getFiltered' function returns an array of filtered tasks based on the values passed to it as its arguments
// 'selectedFilter' can either be "all", "Pending" or "Completed"
  const filteredItems = getFiltered(tasks, selectedFilter);

  return (
    <div className='container'>
      <h2 className='platypi-bold title'>Teachmate Task Management Dashboard</h2>
      <Form />
      <ReminderFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <RemindersList filteredItems={filteredItems} />
      {(tasks.length === 0) && (<div><h2 className='title'>There is no task at the moment. Create any if needed.</h2></div>)}
      <Footer />
    </div>
  )
}

export default App