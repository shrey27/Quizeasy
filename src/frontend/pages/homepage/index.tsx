import './homepage.css';
import { Link } from 'react-router-dom';
import { CATEGORY } from '../../routes';

export default function Homepage() {

    return <div>
        <h1 className="subtitle lg sb cen sm-s">CHOOSE A CATEGORY</h1>
        <div className="category">
            <Link to={CATEGORY + '/movies'} className="card topic">
                <img
                    src="https://images2.minutemediacdn.com/image/upload/c_crop,h_717,w_1276,x_0,y_291/v1617807217/shape/mentalfloss/645243-uncommongoods-tim-aurelia-sanders-movie-critic-imdb-poster-details.png?itok=Qc8dJkLc"
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
                    src="https://blog.ezeonsoft.com/wp-content/uploads/2020/12/dce16bb609d832b10a2ba4daf2c6cc0b1.jpg"
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPCSoCyv3EUZgM8jNNpo51gjwfEA9cNoF-w-m2ouqzFZRnPBDX5hxvJVVBr438xFEl3Y&usqp=CAU"
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
                    src="https://rukminim1.flixcart.com/image/416/416/kb5eikw0/poster/v/p/k/large-music-posters-for-room-set-of-6-best-music-posters-vintage-original-imafskknrpzzfcpq.jpeg?q=70"
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