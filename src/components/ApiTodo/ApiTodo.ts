export const getAllTodos =  'https://jsonplaceholder.typicode.com/todos';

export const getUserAllTodos = (id: any) => {
    return `https://jsonplaceholder.typicode.com/todos?userId=${id}`
}