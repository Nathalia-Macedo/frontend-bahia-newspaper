import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostContext";
import { NavBarCard } from "./NavBarCard";
import styles from "./style.module.scss";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";


export const NavBarSection = () => {
    const [category, setCategory] = useState('');
    const {  postList } = useContext(PostContext);
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

    const uniqueCategories = [...new Set(postList.map(object => object.category))];

    return (
        <section className={styles.flexBox}>
                <span 
                    className={styles.hamburguer}
                    onClick={() => setMenuOpen(!menuOpen)}>
                    {!menuOpen ? <FaBars size={20} /> : <IoMdClose size={20}/>}  
                </span>
                {menuOpen && 
                <ul className={styles.menu}>
                    {uniqueCategories.map((category) => (
                        <NavBarCard key={category}  
                        category={category} 
                        setCategory={setCategory} 
                        />
                    ))}    
                </ul>
                }
        </section>
    );
};
