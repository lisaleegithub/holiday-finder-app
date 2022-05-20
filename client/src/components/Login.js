const Login = ({user}) => {

    return (
        <nav className="login-container">
            <ul className="log-box">
                {!user ? (<li className="log-list"> <button className="btn log-btn"><a href="/login">▶▶Login</a></button></li>)
                    : (<li> 
                        {/* Hello, {user.name}{" "}<br/> */}
                    <button className="btn log-btn"><a href="/logout">▶▶Logout</a></button></li>)}
            </ul>
        </nav >
    )
}

export default Login;