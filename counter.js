// STORE
var store = Redux.createStore(counter);
var counterEl = document.getElementById('counter');

function render() {
  var state = store.getState();
  counterEl.innerHTML = state.count.toString();
}

store.subscribe(render);
render();

// REDUCER
function counter(state, action) {
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