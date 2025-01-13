import { FC, PropsWithChildren } from "react";
import { Footer, Header, Sidebar } from "./components";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

type Props = {};

export const CoreLayout: FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <div className="overlay"></div>
            <Header />

            <Box
                flex="1"
                padding={"4rem 0"}
                component={motion.div}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};
