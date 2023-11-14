import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

function App() {
  // isDarkMode은 다크 모드의 활성화 여부, todos는 할 일 리스트, 
  // todo는 새로 추가될 할 일, category는 선택된 카테고리, 
  // categories는 카테고리 리스트, showCategoryInput은 카테고리 입력 폼의 보여짐 여부,
  // removingTodos는 삭제 중인 할 일 리스트, removingCategories는 삭제 중인 카테고리 리스트를 관리합니다.
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

   // 다크 모드 활성화 여부에 따라 다크 모드를 적용하거나 해제합니다.
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

    // 할 일 리스트와 카테고리 리스트를 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [todos, categories]);

    // 새로운 할 일을 추가하는 함수입니다.
  const addTodo = (e) => {
    e.preventDefault();

// 할 일 내용이나 카테고리가 비어 있으면 추가하지 않습니다.
    if (todo === '' || category === '') return;

    // 할 일 리스트에 새로운 할 일을 추가하고, 입력 폼을 비웁니다.
    setTodos([...todos, { text: todo, category }]);
    setTodo('');
  };

  // 새로운 카테고리를 추가하는 함수입니다.
  const addCategory = (e) => {
    e.preventDefault();

    // 카테고리가 비어 있거나 이미 존재하는 카테고리면 추가하지 않습니다.
    if (category !== '' && !categories.includes(category)) {
      setCategories([...categories, category]);
    }

    // 카테고리 입력 폼을 비우고 숨깁니다.
    setCategory('');
    setShowCategoryInput(false);
  };

  // 할 일을 삭제하는 함수입니다.
  const removeTodo = (selectedTodo) => {
    // 삭제 중인 할 일 리스트에 선택된 할 일을 추가합니다.
    setRemovingTodos([...removingTodos, selectedTodo]);

    // 애니메이션이 완료된 후에 할 일 리스트에서 선택된 할 일을 제거합니다.
    setTimeout(() => {
      setTodos(todos.filter((todo) => todo !== selectedTodo));
      setRemovingTodos(removingTodos.filter((todo) => todo !== selectedTodo));
    }, 200);
  };

  // 카테고리를 삭제하는 함수입니다.
  const removeCategory = (selectedCategory) => {
    // 삭제 중인 카테고리 리스트에 선택된 카테고리를 추가합니다.
    setRemovingCategories([...removingCategories, selectedCategory]);

    // 애니메이션이 완료된 후에 카테고리 리스트에서 선택된 카테고리를 제거합니다.
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
      <h2 className="text-2xl mb-4 text-center text-gray-900 dark:text-white">
        Todo List
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:items-end mb-4">
        <input
          className="border-2 rounded px-3 py-2 w-full text-gray-900 dark:text-white transition-colors duration-500 focus:outline-none focus:ring focus:border-blue-500"
          type="text"
          placeholder="New Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </div>
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
              className={`px-3 py-2 rounded ${
                category === _category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              } transition-colors duration-500 shadow-md mb-4`}
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
              className="border-2 rounded px-3 py-2 w-full text-gray-900 dark:text-black transition-colors duration-500 focus:outline-none focus:ring focus:border-blue-500"
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
                  className="p-2 rounded bg-gray-300 dark:bg-gray-700 transition-colors duration-500 border-2 border-gray-500 shadow-md"
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
