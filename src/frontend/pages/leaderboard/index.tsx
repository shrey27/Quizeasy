import './leaderboard.css';

export default function Leaderboard() {

    return <div className='xs-s'>
        <div className="score--card">
            <img
                src="https://i.pinimg.com/originals/9e/c0/22/9ec022febef292f58b484d42b67cac1a.gif"
                alt="Banner"
                className="score--banner"
            />
            <section className="score--content">
                <h1 className="card__title">Total Coins : 28</h1>
                <p className="card__content">
                    <a href="/" className="forgot">Redeem&nbsp;</a>these coins to get amazon
                    gift vouchers and amazing goodies
                </p>
            </section>
        </div>

        <div className="score--card flex-vertical sm-s">
            <h1 className="heading lg sb sm-s">LEADERBOARD</h1>
            <h1 className="heading md sb sm-s border">Your Rank : 12/1300</h1>
            <span className="alert alert--success">
                <i className="fa-solid fa-trophy"></i>Rank - 1 Jay Hopkins
            </span>

            <span className="alert alert--primary">
                <i className="fa-solid fa-medal"></i>Rank - 2 Ricky DoGato</span>
            <span className="alert alert--error">
                <i className="fa-solid fa-award"></i>Rank - 3 Rita Hayworth</span>
        </div>

        <div className="score--card flex-vertical sm-s">
            <h1 className="heading lg sb sm-s">YOUR ATTEMPTED QUIZ</h1>
            <div className="category">
                <div className="attempt__card shadow">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZHjLRNe3ocX2oz0mfkEmfrW4h9rStJx3Gow&usqp=CAU"
                        alt="Banner"
                        className="attempt__banner"
                    />
                    <section className="content flex-ct-st flex-vertical">
                        <h1 className="attempt__title">Inception</h1>
                        <h1 className="attempt__subtitle">5 questions</h1>
                        <p className="attempt__content">
                            A 2010 science fiction action film written and directed by
                            Christopher Nolan, who also produced the film with Emma Thomas,
                            his wife.
                        </p>
                        <button className="btn btn--cancel--solid sm-s sb">Check Result</button>
                    </section>
                </div>
            </div>
        </div>
    </div>
}