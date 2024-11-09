import Main from '../main';
import './app.css';
import { GenreProvider } from '../context/context';

export default function App() {
    return (
        <GenreProvider>
            <Main className='main' />
        </GenreProvider>
    )
}