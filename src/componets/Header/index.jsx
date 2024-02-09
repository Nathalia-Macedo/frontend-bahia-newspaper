import { Link } from "react-router-dom";
import { MdFacebook, MdSearch } from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter} from "react-icons/fa6";
import { NavBarSection } from "../NavBarSection";
import Logo from "../../assets/logo-jornalBa.png";
import styles from "./style.module.scss"

export const Header = () => {

    const submit = (e) => {
        e.preventDefault();
        console.log('cadastrou');
    }

    return (
        <header>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                        <img src={Logo} alt="Logo do jornal"/>
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
                    <form onSubmit={submit}>
                        <input 
                            type="text"
                            placeholder="Digitar Pesquisa"
                        />
                        <button type="submit">
                            <MdSearch size={25} />
                        </button>
                    </form>
                    </span>
                </div>
                <NavBarSection/>
            </div>
        </header>
    );
};







