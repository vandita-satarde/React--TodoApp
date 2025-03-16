import React from 'react'

function TodoCard({task, priority, index , onDelete}) {

    const TASK_PRIORITY_CLASS = {
        "High":"text-teal-600 border-teal-500",
        "Medium":"text-amber-600 border-amber-500",
        'Low':"text-rose-800 border-rose-700"
    };

  return (
    <div className={` border-l-6 p-2 h-15  ${TASK_PRIORITY_CLASS[priority]} flex justify-between`}>
      <div className='flex flex-col mx-1 '>
        <h1 className='text-black'>{task}</h1>
        <span className='text-[13px]'>{priority}</span>
      </div>
      <button 
        className='bg-red-700 rounded-md text-[9px] my-3.5 px-1 text-white'
        onClick={() => {
          onDelete(index);
        }}
      >Delete</button>
      
    </div>
  )
}

export default TodoCard
