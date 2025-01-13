import { logoutFirebase, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, clearError, login, logout, registering, updateProfilePhoto } from "./authSlice";
import { RegisterCustomerProperties } from "./types/registerCustomer";
import { LoginProperties, RegisterCourierProperties, RegisterRestaurantProperties } from "./types";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router";
import { authAPI } from "../../api";

export const startGoogleSignIn = (navigate: NavigateFunction) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (result.isNewUser) {
            dispatch(registering(result));
            navigate("/auth/register?form=customer");
            return;
        }
        if (!result.ok) return dispatch(logout(result.errorMessage));
        if (result.idToken) {
            Cookies.set("authToken", result.idToken, { expires: 1 });
        } else {
            dispatch(logout("Failed to retrieve idToken"));
        }
        dispatch(login(result));
    };
};

export const startLoginNativeUser = ({ email, password }: LoginProperties) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        let ok = false;
        // Call the API to create a new user
        const resp = await authAPI
            .post("/login", { email, password })
            .then((response) => {
                ok = true;
                return response.data.user;
            })
            .catch((error) => {
                ok = false;
                if (error.response) {
                    return error.response.data;
                } else if (error.request) {
                    return { message: "No response from server, please try again later" };
                } else {
                    // Algo paso al preparar la petición que lanzo un Error
                    return { message: "An error occurred while setting up the request" };
                }
            });

        if (!ok) {
            dispatch(logout({ errorMessage: resp }));
            return ok;
        }
        const { id: uid, image: photoURL, name: displayName, role: role } = resp;

        dispatch(login({ uid, email, displayName, photoURL, role }));
        return ok;
    };
};

export const startCreatingNativeCustomerUser = (registerCustomerProps: RegisterCustomerProperties) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        let ok = false;
        // Call the API to create a new user
        const resp = await authAPI
            .post("/register/customer", registerCustomerProps)
            .then((response) => {
                ok = true;
                return response.data.user;
            })
            .catch((error) => {
                ok = false;
                if (error.response) {
                    return error.response.data;
                } else if (error.request) {
                    return error.request;
                } else {
                    // Algo paso al preparar la petición que lanzo un Error
                    return error.message;
                }
            });

        if (!ok) {
            dispatch(logout({ errorMessage: resp }));
            return resp;
        }
        const { id: uid, email, name: displayName, image: photoURL, role } = resp;
        dispatch(login({ uid, email, displayName, photoURL, role }));
        return null;
    };
};

export const startCreatingNativeRestaurantUser = (registerRestaurantProps: RegisterRestaurantProperties) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        let ok;

        const resp = await authAPI
            .post("/register/restaurant", registerRestaurantProps)
            .then((response) => {
                ok = true;
                return response.data.user;
            })
            .catch((error) => {
                ok = false;
                if (error.response) {
                    return error.response.data;
                } else if (error.request) {
                    return error.request;
                } else {
                    // Algo paso al preparar la petición que lanzo un Error
                    return error.message;
                }
            });

        if (!ok) {
            dispatch(logout({ errorMessage: resp }));
            return resp;
        }
        const { id: uid, email, name: displayName, image: photoURL, role: role } = resp;
        dispatch(login({ uid, email, displayName, photoURL, role }));
        return null;
    };
};

export const startCreatingNativeCourierUser = (registerCourierProps: RegisterCourierProperties) => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        let ok;

        const resp = await authAPI
            .post("/register/courier", registerCourierProps)
            .then((response) => {
                ok = true;
                return response.data.user;
            })
            .catch((error) => {
                ok = false;
                if (error.response) {
                    return error.response.data;
                } else if (error.request) {
                    return error.request;
                } else {
                    // Algo paso al preparar la petición que lanzo un Error
                    return error.message;
                }
            });

        if (!ok) {
            dispatch(logout({ errorMessage: resp }));
            return resp;
        }
        const { id: uid, email, name: displayName, image: photoURL, role: role } = resp;
        dispatch(login({ uid, email, displayName, photoURL, role }));
        return null;
    };
};

export const checkAuth = () => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        let ok = false;
        const resp = await authAPI
            .get("/verify", {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.data);
                }
                ok = true;
                return response.data;
            })
            .catch((error) => {
                console.error("Error verifying auth:", error);
            });

        if (ok && resp.user) {
            const { id: uid, email, name: displayName, image: photoURL, role: role } = resp.user;
            console.log("User verified:", resp.user);
            dispatch(login({ uid, email, displayName, photoURL, role }));
        } else {
            dispatch(logout(null));
        }
    };
};

export const updatePhotoURL = (photoURL: string) => {
    return async (dispatch: any) => {
        dispatch(updateProfilePhoto({ photoURL }));
    };
};

export const clearErrorThunk = () => {
    return async (dispatch: any) => {
        dispatch(clearError());
    };
};

export const startLogout = () => {
    return async (dispatch: any) => {
        await authAPI.post("/logout");
        await logoutFirebase();

        dispatch(logout(null));
    };
};
