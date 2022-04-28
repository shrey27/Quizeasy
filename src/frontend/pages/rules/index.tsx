import './rules.css';

export default function Rules() {
    return <div><h1 className="title xl sb cen">Rules of the quiz</h1>
        <div className="rules">
            <ul className="stack xs-s">
                <li className="flex-ct-st shadow xs-s rules__list">
                    <span className="sm sb"
                    ><i className="fa-solid fa-circle-chevron-right"></i> You cannot open
                        another tab while attempting the quiz</span
                    >
                </li>
                <li className="flex-ct-st shadow xs-s rules__list">
                    <span className="sm sb"
                    ><i className="fa-solid fa-circle-chevron-right"></i> Attempt all the
                        sections for cumulative score</span
                    >
                </li>
                <li className="flex-ct-st shadow xs-s rules__list">
                    <span className="sm sb"
                    ><i className="fa-solid fa-circle-chevron-right"></i> You cannot attempt
                        the quiz once it is submitted</span
                    >
                </li>
                <li className="flex-ct-st shadow xs-s rules__list">
                    <span className="sm sb"
                    ><i className="fa-solid fa-circle-chevron-right"></i> You cannot open
                        another tab while attempting the quiz</span
                    >
                </li>
                <li className="flex-ct-st shadow xs-s rules__list">
                    <span className="sm sb"
                    ><i className="fa-solid fa-circle-chevron-right"></i> You cannot attempt
                        another quiz before submitting the last quiz</span
                    >
                </li>
            </ul>
            <div className="flex-ct-ct">
                <button className="btn btn--auth--solid btn--rules sb">Start quiz</button>
                <button className="btn btn--cancel--solid btn--rules sb">Go Back</button>
            </div>
        </div></div>
}