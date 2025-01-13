import { AnimatePresence } from "framer-motion";
import { CoreLayout } from "./modules/core/CoreLayout";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

function FTDApp() {
    return (
        <AppTheme>
            <AnimatePresence mode="wait">
                <CoreLayout>
                    <AppRouter />
                </CoreLayout>
            </AnimatePresence>
        </AppTheme>
    );
}

export default FTDApp;
