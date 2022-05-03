import axios from "axios"
import { getUserAllTodos } from "../../components/ApiTodo/ApiTodo"

export const fetchUserTodos = (id: any) => {

    return async (dispatch: any, getState: any) => {
        const response = await axios.get(getUserAllTodos(id));
        dispatch({
            type: "FETCH_USER_TODOS",
            payload: response.data
        });
    }

};
