import { useContext } from "react";
// import { PostContext } from "../../../providers/PostContexto";
import styles from "./style.module.scss";
import { imgList } from "../../../data";

export const AsideRight = () => {
    return (
        <aside className={styles.rightAside}>
            <ul>
                <h1 className="title center">Mais lidas</h1>
                {imgList.map((obj, index) => (
                <li key={index}>
                    <img src={obj.image}/>
                    <p className="paragraph bold">{obj.title}</p>
                </li>
                ))}
            </ul>
            <div>
                <h1 className="paragraph bold">adSense</h1>
            </div>
        </aside>
    );
};
