import rootReducer from "./reducer/rootReducer";
const { configureStore } = require("@reduxjs/toolkit");
import { userApi } from './services/userApi'; // Update this path


const store = configureStore({
    reducer : {rootReducer,[userApi.reducerPath]: userApi.reducer,},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
    devtool:true
});

export default store