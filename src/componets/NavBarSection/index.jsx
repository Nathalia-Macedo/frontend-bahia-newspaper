import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostContext";
import { NavBarCard } from "./NavBarCard";
import styles from "./style.module.scss";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";


export const NavBarSection = () => {

    const {  categoryList } = useContext(PostContext);
    const [menuOpen, setMenuOpen] = useState(false); 
    const [ size, setSize ] = useState({ width: undefined, height: undefined });

    useEffect(() => {
        setSize({ width: window.innerWidth , height: window.innerHeight });

        const handleSize = () => {
            setSize({ width: window.innerWidth , height: window.innerHeight });
        }
        window.addEventListener('resize', handleSize);
        return () => window.removeEventListener('resize', handleSize);
    }, []);

    useEffect(() => {
        if(size.width > 800){
            setMenuOpen(true);
        }else{
            setMenuOpen(false);
        }
    }, [size.width]);

    const uniqueCategories = [...new Set(categoryList.map(category => category.name))];

    return (
        <section className={styles.flexBox}>
                <span 
                    onClick={() => setMenuOpen(!menuOpen)}>
                    <h2 className="paragraph bold">Categorias</h2>
                    {!menuOpen ? <FaBars size={20} /> : <IoMdClose size={20}/>}  
                </span>
                    {menuOpen && 
                    <ul className={styles.menu}>
                        {uniqueCategories.map((category, index) => (
                            <NavBarCard key={index}  
                                category={category} 
                            />
                        ))}    
                    </ul>
                    }
        </section>
    );
};
