import './leaderboard.css';
import { useAppSelector, useAppDispatch, AllUser } from '../../utility';
import { useNavigate } from 'react-router-dom';
import { RESULT } from '../../routes';
import { userActions } from '../../store/userSlice';
import { Fragment, useEffect, useState } from 'react';
import { ProfileModal } from '../../components/modal/ProfileModal';

const defaultvalue = {
    userrank: 0,
    first: '',
    second: '',
    third: ''
}

export default function Leaderboard() {
    const [rank, setRank] = useState(defaultvalue);
    const [modalObject, setModalObject] = useState({ email: '', username: '' })
    const [profileModal, setProfileModal] = useState(false);
    const { userInfo, allUsers } = useAppSelector(state => state.users);
    const { quiz } = userInfo
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAttemptQuizUpdate = (id: String) => {
        const quizObject = quiz.find((item: any) => item.quizId === id);
        console.log(quizObject);
        dispatch(userActions.getAttemptedQuiz(quizObject))
        navigate(RESULT);
    }

    useEffect(() => {
        let temp: AllUser[] = [...allUsers];
        temp = temp?.sort((a: any, b: any) => b.score - a.score);

        console.log(userInfo, allUsers)

        let userrank = 0;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].username === userInfo.username) userrank = i + 1;
        }

        setRank((state: any) => ({
            ...state,
            userrank,
            first: `${temp[0]?.username}`,
            second: `${temp[1]?.username}`,
            third: `${temp[2]?.username}`,
        }))

    }, [allUsers, userInfo])

    const handleDispatch = (payload: any) => {

    }

    const handleModalOpen = () => {
        const modalObject = {
            email: userInfo.email,
            username: userInfo.username
        }
        setModalObject(modalObject);
        setProfileModal(true)
    }

    return <Fragment>
        {profileModal &&
            <ProfileModal
                setProfileModal={setProfileModal}
                handleDispatch={handleDispatch}
                modalObject={modalObject} />}
        <div className='leaderboard'>
            <div className='aspect__left'>
                <div className="profile--card">
                    <h1 className="text lg sb xs-s">PROFILE</h1>
                    <hr />
                    <div>
                        <table>
                            <tr>
                                <td>
                                    Username :
                                </td>
                                <td>
                                    {userInfo.username}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Email :
                                </td>
                                <td>
                                    {userInfo.email}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <button className='btn btn--lg btn--auth--solid  sb'
                        onClick={handleModalOpen}>UPDATE</button>
                </div>
            </div>
            <div className='aspect__right'>
                <div className="score--card">
                    <img
                        src="https://i.pinimg.com/originals/9e/c0/22/9ec022febef292f58b484d42b67cac1a.gif"
                        alt="Banner"
                        className="score--banner"
                    />
                    <section className="score--content">
                        <h1 className="card__title">
                            Total Coins : {Math.trunc(userInfo.score / 10)}
                        </h1>
                        <h1 className="card__rank">
                            {`Your Rank : ${rank.userrank}/${allUsers.length}`}
                        </h1>
                    </section>
                </div>

                <div className="score--card flex-vertical sm-s">
                    <h1 className="text lg sb sm-s">LEADERBOARD</h1>
                    <span className="alert alert--success">
                        <i className="fa-solid fa-trophy"></i>Rank - 1 {rank.first}
                    </span>

                    <span className="alert alert--primary">
                        <i className="fa-solid fa-medal"></i>Rank - 2 {rank.second}</span>
                    <span className="alert alert--error">
                        <i className="fa-solid fa-award"></i>Rank - 3 {rank.third}</span>
                </div>

                <div className="score--card flex-vertical sm-s">
                    <h1 className="text lg sb sm-s">YOUR ATTEMPTED QUIZ</h1>
                    {userInfo?.quiz?.map((e: any) => {
                        return <div className="category" key={e.title}>
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
        </div>
    </Fragment>
}