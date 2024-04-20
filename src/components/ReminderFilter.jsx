import React from 'react'

const ReminderFilter = ({selectedFilter, setSelectedFilter}) => {
    const handleChange = e => {
        setSelectedFilter(e.target.value);
        console.log(selectedFilter);
    }


  return (
    <div className='filter-container'>
        <label className="platypi-medium">Show Items Due By Status: </label>
        <select value={selectedFilter} onChange={e => handleChange(e)}>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
            <option value="all">All</option>
        </select>
    </div>
  )
}

export default ReminderFilter