import React, { useContext, useEffect } from "react";
import UserContext from "../userContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { setUser, unsetUser } = useContext(UserContext);
    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({
        icon: "info",
        text: `You have been logged out.`,
    });

    unsetUser();

    useEffect(() => {
        setUser({
            id: null,
            isAdmin: null,
        });
    }, []);

    navigate("/");

    return (
        <>
            <h1 className="my-5 text-center">Logged out</h1>
        </>
    );
}
