import reducer, { userActions, initialState } from "./userSlice";
const {
  toggleLoader,
  getUser,
  getToken,
  getCategoryQuiz,
  getAttemptedQuiz,
  getAllUsers,
} = userActions;

test("toggle loader", () => {
  const previousState = initialState;
  expect(reducer(previousState, toggleLoader(true))).toEqual({
    ...previousState,
    loader: true,
  });
});

test("update  userDetails", () => {
  const previousState = initialState;
  const userInfo = {
    uid: "1",
  };
  expect(reducer(previousState, getUser(userInfo))).toEqual({
    ...previousState,
    userInfo,
  });
});

test("update category Quiz", () => {
  const previousState = initialState;
  const categoryQuiz = {
    quizId: "random",
  };
  expect(reducer(previousState, getCategoryQuiz(categoryQuiz))).toEqual({
    ...previousState,
    categoryQuiz,
  });
});

test("update token", () => {
  const previousState = initialState;
  const token = "RANDOM_TOKEN";
  expect(reducer(previousState, getToken(token))).toEqual({
    ...previousState,
    token,
  });
});

test("update attempted Quiz", () => {
  const previousState = initialState;
  const attemptedQuiz = {
    quizId: "random",
  };
  expect(reducer(previousState, getAttemptedQuiz(attemptedQuiz))).toEqual({
    ...previousState,
    attemptedQuiz,
  });
});

test("update attempted Quiz", () => {
  const previousState = initialState;
  const allUsers = [
    {
      uid: "user_1",
    },
    {
      uid: "user_2",
    },
  ];
  expect(reducer(previousState, getAllUsers(allUsers))).toEqual({
    ...previousState,
    allUsers,
  });
});
