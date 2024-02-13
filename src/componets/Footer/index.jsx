import { Link } from "react-router-dom";
import Logo from "../../assets/logo-jornal.png";
import styles from "./style.module.scss";

export const Footer = () => {
    return(
        <footer>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                            <img src={Logo} alt="Logo do jornal" width="200" />
                    </Link>
                <span>
                    <p>Todos os direitos reservados &copy; {new Date().getFullYear()} Jornal da Bahia Online</p>
                </span>
                </div>
            </div>
        </footer>
    );
};