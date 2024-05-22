import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/Logo.png";
import styles from "./style.module.scss";
import { MdEmail} from "react-icons/md";
import { FaWhatsapp, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { NavBarSection } from "../NavBarSection";

export const Footer = () => {
    return(
        <footer>
            <div className="container1">
                    <NavBarSection/>
                <div className={styles.flexBox}>
                    <section>
                        <Link to="/">
                            <img src={Logo} 
                                alt="Logo do jornal" 
                            />
                        </Link>
                        <strong >
                            <Link
                                className="title two" 
                                to="/collaborators" 
                                >
                            <h3 className="title two">Ver equipe completa</h3>
                            </Link>
                        </strong>
                        <span>
                        <Link 
                            to="https://wa.me/557193485952"
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FaWhatsapp size={25} color="#25D366" />
                        </Link>
                        <Link 
                            to="https://www.instagram.com/jornaldabahia.ba?utm_source=qr&igsh=MWxmd3p2dG12dnM4YQ%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer">
                            <FaInstagram size={25} color="#E4405F" /> 
                        </Link>
                        <Link 
                            to="https://twitter.com/jornaldabahia01?t=ywFx66CkQyp5JaJSdIISqA&s=08"
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FaTwitter size={25} color="#1DA1F2" /> 
                        </Link>
                        <Link 
                            to="mailto:seuemail@dominio.com"
                            target="_blank" 
                            rel="noopener noreferrer">
                            <FaEnvelope size={25} color="#D44638" /> 
                        </Link>
                        </span>
                    </section>
                </div>
            </div>
        </footer>
    );
};
