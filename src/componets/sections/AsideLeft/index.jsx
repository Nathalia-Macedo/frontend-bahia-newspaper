import styles from "./style.module.scss";
import { quickies } from "../../../data";

export const AsideLeft = () => {
    return (
        <aside className={styles.leftAside}>
            <ul>
                <h1 className="title center">Rapidinhas</h1>
                {quickies.map((obj, index) => (
                <li key={index}>
                    <img src={obj.image} />
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
