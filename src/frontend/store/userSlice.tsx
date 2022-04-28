import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    token: '',
    categoryQuiz: [],
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
        },
        getCategoryQuiz(state, action) {
            const categoryQuizObject = action.payload
            state.categoryQuiz = categoryQuizObject
        },
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
