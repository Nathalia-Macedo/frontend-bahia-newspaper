// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './Anuncios.css';

// function AnunciosCarousel() {
//     const [anuncios, setAnuncios] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [noResults, setNoResults] = useState(false); 

//     useEffect(() => {
//         fetchAnuncios();
//     }, []);

//     const fetchAnuncios = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch("http://34.125.197.110:3333/ad/", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setAnuncios(data);
//             } else {
//                 console.error("Erro ao buscar anúncios:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Erro ao buscar anúncios:", error);
//         }
//     };

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1
//     };

//     const filteredAnuncios = anuncios.filter(anuncio =>
//         anuncio.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//         setNoResults(filteredAnuncios.length === 0);
//     }, [filteredAnuncios]);

//     return (
//         <>
//             <div className="search-bar-container">
//                 <input
//                     type="text"
//                     className="search-bar"
//                     placeholder="Pesquisar..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             {noResults && <div className='no-results-message'>Nenhum resultado encontrado.</div>} 
            
//             <Slider {...settings} className="anuncios-carousel">
//                 {filteredAnuncios.map(anuncio => (
//                     <div key={anuncio.id} className="anuncio-card">
//                         <div className="anuncio-content">
//                             <button className="close-button">X</button>
//                             <img
//                                 src={anuncio.imageUrl}
//                                 alt={anuncio.description}
//                                 className="anuncio-image"
//                             />
//                             <div className="anuncio-text">
//                                 <h3>{anuncio.description}</h3>
//                                 <a href={anuncio.link} target="_blank" rel="noopener noreferrer">Ver mais</a>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </>
//     );
// }

// export default AnunciosCarousel;
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Anuncios.css';

function AnunciosCarousel() {
    const [anuncios, setAnuncios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [noResults, setNoResults] = useState(false); 

    useEffect(() => {
        fetchAnuncios();
    }, []);

    const fetchAnuncios = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://89.116.214.37:3333/ad/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAnuncios(data);
            } else {
                console.error("Erro ao buscar anúncios:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao buscar anúncios:", error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const filteredAnuncios = anuncios.filter(anuncio =>
        anuncio.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setNoResults(filteredAnuncios.length === 0);
    }, [filteredAnuncios]);

    return (
        <>
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {noResults && <div className='no-results-message'>Nenhum resultado encontrado.</div>} 
            
            <Slider {...settings} className="anuncios-carousel">
                {filteredAnuncios.map(anuncio => (
                    <div key={anuncio.id} className="anuncio-card">
                        <div className="anuncio-content">
                            <button className="close-button">X</button>
                            <img
                                src={anuncio.imageUrl}
                                alt={anuncio.description}
                                className="anuncio-image"
                            />
                            <div className="anuncio-text d-none d-md-block"> {/* Oculta em dispositivos móveis e tablets */}
                                <h3>{anuncio.description}</h3>
                                <a href={anuncio.link} target="_blank" rel="noopener noreferrer">Ver mais</a>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
}

export default AnunciosCarousel;



