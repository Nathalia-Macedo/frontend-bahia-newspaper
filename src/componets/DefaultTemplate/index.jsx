import { Footer } from "../Footer";
import { Header } from "../Header";
import PropTypes from 'prop-types';

export const DefaultTemplate = ({children}) => {
    return(
        <>
            <Header/>
                <main>
                    {children}
                </main>
            <Footer/>
        </>
    );
};

DefaultTemplate.propTypes = {
    children: PropTypes.node.isRequired,
};