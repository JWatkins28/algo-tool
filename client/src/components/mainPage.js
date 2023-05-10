import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import GET_ME from "../utils/queries";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const mainPage = () => {

    return (
        <>
        {!Auth.loggedIn() && <Navigate to="/login" />}
        </>
    )
}

export default mainPage;