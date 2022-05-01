import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {
        uid: '',
        email: '',
        quiz: [],
        username: '',
        score: 0
    },
    token: '',
    categoryQuiz: [],
    attemptedQuiz: {
        quizId: '',
        title: '',
        questions: [],
        answers: [],
        options: [{ one: '', two: '', three: '' }],
        attempts: [],
        score: 0,
        banner: '',
        description: ''
    },
    allUsers: [],
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
        getAllUsers(state, action) {
            state.allUsers = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
