// STORE
// var store = Redux.createStore(counterReducer);
var store = Redux.createStore(Redux.combineReducers({ todoReducer: todoReducer, counterReducer: counterReducer }));
var counterEl = document.getElementById('counter');
var todoInput = document.getElementById('todo');
var todoList = document.getElementById('todoList');

function render() {
  var state = store.getState();
  counterEl.innerHTML = state.counterReducer.count.toString();
  renderList(state);
}

function renderList(state) {
  todoList.innerHTML = '';
  for (let i = 0; i < state.todoReducer.todos.length; i++) {
    var li = document.createElement('li');
    var todo = state.todoReducer.todos[i];
    li.innerHTML = todo.toString();
    todoList.appendChild(li); 
  }
}

store.subscribe(render);
render();

// REDUCER
// TODO REDUCER
function todoReducer(state, action) {
  if (typeof state === 'undefined') {
    return { todos: [] }
  }
  
  var nextState = Object.assign({}, state);

  switch (action.type) {
    case 'NEW':
      nextState.todos.push(action.payload)
      return nextState;
    case 'DELETE':
      nextState.todos.pop();
      return nextState;
    case 'DELETE_ALL':
      nextState.todos = []
      return nextState;    
    default:
      return state;
  }
}
// COUNTER REDUCER
function counterReducer(state, action) {
  if (typeof state === 'undefined') {
    return { count: 0 }
  } 

  var nextState = {
    count: state.count
  }

  switch (action.type) {
    case 'ADD':
      nextState.count = state.count + 1;
      return nextState;
    case 'MINUS':
      nextState.count = state.count - 1;
      return nextState;
    case 'RESET':
      nextState.count = 0;
      return nextState;    
    default:
      return state;
  }
}

// ACTIONS
// COUNTER
document.getElementById('add')
  .addEventListener('click', function() {
    store.dispatch({ type: 'ADD' });
  })

document.getElementById('minus')
  .addEventListener('click', function() {
    store.dispatch({ type: 'MINUS' });
  })  

document.getElementById('reset')
  .addEventListener('click', function() {
    store.dispatch({ type: 'RESET' });
  })  

//TODO
document.getElementById('new')
.addEventListener('click', function() {
  store.dispatch({ type: 'NEW', payload: todoInput.value });
})
document.getElementById('delete')
.addEventListener('click', function() {
  store.dispatch({ type: 'DELETE' });
})
document.getElementById('delete_all')
.addEventListener('click', function() {
  store.dispatch({ type: 'DELETE_ALL' });
})