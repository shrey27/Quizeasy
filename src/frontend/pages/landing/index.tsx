import React from 'react';
import './landing.css';

export default function Landing() {
    return <div><main className="landing xs-s">
        <div className="landing__bnr sm-s">
            <img
                src="../../assets/landing.svg"
                alt="banner"
                className="landing__bnr__img img--resp"
            />
        </div>
        <div className="landing__cnt sm-s">
            <p className="title lg heading cen xs-s">
                <span className="lg sb">QuizEASY</span>: Let's quiz it
            </p>
            <p className="subtitle md sb cen xs-s">
                QuizEASY is a miniature quiz taking web-app. It's simple, easy to use,
                challenging and fun.
            </p>
            <div className="flex-ct-ct">
                <a href="../homepage/" className="btn btn--primary btn--md sb btn--flex"
                >Home</a
                >
                <a
                    href="https://github.com/shrey27/Quiz-App-NeogCamp"
                    className="btn btn--md sb btn--flex"
                >Github</a
                >
            </div>
        </div>
    </main></div>;
}