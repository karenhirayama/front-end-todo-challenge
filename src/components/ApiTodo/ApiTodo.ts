export const getAllTodos = 'https://jsonplaceholder.typicode.com/todos';

export const getUserAllTodos = (userId: any) => {
    return `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
};

export const getAddTodo = 'https://jsonplaceholder.typicode.com/todos';

export const patchTodo = (id: any) => {
    return `https://jsonplaceholder.typicode.com/todos/${id}`
};