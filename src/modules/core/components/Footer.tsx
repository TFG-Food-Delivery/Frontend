import { Container, IconButton, Typography } from "@mui/material";
import "./styles.css";
import logo from "../../../assets/ftd-logo.png";
import { Facebook, Instagram, LinkedIn, X } from "@mui/icons-material";
import { Link } from "react-router";

export const Footer = () => {
    return (
        <Container>
            <hr />
            <div className="footer-group">
                <div className="footer-group-logo">
                    <img src={logo} alt="Food To Door Logo" />
                    <Typography
                        variant="h5"
                        sx={{ flexGrow: 1, color: "secondary.main", fontFamily: "Pacifico, Roboto" }}
                    >
                        Food To Door
                    </Typography>
                </div>
                <div className="footer-group-links">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/help">Help</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-group-rrss">
                    <ul>
                        <li>
                            <IconButton disableRipple aria-label="facebook">
                                <Facebook color="primary" />
                            </IconButton>
                        </li>
                        <li>
                            <IconButton disableRipple aria-label="x">
                                <X color="primary" />
                            </IconButton>
                        </li>
                        <li>
                            <IconButton disableRipple aria-label="instagram">
                                <Instagram color="primary" />
                            </IconButton>
                        </li>
                        <li>
                            <IconButton disableRipple aria-label="linkedin">
                                <LinkedIn color="primary" />
                            </IconButton>
                        </li>
                    </ul>
                </div>
                <div className="footer-group-copyright">
                    <Typography color="primary" variant="caption">
                        © Food To Door. All rights reserved
                    </Typography>
                </div>
            </div>
        </Container>
    );
};
