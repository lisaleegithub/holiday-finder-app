const Login = ({user}) => {

    return (
        <nav className="login-container">
            <ul>
                {!user ? (<li> <button className="login submit-button btn btn-primary btn-sm"><a href="/login">LOGIN</a></button></li>)
                    : (<li> Hello, {user.name}{" "}<button className="logout submit-button btn btn-primary btn-sm"><a href="/logout">LOGOUT</a></button></li>)}
            </ul>
        </nav >
    )
}

export default Login;