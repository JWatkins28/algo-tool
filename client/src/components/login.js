import React, { useState } from "react";
import Auth from "../utils/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Navigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [isHover, setIsHover] = useState(false);

    const loginSubmit = async (formData, event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formData },
            });
            Auth.login(data.login.token);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="login-container">

                <div className="form-container">
                    <form onSubmit={handleSubmit(loginSubmit)}>
                        <input
                            className='loginInput'
                            {...register("username", { required: true })}
                            placeholder="username"
                        />
                        {errors.email && <small className='loginSmall'>This field is required</small>}

                        <input
                            className='loginInput'
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="password"
                        />
                        {errors.password && <small className='loginSmall'>This field is required</small>}

                        <button
                            className="loginBtn"
                            type="submit"
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            <h5>Log In</h5>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;