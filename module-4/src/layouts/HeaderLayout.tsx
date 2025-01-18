import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const HeaderLayout = () => {
    return (
        <>
            <Header headerTitle='ShopMart'/>
            <Outlet />
        </>
    )
}

export default HeaderLayout;