const Login = ({user}) => {

    return (
        <nav>
            <ul>
                {/* if there is no user, bring the login. If there is, bring logout  */}
                {!user ? (<li> <a href="/login">LOGIN</a></li>)
                    : (<li> Hello, {user.nickname}<a href="/logout">LOGOUT</a></li>)}
            </ul>
        </nav >
    )
}

export default Login;