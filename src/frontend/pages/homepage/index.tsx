import './homepage.css';
import { Link } from 'react-router-dom';
import { CATEGORY } from '../../routes';

export default function Homepage() {

    return <div>
        <h1 className="subtitle lg sb cen sm-s">CHOOSE A CATEGORY</h1>
        <div className="category">
            <Link to={CATEGORY + '/movies'} className="card topic">
                <img
                    src="https://res.cloudinary.com/apollo27/image/upload/v1651317021/movies_og1idx.png"
                    alt="Banner"
                    className="card__banner"
                />
                <section className="content">
                    <h1 className="card__title">Movies</h1>
                    <p className="card__content">
                        A collection of quiz based on highly acclaimed movies of all time.
                    </p>
                </section>
            </Link>
            <Link to={CATEGORY + '/series'} className="card topic">
                <img
                    src="https://res.cloudinary.com/apollo27/image/upload/v1651317019/series_ou07xc.jpg"
                    alt="Banner"
                    className="card__banner"
                />
                <section className="content">
                    <h1 className="card__title">Web Series</h1>
                    <p className="card__content">
                        A collection of quiz based on mind-boggling shows of last decade.
                    </p>
                </section>
            </Link>
            <Link to={CATEGORY + '/books'} className="card topic">
                <img
                    src="https://res.cloudinary.com/apollo27/image/upload/v1651317019/books_u32csb.jpg"
                    alt="Banner"
                    className="card__banner"
                />
                <section className="content">
                    <h1 className="card__title">Books</h1>
                    <p className="card__content">
                        A collection of quiz based on the greatest books of all time.
                    </p>
                </section>
            </Link>
            <Link to={CATEGORY + '/music'} className="card topic">
                <img
                    src="https://res.cloudinary.com/apollo27/image/upload/v1651317018/music_yem6nb.webp"
                    alt="Banner"
                    className="card__banner"
                />
                <section className="content">
                    <h1 className="card__title">Music</h1>
                    <p className="card__content">
                        A collection of quiz based on top songs, music-composers, song
                        writers and lyricists of last decade.
                    </p>
                </section>
            </Link>
        </div>
    </div>;
}