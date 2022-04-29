import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    token: '',
    categoryQuiz: [],
    attemptedQuiz: {
        title: 'Lorem Ipsum',
        questions: ['Lorem ipsum 1', 'Lorem ipsum 2', 'Lorem ipsum 3', 'Lorem ipsum 4', 'Lorem ipsum 5'],
        answers: ['one', 'two', 'three', 'one', 'two'],
        options: [{ one: 'one1', two: 'two1', three: 'three1' }, { one: 'one2', two: 'two2', three: 'three2' }, { one: 'one3', two: 'two3', three: 'three3' }, { one: 'one4', two: 'two4', three: 'three4' }, { one: 'one5', two: 'two5', three: 'three5' }],
        attempts: ['one', 'two', 'one', 'three', 'two'],
        score: 0
    },
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
        getAttemptedQuiz(state, action) {
            const temp = action.payload
            state.attemptedQuiz = temp
        },
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
