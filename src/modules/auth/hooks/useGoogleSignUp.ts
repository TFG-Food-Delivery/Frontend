import { useSelector } from "react-redux";
import { authStatus } from "../../store/auth";

type NameSplitResult = {
    name: string | null;
    lastName: string | null;
};

function splitName(fullName: string): NameSplitResult {
    if (!fullName || typeof fullName !== "string") {
        return { name: null, lastName: null }; // Manejo de entrada inválida
    }

    const parts: string[] = fullName.trim().split(/\s+/);

    if (parts.length === 0) {
        return { name: null, lastName: null };
    }

    let name: string;
    let lastName: string | null;

    if (parts.length > 3) {
        name = `${parts[0]} ${parts[1]}`;
        lastName = parts.slice(2).join(" ");
    } else {
        name = parts[0];
        lastName = parts.slice(1).join(" ") || null;
    }

    return { name, lastName };
}

// EXTRACT VALUES FROM REDUX AUTH STATE TO FILL THE REGISTER FORM FIELDS
export const useGoogleSignUp = () => {
    const status = useSelector((state: any) => state.auth);

    const { name, lastName } = splitName(status.displayName);

    let googleUser = {
        name,
        lastName,
        email: status.email,
        photoURL: status.photoURL,
    };

    const isGoogleUser = authStatus.registering === status.status;

    return { googleUser, isGoogleUser };
};
