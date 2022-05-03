const initialState: any = {
    todos: []
};

const todosReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "FETCH_USER_TODOS":
            return { todos: action.payload }
        case "ADD_TODO":
            return {
                todos: [action.payload, ...state.todos]
            };
        case "TOGGLE_TODO":
            return Object.assign({}, state, {
                todos: state.todos.map((todo: any) => {
                    if (todo.id === action.payload) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    };
                    return todo;
                })
            })
        default:
            return state;
    }
};

export default todosReducer;