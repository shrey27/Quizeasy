export interface SignOutModalProps {
    setSignoutModal: Function,
    handleDispatch: Function
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
    title: String,
    description: String,
    banner: String,
    questions: Array<String>,
    answers: Array<String>,
    options: Array<OptionsObject>
}