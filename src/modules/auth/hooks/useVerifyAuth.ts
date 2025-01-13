import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { authStatus, checkAuth } from "../../store/auth";

export const useCheckAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { status, role } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (status === authStatus.authenticated) {
            dispatch(checkAuth());
        }
    }, []);
    return {
        status,
        role,
    };
};
