import { Route, Routes } from "react-router";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { FeedPage } from "../modules/feed/pages/Feed";
import { HomePage } from "../modules/home/pages/Home";
import { ExceptionsRouter } from "../modules/exceptions/router/ExceptionsRouter";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Login and Register */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            <Route path="/feed" element={<FeedPage />} />
            <Route path="/restaurant/*" element={<FeedPage />} />

            <Route path="/" element={<HomePage />} />

            <Route path="/*" element={<ExceptionsRouter />} />
        </Routes>
    );
};
