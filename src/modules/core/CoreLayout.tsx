import { FC, PropsWithChildren } from "react";
import { Footer, Header } from "./components";
import { Box, Divider } from "@mui/material";

type Props = {};

export const CoreLayout: FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <Box>
            <Header />
            {children}
            <Footer></Footer>
        </Box>
    );
};
