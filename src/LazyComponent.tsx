import './App.css';
import { availableRoutes } from './frontend/routes';

function LazyComponent() {
    return (
        <div>
            {availableRoutes}
        </div>
    );
}

export default LazyComponent;