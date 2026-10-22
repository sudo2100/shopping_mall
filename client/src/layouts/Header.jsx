import {NavLink, useNavigate} from 'react-router-dom'

const Header = ({isLoggedIn, username, userRole, onLogout}) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        alert("상품 등록은 관리자만 가능합니다.");
    }

    return(
        <header className='header'>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to="/products">상품 목록</NavLink>
                <NavLink to="/products/new" onClick={handleClick}>상품 등록</NavLink>
                {userRole === "admin" && (
                    <NavLink to='/admin'>관리자</NavLink>
                )}
                {isLoggedIn ? (
                    <div className='header-user'>
                        <span>{username}님</span>
                        <button 
                            className='logout-btn'
                            onClick={() => {onLogout(); navigate('/')}}
                        >
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <NavLink to="/signin">로그인</NavLink>
                )}
                
            </nav>
        </header>
    )
}

export default Header;