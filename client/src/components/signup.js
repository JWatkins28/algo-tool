import React, { useState } from "react";
import Auth from "../utils/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signup, { error, data }] = useMutation(ADD_USER);
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
          const { data } = await signup({
            variables: {
              username: formData.email,
              password: formData.password,
            },
          });
          console.log(data)
          Auth.login(data.addUser.token);
          navigate('/main');
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <>
            <div className="login-container">

                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <h5>Sign Up</h5>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;