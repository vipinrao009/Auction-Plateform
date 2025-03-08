import {createSlice,} from "@reduxjs/toolkit"
import axios from "axios"
import {toast} from "react-toastify"

const initialState = {
    loading:false,
    isAuthenticated:false,
    user:{},
    leaderboard: [],
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers :{
        registerRequest(state, action){
            state.loading = true,
            state.isAuthenticated=false,
            state.user = {}
        },
        registerSuccess(state, action){
            state.loading = false,
            state.isAuthenticated=true,
            state.user = action.payload.user
        },
        registerFailed(state, action){
            state.loading = false,
            state.isAuthenticated=false,
            state.user = {}
        },
        loginRequest(state, action){
            state.loading = true,
            state.isAuthenticated=false,
            state.user = {}
        },
        loginSuccess(state, action){
            state.loading = false,
            state.isAuthenticated=true,
            state.user = action.payload
        },
        loginFailed(state, action){
            state.loading = false,
            state.isAuthenticated=false,
            state.user = {}
        },
        logoutSuccess(state, action){
            state.isAuthenticated = false,
            state.user = {}
        },
        logoutFailed(state, action){
            state.loading = false,
            state.isAuthenticated = state.isAuthenticated,
            state.user = state.user
        },
        clearAllErrors(state, action){
            state.user = state.user;
            state.isAuthenticated = state.isAuthenticated;
            state.leaderboard = state.leaderboard;
            state.loading = false
        }
    }
})

export const register = (data)=>async(dispatch)=>{
    dispatch(userSlice.actions.registerRequest())
    try {
        const res = await axios.post(
            "http://localhost:5000/api/v1/user/register",
            data,
            {
                withCredentials:true,
                headers: {"Content-Type":"multipart/from-data"}
            }
        )
        dispatch(userSlice.actions.registerSuccess())
        toast.success(res.data.message)
        dispatch(userSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(userSlice.actions.registerFailed())
        toast.error(error.res.data.message)
        dispatch(userSlice.actions.clearAllErrors())
    }
}



export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res.data.user)
    dispatch(userSlice.actions.loginSuccess(res.data.user)); // Send user data
    toast.success(res.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);

    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response?.data?.message || "Failed to login");
    dispatch(userSlice.actions.clearAllErrors());
  }
};


export const logout = ()=>async(dispatch)=>{
    try {
        const  res = await axios.get("",{withCredentials : true})
        dispatch(userSlice.actions.logoutSuccess())
        toast.success(res.data.message)
        dispatch(userSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed());
        toast.error(error.res.data.message)
        dispatch(userSlice.actions.clearAllErrors())

    }
}

export default userSlice.reducer