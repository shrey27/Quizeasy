import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    userInfo: {},
    token: '',
    loader: false
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        toggleLoader(state, action) {
            state.loader = action.payload;
        },
        getUser(state, action) {
            const userInfo = action.payload
            state.userInfo = userInfo
        },
        getToken(state, action) {
            const token = action.payload
            state.token = token
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
