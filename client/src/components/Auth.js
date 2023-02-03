import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Auth(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submithandler = (data) => {
        props.onLogin(data);
    };

    return (
        <form
            onSubmit={handleSubmit((data) => {
                submithandler(data);
            })}
        >
            <input {...register("email")} type="email" />

            <input {...register("password")} type="password" />
            <input
                {...register("age", { pattern: /\d+/ })}
                type="number"
            ></input>
            <button type="submit">login</button>
        </form>
    );
}
