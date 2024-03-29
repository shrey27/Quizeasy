import "./leaderboard.css";
import { useAppSelector, useAppDispatch, AllUser } from "../../utility";
import { useNavigate } from "react-router-dom";
import { LANDING, RESULT } from "../../routes";
import { userActions, AttemptedQuizObject } from "../../store/userSlice";
import { Fragment, useEffect, useState } from "react";
import { ProfileModal } from "../../components/modal/ProfileModal";
import { updateEmailPassword } from "../../service/userActions";
import { Loader } from "../../components";
import { useTheme } from "../../context";

const defaultvalue = {
  userrank: 0,
  first: "",
  second: "",
  third: "",
};
const formDefault = {
  email: "",
  username: "",
  password: "",
  newpassword: "",
};

export default function Leaderboard() {
  const [rank, setRank] = useState(defaultvalue);
  const [modalObject, setModalObject] = useState({ email: "", username: "" });
  const [profileModal, setProfileModal] = useState(false);
  const { userInfo, allUsers, loader } = useAppSelector((state) => state.users);
  const { quiz } = userInfo;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const handleAttemptQuizUpdate = (id: String) => {
    const quizObject = quiz.find(
      (item: typeof AttemptedQuizObject) => item.quizId === id
    );
    dispatch(userActions.getAttemptedQuiz(quizObject));
    navigate(RESULT);
  };

  useEffect(() => {
    let temp: AllUser[] = [...allUsers];
    temp = temp?.sort((a: AllUser, b: AllUser) => +b.score - +a.score);
    let userrank = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].username === userInfo.username) userrank = i + 1;
    }
    setRank((state: typeof defaultvalue) => ({
      ...state,
      userrank,
      first: `${temp[0]?.username}`,
      second: `${temp[1]?.username}`,
      third: `${temp[2]?.username}`,
    }));
  }, [allUsers, userInfo]);

  const handleDispatch = (profileObject: typeof formDefault) => {
    dispatch(
      updateEmailPassword(
        userInfo.uid,
        profileObject,
        userInfo,
        navigate,
        LANDING,
        theme
      )
    );
    setProfileModal(false);
  };

  const handleModalOpen = () => {
    const modalObject = {
      email: userInfo.email,
      username: userInfo.username,
    };
    setModalObject(modalObject);
    setProfileModal(true);
  };

  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <>
          {profileModal && (
            <ProfileModal
              setProfileModal={setProfileModal}
              handleDispatch={handleDispatch}
              modalObject={modalObject}
            />
          )}
          <div className="leaderboard">
            <div className="aspect__left">
              <div className="profile--card">
                <h1 className="text lg sb xs-s">PROFILE</h1>
                <hr />
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Username :</td>
                        <td>{userInfo.username}</td>
                      </tr>
                      <tr>
                        <td>Email :</td>
                        <td>{userInfo.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  className="btn btn--lg btn--auth--solid  sb"
                  onClick={handleModalOpen}
                >
                  UPDATE
                </button>
              </div>
            </div>
            <div className="aspect__right">
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
                  <i className="fa-solid fa-trophy"></i>Rank - 1{" "}
                  {rank.first === "undefined" ? "Mark Twain" : rank.first}
                </span>

                <span className="alert alert--primary">
                  <i className="fa-solid fa-medal"></i>Rank - 2{" "}
                  {rank.second === "undefined" ? "Jane Watson" : rank.second}
                </span>

                <span className="alert alert--error">
                  <i className="fa-solid fa-award"></i>Rank - 3{" "}
                  {rank.third === "undefined" ? "Jane Doe" : rank.third}
                </span>
              </div>

              <div className="score--card flex-vertical sm-s">
                <h1 className="text lg sb sm-s">YOUR ATTEMPTED QUIZ</h1>
                {userInfo?.quiz?.map((e: typeof AttemptedQuizObject) => {
                  return (
                    <div className="category" key={e.title}>
                      <div className="attempt__card shadow">
                        <img
                          src={e.banner}
                          alt="Banner"
                          className="attempt__banner"
                        />
                        <section className="content flex-ct-st flex-vertical">
                          <h1 className="attempt__title">{e.title}</h1>
                          <h1 className="attempt__subtitle">5 questions</h1>
                          <p className="attempt__content">{e.description}</p>
                          <button
                            className="btn btn--cancel--solid sm-s sb"
                            onClick={() => handleAttemptQuizUpdate(e.quizId)}
                          >
                            Check Result
                          </button>
                        </section>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}
