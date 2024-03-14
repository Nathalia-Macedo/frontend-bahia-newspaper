import styles from "./style.module.scss";
import { quickies } from "../../../data";
import { Link } from "react-router-dom";

export const AsideLeft = () => {
    return (
        <aside className={styles.leftAside}>
            <ul>
                <h1 className="title center">RAPIDINHAS</h1>
                {quickies.map((obj, index) => (
                <li key={index}>
                    <img src={obj.image} />
                    <Link className="link">{obj.category.charAt(0).toUpperCase() 
                        + obj.category.slice(1)}
                    </Link>
                    <p className="paragraph small">{obj.title}</p>
                </li>
                ))}
            </ul>
            {/* <div>
                <h1 className="paragraph bold">adSense</h1>
            </div> */}
        </aside>
    );
};
