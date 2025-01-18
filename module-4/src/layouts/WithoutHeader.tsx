import { Outlet } from 'react-router-dom';

const WithoutHeader = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default WithoutHeader;