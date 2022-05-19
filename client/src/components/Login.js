const Login = ({user}) => {

    return (
        <nav className="login-container">
            <ul>
                {!user ? (<li > <button className="btn log-btn"><a href="/login">Login</a></button></li>)
                    : (<li> Hello, {user.name}{" "}<button className="btn log-btn"><a href="/logout">Logout</a></button></li>)}
            </ul>
        </nav >
    )
}

export default Login;