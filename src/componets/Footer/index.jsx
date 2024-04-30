import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/Logo Jornal da Bahia2.png";
import styles from "./style.module.scss";
import { MdFacebook} from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { NavBarSection } from "../NavBarSection";

export const Footer = () => {
    return(
        <footer>
            <div className="container">
                    <NavBarSection/>
                <div className={styles.flexBox}>
                    <section>
                        <Link to="/">
                            <img src={Logo} 
                                alt="Logo do jornal" 
                            />
                        </Link>
                        <span>
                            <Link 
                                to=""
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaInstagram size={25}/>
                            </Link>
                            <Link 
                                to=""
                                target="_blank" 
                                rel="noopener noreferrer">
                                <FaSquareXTwitter size={25}/>
                            </Link>
                            <Link 
                                to=""
                                target="_blank" 
                                rel="noopener noreferrer">
                                <MdFacebook size={25}/>
                            </Link>
                            <Link 
                                to=""
                                target="_blank" 
                                rel="noopener noreferrer">
                                <FaWhatsapp size={25}/>
                            </Link>
                        </span>
                        <strong >
                                <h3 className="title two">Equipe:</h3>
                            <Link
                                className="title two" 
                                to="https://www.linkedin.com/in/nathalia-de-macedo-martins-4aa693253/"
                                target="_blank" 
                                rel="noopener noreferrer">
                                <FaLinkedin size={20}/>
                                Nathalia Macedo
                            </Link>
                            <Link
                                className="title two" 
                                to="https://www.linkedin.com/in/josenilsonfarias/"
                                target="_blank" 
                                rel="noopener noreferrer">
                                <FaLinkedin size={20}/>
                                Josenilson Farias
                            </Link>
                            <Link
                                className="title two" 
                                to="https://www.linkedin.com/in/iara-reis-010a89240/"
                                target="_blank" 
                                rel="noopener noreferrer">
                                <FaLinkedin size={20}/>
                                Iara Reis
                            </Link>
                            </strong>
                    </section>
                </div>
            </div>
        </footer>
    );
};
