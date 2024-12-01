import { CoreLayout } from "./modules/core/CoreLayout";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

function FTDApp() {
    return (
        <AppTheme>
            <CoreLayout>
                <AppRouter />
            </CoreLayout>
        </AppTheme>
    );
}

export default FTDApp;
