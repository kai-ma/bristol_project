import  Menu  from '../Menu';
import { useLocation } from 'react-router-dom';


function Layout(props) {
    const location = useLocation();
    const paths = ['/', '/user','/conversations','/answerbook'];

    return (
        <div>
            <Menu
                show={paths.includes(location.pathname)}
                pathname={location.pathname}
            />
        </div>
    )
}

export default Layout;