import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        userInfo: {},
        token: '',
        loader: false
    },
    reducers: {
        toggleLoader(state, action) {
            state.loader = action.payload;
        },
        getUser(state, action) {
            state.userInfo = action.payload
        },
        getToken(state, action) {
            const token = action.payload
            state.token = token
            localStorage.setItem("authToken", JSON.stringify(token));
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
