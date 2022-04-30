import './notfound.css';
import { Link } from 'react-router-dom';
import { LANDING } from '../../routes';

export default function NotFound() {
  return (
    <div>
      <div className='notfound'>
        <h1 className='notfound__primary'>404 Error Found!</h1>
        <img src='https://res.cloudinary.com/apollo27/image/upload/v1651348994/notfound_itgta5.gif' alt='404' className='notfound__banner' />
        <Link to={LANDING} className='btn btn--cancel--solid md sb mg--full'>
          Go back to Homepage
          <i className='fa-solid fa-right-to-bracket'></i>
        </Link>
      </div>
    </div>
  );
}
