const SignUpForm = () =>{
    return(
        <div className="">
            <h1>Sign up With your email and address</h1>
            <form onSubmit={()=>{

            }}>
                <label htmlFor="">Display Name</label>
                <input required type="text" />

                <label  htmlFor="">Email</label>
                <input required type="email" />

                <label htmlFor="">Password</label>
                <input required type="password" />

                <label htmlFor="">Confirm Password</label>
                <input required type="password" />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm