import { Navigate, Route, Routes } from "react-router";
import { NotFoundPage } from "../pages/NotFound";

export const ExceptionsRouter = () => {
    return (
        <Routes>
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
    );
};
