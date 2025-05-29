import React, { useEffect } from 'react'
import { useState } from 'react'
import TodoCard from './assets/TodoCard'
import toast,{Toaster} from 'react-hot-toast'

function App() {

  const[todoItem, setTodoItem] = useState({
    task:"",
    priority:"High",
  })

  const [todoList, setTodoList] = useState([]);
  const [selectedTab, setSelectedTab] = useState ("High")

  // Save list to LS on every change
  useEffect (() => {
    if(todoList.length == 0)
      return;

    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList])

  // Load list from LS on render
  useEffect(() => {
    const listFromLS = JSON.parse(localStorage.getItem("todoList")||"[]")
    setTodoList(listFromLS);
  },[])

  const onDelete = (index) => {
    const listAfterDeletion = todoList.filter((tab,i) => i!= index)
    setTodoList(listAfterDeletion);
  }

  return (
    <div className='bg-gray-300 min-h-screen flex flex-col md:flex-row justify-between'>
      <div className='w-full md:w-2/3'>
        <h1 className='text-center text-[28px] md:text-[52px] p-6 md:p-15 font-bold text-gray-800'>Any.Task</h1>

        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-row md:flex-col border-slate-400 w-full md:w-auto justify-center md:justify-start'>
            {["All", "High", "Medium", "Low"].map((tab,i) => {
              return (
                <span 
                  className={`block text-base md:text-xl text-center rounded-lg my-2 md:my-5 mx-2 md:mx-0 py-1
                    ${tab == selectedTab ? 'bg-slate-400 text-white' : 'bg-white'} `}
                  key={i}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </span>
              );
            })}
          </div>
          <div className='m-2 md:m-5 w-full md:w-[800px]'>
            {todoList.map((taskItem, index) => {
              const {task, priority} = taskItem;

              if(selectedTab != "All" && priority != selectedTab){
                return null;
              }

              return(
              <TodoCard
                task={task}
                priority={priority}
                key={index}
                index={index}
                onDelete={onDelete}
              />
              )
            })}
          </div>
        </div>
      </div>

      <div className='bg-gray-500 w-full md:w-1/3 h-auto md:h-[729px] flex flex-col justify-center'>
        <div className='flex flex-col m-6 md:m-20'>
          <input 
            type='text'
            onChange={(e) => {
              setTodoItem({
                ...todoItem,
                task : e.target.value
              })
            }}
            value={todoItem.task}
            className='bg-white mb-6 md:mb-10 rounded-md text-[12px] md:text-xl h-[40px] md:h-[55px] focus:outline-none px-2'
            placeholder='Enter Task'
          />

          <select 
            className='text-[12px] md:text-xl bg-white md:px-5 md:py-2 rounded-md h-[40px] md:h-[50px]'
            onChange={(e) => {
              setTodoItem({
                  ...todoItem,
                  priority : e.target.value
              })
            }}
            value={todoItem.priority}
          >
            <option value={""}>Select priority</option>
            <option value={"High"}>High</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Low"}>Low</option>
          </select>
        </div>

        <button 
          className='text-[12px] md:text-xl text-gray-300 bg-gray-800 py-3 md:py-4 rounded-md mx-6 md:mx-20 mb-6 md:mb-0'
          onClick={() => {

            if(!todoItem.task){
              toast.error('Please Enter Task')
              return;
            }
            else if(!todoItem.priority){
              toast.error('Please Enter Priority')
              return;
            }
            else if(!todoItem.task || !todoItem.priority){
              toast.error('Please Enter Task & Priority')
              return;
            }
        
            setSelectedTab("All")

            setTodoList([todoItem, ...todoList]);
            setTodoItem({
              task:"",
              priority:""
            });  

            toast.success("Task Added Succesfully")
          }}
        >
          Add
        </button>
      </div>

      <Toaster/>
      
    </div>
  )
}

export default App
