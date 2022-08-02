export interface SignOutModalProps {
    setSignoutModal: Function,
    handleDispatch: Function
}
export interface ProfileModalProps {
    setProfileModal: Function,
    handleDispatch: Function,
    modalObject: Object
}
export interface ThemeProviderProps {
    children?: React.ReactNode;
}
export interface OptionsObject {
    one: String,
    two: String,
    three: String
}
export interface ElementObject {
    id: String,
    title: String,
    description: String,
    banner: String,
    questions: Array<String>,
    answers: Array<String>,
    options: Array<OptionsObject>
}
export interface RulesProps {
    handleOnSubmit: Function
}
export interface OptionsObject {
    one: String,
    two: String,
    three: String
}export interface QuestionProps {
    question: String,
    options: OptionsObject,
    attempts: Array<String>,
    setAttempts: Function,
    index: Number,
    handleOnSubmit: Function,
    handleOnReset: Function
}

export interface AllUser {
    username: String,
    score: Number
}
