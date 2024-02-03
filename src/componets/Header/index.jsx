import { Link } from "react-router-dom";
import { MdSearch, MdFacebook } from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter} from "react-icons/fa6";
export const Header = () => {
    return (
        <header>
            <div>

                <div>
                    <Link to="/">
                        <img src="/src/assets/Logo.jpeg" alt="Logo do jornal" width="200"  />
                    </Link>
                    <Link><FaInstagram/></Link>
                    <Link><FaSquareXTwitter/></Link>
                    <Link><MdFacebook/></Link>
                    <Link><FaWhatsapp/></Link>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digitar Pesquisa"
                        />
                    </form>
                    <button type="submit">
                        <MdSearch size={25} />
                    </button>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/item1">Item 1</Link>
                    </li>
                    <li>
                        <Link to="/item2">Item 2</Link>
                    </li>
                    <li>
                        <Link to="/item3">Item 3</Link>
                    </li>
                    <li>
                        <Link to="/item4">Item 4</Link>
                    </li>
                    <li>
                        <Link to="/item5">Item 5</Link>
                    </li>
                    <li>
                        <Link to="/item6">Item 6</Link>
                    </li>
                    <li>
                        <Link to="/item7">Item 7</Link>
                    </li>
                    <li>
                        <Link to="/item8">Item 8</Link>
                    </li>
                    <li>
                        <Link to="/item9">Item 9</Link>
                    </li>
                    <li>
                        <Link to="/item10">Item 10</Link>
                    </li>
                    <li>
                        <Link to="/item10">Item 10</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};





