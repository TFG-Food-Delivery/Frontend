import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router";
import { authStatus, startGoogleSignIn } from "../../store/auth";

export const useGoogleSignIn = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { status } = useSelector((state: any) => state.auth);

    const isAuthenticating = useMemo(() => status === authStatus.checking, [status]);

    function handleGoogleSignIn() {
        dispatch(startGoogleSignIn(navigate));
    }
    return { handleGoogleSignIn, isAuthenticating };
};
