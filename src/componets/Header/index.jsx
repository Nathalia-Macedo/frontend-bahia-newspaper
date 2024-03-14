import { Link } from "react-router-dom";
import {  MdSearch } from "react-icons/md";
import { NavBarSection } from "../NavBarSection";
import Logo from "../../assets/imgs/LogoBa.png";
import styles from "./style.module.scss";
import { PostContext } from "../../providers/PostContext";
import { useContext } from "react";

export const Header = () => {

    const { setFilteredPost, postList, filteredPost, value, setValue } = useContext(PostContext);

    const submit = (e) => {
        e.preventDefault();
        setFilteredPost(value);
        setValue("");
    }

    return (
        <header>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                        <img src={Logo} alt="Logo do jornal"/>
                    </Link>
                    <form onSubmit={submit}>
                        <input
                            className="input" 
                            type="text"
                            placeholder="BUSCAR NO SITE"
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                        <button type="submit">
                            <MdSearch size={25} />
                        </button>
                    </form>
                </div>
                <NavBarSection/>
            </div>
        </header>
    );
};







