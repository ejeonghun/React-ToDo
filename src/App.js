import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [todo, setTodo] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem('categories')) || ['To-do']
  );
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [removingTodos, setRemovingTodos] = useState([]);
  const [removingCategories, setRemovingCategories] = useState([]);

  useEffect(() => {
    const classList = document.querySelector('html').classList;
    if (isDarkMode) {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (category === '') setCategory('To-do');
  }, []); // 초기 "To-do" 카테고리 선택

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [todos, categories]);

  const addTodo = (e) => {
    e.preventDefault();

    if (todo === '' || category === '') return;

    setTodos([...todos, { text: todo, category }]);
    setTodo('');
  };

  const addCategory = (e) => {
    e.preventDefault();

    if (category !== '' && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
    setCategory('');
    setShowCategoryInput(false);
  };

  const removeTodo = (selectedTodo) => {
    setRemovingTodos([...removingTodos, selectedTodo]);
    setTimeout(() => {
      setTodos(todos.filter((todo) => todo !== selectedTodo));
      setRemovingTodos(removingTodos.filter((todo) => todo !== selectedTodo));
    }, 200);
  };

  const removeCategory = (selectedCategory) => {
    setRemovingCategories([...removingCategories, selectedCategory]);
    setTimeout(() => {
      setCategories(categories.filter((category) => category !== selectedCategory));
      setRemovingCategories(removingCategories.filter((category) => category !== selectedCategory));
    }, 200);
  };


  return (
    <div className="h-screen flex flex-col items-center justify-start p-6 bg-gray-200 dark:bg-gray-800 transition-colors duration-500">
      <div className="absolute top-3 right-3">
        {/* <button
          className="px-3 py-2 rounded bg-gray-500 text-white"
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          Toggle Dark Mode
        </button> */}
        <label for="theme" class="theme">
	  <span class="theme__toggle-wrap">
      <input id="theme" class="theme__toggle" type="checkbox" role="switch" name="theme" value="dark" onClick={() => setIsDarkMode(!isDarkMode)}/>
      <span class="theme__fill"></span>
      <span class="theme__icon">
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
        <span class="theme__icon-part"></span>
      </span>
    </span>
  </label>
      </div>
      <form onSubmit={addTodo} className="w-full max-w-3xl">
        <h2 className="text-2xl mb-4 text-center text-gray-900 dark:text-white">Todo List</h2>
        <div className="flex flex-col md:flex-row gap-4 md:items-end mb-4">
          <input
            className="border-2 rounded px-3 py-2 w-full text-gray-900 dark:text-white transition-colors duration-500 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="New Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <h3>Categories: </h3>
            {categories.map((_category, index) => (
              <Transition
              appear={true}
              show={!removingCategories.includes(_category)}
              enter="transform transition ease-in-out duration-700"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="transform duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              key={index}
            >
                <button
                  className={`px-3 py-2 rounded ${category === _category ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'} transition-colors duration-500 shadow-md`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory(_category);
                  }}
                >
                  {_category}
                </button>
                <button
                    className="text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      removeCategory(_category);
                    }}
                  >
                    &nbsp;x
                  </button>
              </Transition>
            ))}
          </div>
        </div>
        <hr className="border-b-2 border-blue-500 mb-4 animate-pulse" />
        <div className="flex gap-4 mb-4">
          <button className="px-3 py-2 rounded bg-blue-500 text-white shadow-md" type="submit">
            Add Todo
          </button>
          <button
            className="px-3 py-2 rounded bg-blue-500 text-white shadow-md"
            type="button"
            onClick={() => setShowCategoryInput(!showCategoryInput)}
          >
            Add Category
          </button>
        </div>
        {showCategoryInput && (
          <div className="flex gap-4 mb-4">
            <input
              className="border-2 rounded px-3 py-2 w-full text-gray-900 dark:text-white transition-colors duration-500 focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              placeholder="New Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              className="px-3 py-2 rounded bg-blue-500 text-white transition-colors duration-500"
              onClick={addCategory}
            >
              Confirm
            </button>
          </div>
        )}
      </form>
      <div className="w-full max-w-3xl mt-4">
        {categories.map((_category, index) => (
          <div key={index} className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{_category}</h3>
            <hr className='h-px my-3 bg-black border-0 dark:bg-gray-700'/>
            <div className="flex flex-wrap gap-2 items-start">
              {todos.filter((todo) => todo.category === _category).map((todo, index) => (
                <Transition
                appear={true}
                show={!removingTodos.includes(todo)}
                enter="transform transition ease-in-out duration-700"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transform duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                key={index}
              >
                <div
                  key={index}
                  className="p-2 rounded bg-gray-200 dark:bg-gray-700 transition-colors duration-500 border-2 border-blue-500 shadow-md"
                >
                  
                  {todo.text}
                  <button
                    className="text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      removeTodo(todo);
                    }}
                  >
                    &nbsp;×
                  </button>
                </div>
                </Transition>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;