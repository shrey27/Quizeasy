import './category.css';
import { Fragment } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCategoryId, ElementObject, useAppSelector, useAppDispatch } from '../../utility';
import { Loader } from '../../components';
import { QUIZ, RESULT } from '../../routes';
import { userActions } from '../../store/userSlice';

export default function Category() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const quizData = useCategoryId(`${categoryId}`);
    const userInfo = useAppSelector(state => state.users.userInfo);
    const dispatch = useAppDispatch();
    const { quiz } = userInfo
    
    const handleAttemptQuizUpdate = (id: String) => {
        const quizObject = quiz.find((item: any) => item.quizId === id);
        dispatch(userActions.getAttemptedQuiz(quizObject))
        navigate(RESULT);
    }

    return <Fragment>
        {!quizData.length ? <Loader /> :
            <div>
                <h1 className="title categoryTitle xl sb cen">{categoryId}</h1>
                <h1 className="subtitle lg bd cen">Pick a quiz from these options</h1>
                <div className="category">
                    {quizData.map((element: ElementObject) => {
                        return <div className="card genre" key={`${element.title}`}>
                            <img
                                src={`${element.banner}`}
                                alt="Banner"
                                className="card__banner"
                            />
                            <section className="content flex-ct-st flex-vertical">
                                <h1 className="card__title">{element.title}</h1>
                                <h1 className="card__subtitle">5 questions</h1>
                                <p className="card__content">
                                    {element.description}
                                </p>
                                {quiz?.some((item: any) => item.quizId === element.id)
                                    ? <button className="btn btn--dark" onClick={() => handleAttemptQuizUpdate(element.id)}>Check Result</button>
                                    : <Link to={QUIZ + `/${element.id}`} className="btn btn--dark">
                                        Play Now</Link>}
                            </section>
                        </div>
                    })}
                </div>
            </div>}
    </Fragment>
}