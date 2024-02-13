import { Footer } from "../Footer";
import { Header } from "../Header";
import PropTypes from 'prop-types';
import { AsideRight } from "../sections/AsideRight";
import { AsideLeft } from "../sections/AsideLeft";


export const DefaultTemplate = ({children}) => {
    return(
        <>
            <Header/>
                <main>
                    {/* <AsideRight/> */}
                    {children}
                    {/* <AsideLeft/> */}
                </main>
            <Footer/>
        </>
    );
};

DefaultTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};