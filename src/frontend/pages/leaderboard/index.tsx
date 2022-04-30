import './leaderboard.css';
import { useAppSelector, useAppDispatch } from '../../utility';
import { useNavigate } from 'react-router-dom';
import { RESULT } from '../../routes';
import { userActions } from '../../store/userSlice';

export default function Leaderboard() {
    const userInfo = useAppSelector(state => state.users.userInfo);
    const { quiz } = userInfo
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAttemptQuizUpdate = (id: String) => {
        const quizObject = quiz.find((item: any) => item.quizId === id);
        console.log(quizObject);
        dispatch(userActions.getAttemptedQuiz(quizObject))
        navigate(RESULT);
    }

    return <div className='xs-s'>
        <div className="score--card">
            <img
                src="https://i.pinimg.com/originals/9e/c0/22/9ec022febef292f58b484d42b67cac1a.gif"
                alt="Banner"
                className="score--banner"
            />
            <section className="score--content">
                <h1 className="card__title">Total Coins : {Math.trunc(userInfo.score / 10)}</h1>
                <h1 className="text md sb sm-s border">Your Rank : 12/1300</h1>
            </section>
        </div>

        <div className="score--card flex-vertical sm-s">
            <h1 className="text lg sb sm-s">LEADERBOARD</h1>
            <span className="alert alert--success">
                <i className="fa-solid fa-trophy"></i>Rank - 1 Jay Hopkins
            </span>

            <span className="alert alert--primary">
                <i className="fa-solid fa-medal"></i>Rank - 2 Ricky DoGato</span>
            <span className="alert alert--error">
                <i className="fa-solid fa-award"></i>Rank - 3 Rita Hayworth</span>
        </div>

        <div className="score--card flex-vertical sm-s">
            <h1 className="text lg sb sm-s">YOUR ATTEMPTED QUIZ</h1>
            {userInfo?.quiz?.map((e: any) => {
                return <div className="category">
                    <div className="attempt__card shadow">
                        <img
                            src={e.banner}
                            alt="Banner"
                            className="attempt__banner"
                        />
                        <section className="content flex-ct-st flex-vertical">
                            <h1 className="attempt__title">{e.title}</h1>
                            <h1 className="attempt__subtitle">5 questions</h1>
                            <p className="attempt__content">
                                {e.description}
                            </p>
                            <button className="btn btn--cancel--solid sm-s sb" onClick={() => handleAttemptQuizUpdate(e.quizId)}>Check Result</button>
                        </section>
                    </div>
                </div>
            })}
        </div>
    </div>
}