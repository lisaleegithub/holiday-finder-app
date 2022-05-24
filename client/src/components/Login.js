const Login = ({user}) => {

    return (
        <nav className="login-container">
            <ul className="log-box">
                {!user ? (<li className="log-list"> <a href="/login" className="btn log-btn">▶▶Login</a></li>)
                    : (<li style={{fontStyle:"italic"}}> 
                        Hello, {user.name}!{" "}{" "}
                    <a href="/logout" style={{fontStyle:"normal"}} className="btn log-btn">▶▶Logout</a></li>)}
            </ul>
        </nav >
    )
}

export default Login;