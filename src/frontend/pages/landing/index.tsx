import { HOMEPAGE } from '../../routes';
import { Link } from 'react-router-dom';
import './landing.css';
const banner: string = require("../../assets/landing.svg").default;

export default function Landing() {
    return <div>
        <main className="landing xs-s">
            <div className="landing__bnr sm-s">
                <img
                    src={banner}
                    alt="banner"
                    className="landing__bnr__img img--resp"
                />
            </div>
            <div className="landing__cnt sm-s">
                <p className="title lg heading cen xs-s">
                    <span className="lg sb">Quizeasy</span>: Let's quiz it
                </p>
                <p className="subtitle md sb cen xs-s">
                    QuizEasy is a miniature quiz taking web-app. It's simple, easy to use,
                    challenging and fun.
                </p>
                <div className="flex-ct-ct">
                    <Link to={HOMEPAGE} className="btn btn--cancel--solid md sb"
                    >Get Started</Link>
                    <a
                        href="https://github.com/shrey27/Quizeasy"
                        className="btn btn--auth md sb"
                        target='_blank'
                        rel='noreferrer'

                    >Github Link</a
                    >
                </div>
            </div>
        </main>
    </div>;
}