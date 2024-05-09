import { Link } from 'react-router-dom';
import styles from "./style.module.scss"; 
import Logo from "../../assets/imgs/Logo.png";
import Iara from "../../assets/imgs/iara.jpg";
import Nathy from "../../assets/imgs/Nathy.jpeg";
import Farias from "../../assets/imgs/Farias.jpeg";

export const CollaboratorsPage = () => {
    return (
        <section className={styles.container}>
            <Link 
            to="/">
                <img src={Logo} alt="Logo do jornal"/>
            </Link>
            <h1 className='title'>Colaboradores</h1>
            <div className={styles.FlexBox}>
                <div className={styles.collaborator}>
                    <img src={Nathy} alt="Nathalia Macedo" />
                    <div>
                        <h2 className='title one'>Nathalia Macedo</h2>
                        <h3 className='title two'>Gestora de Projeto <br/>
                        Front-End</h3>
                        <a href="https://www.linkedin.com/in/nathalia-de-macedo-martins-4aa693253/" target="_blank" rel="noopener noreferrer">
                            Perfil LinkedIn
                        </a>
                    </div>
                </div>
                <div className={styles.collaborator}>
                    <img src={Iara} alt="Iara Reis" />
                    <div>
                        <h2 className='title one'>Iara Reis</h2>
                        <h3 className='title two'>Front-End</h3>
                        <a href="https://www.linkedin.com/in/iara-reis-010a89240/" target="_blank" rel="noopener noreferrer">
                            Perfil LinkedIn
                        </a>
                    </div>
                </div>
                <div className={styles.collaborator}>
                    <img src={Farias} alt="Josenilson Farias" />
                    <div>
                        <h2 className='title one'>Josenilson Farias</h2>
                        <h3 className='title two'>Back-End</h3>
                        <a href="https://www.linkedin.com/in/josenilsonfarias/" target="_blank" rel="noopener noreferrer">
                            Perfil LinkedIn
                        </a>
                        <span>
                            <Link className='title two' to="/">
                                Voltar para Home
                            </Link>
                            <Link  className='title two' to="/login">
                                Login
                            </Link>
                        </span>                        
                    </div>
                </div>
            </div>
        </section>
    );
};
