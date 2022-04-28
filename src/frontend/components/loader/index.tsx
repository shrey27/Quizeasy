import './loader.css';
import { useTheme } from '../../context';
export function Loader() {
  const { theme } = useTheme();
  return (
    <div className='loader'>
      <img src={theme === 'light' ? 'loader_dark.gif' : 'loader_light.gif'} alt='loader' />
    </div>
  );
}
