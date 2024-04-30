
// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import Card from 'react-bootstrap/Card';
// import ConfirmDeleteModal from '../Confirmacao/Confirmacao';
// import './Anuncios.css';

// function AnunciosCarousel() {
//     const [anuncios, setAnuncios] = useState([]);
//     const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar a exibição do modal de confirmação
//     const [entityToDelete, setEntityToDelete] = useState(null); // Entidade a ser excluída
//     const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa

//     useEffect(() => {
//         fetchAnuncios();
//     }, []); // Executa apenas uma vez ao montar o componente

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

//     const handleDeleteClick = (entity) => {
//         setEntityToDelete(entity);
//         setShowDeleteModal(true);
//     };

//     const deleteAd = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`http://34.125.197.110:3333/ad/delete/${entityToDelete.id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 console.log("Anúncio excluído com sucesso.");
//                 fetchAnuncios(); // Busca novamente os anúncios após a exclusão bem-sucedida
//                 setShowDeleteModal(false);
//             } else {
//                 console.error("Erro ao excluir o anúncio:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Erro ao excluir o anúncio:", error);
//         }
//     };

//     // Função para filtrar os anúncios com base no termo de pesquisa
//     const filteredAnuncios = anuncios.filter(anuncio =>
//         anuncio.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <>
//            <div className="search-bar-container">
//   <input
//       type="text"
//       placeholder="Pesquisar..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//   />
// </div>

//             <Slider {...settings} className="anuncios-carousel">
//                 {filteredAnuncios.map(anuncio => (
//                     <div key={anuncio.id} className="anuncio-card">
//                         <Card>
//                             <button className="close-button" onClick={() => handleDeleteClick(anuncio)}>X</button> {/* Botão de fechar (X) */}
//                             <Card.Img
//                                 variant="top"
//                                 src={anuncio.imageUrl}
//                                 alt={anuncio.description}
//                                 style={{ height: '200px', objectFit: 'cover' }} // Definindo uma altura fixa e ajustando o redimensionamento da imagem
//                             />
//                             <Card.Body>
//                                 <Card.Title>{anuncio.description}</Card.Title>
//                                 <Card.Text>
//                                     <a href={anuncio.link} target="_blank" rel="noopener noreferrer">Ver mais</a>
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 ))}
//             </Slider>
//             <ConfirmDeleteModal
//                 show={showDeleteModal}
//                 onHide={() => setShowDeleteModal(false)}
//                 entityName={entityToDelete ? entityToDelete.description : ""}
//                 onConfirmDelete={() => {
//                     console.log("Excluir", entityToDelete);
//                     deleteAd(); // Chamar a função deleteAd ao confirmar a exclusão
//                 }}
//             />
//         </>
//     );
// }

// export default AnunciosCarousel;
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from 'react-bootstrap/Card';
import ConfirmDeleteModal from '../Confirmacao/Confirmacao';
import './Anuncios.css';

function AnunciosCarousel() {
    const [anuncios, setAnuncios] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [entityToDelete, setEntityToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAnuncios();
    }, []);

    const fetchAnuncios = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://34.125.197.110:3333/ad/", {
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

    const handleDeleteClick = (entity) => {
        setEntityToDelete(entity);
        setShowDeleteModal(true);
    };

    const deleteAd = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://34.125.197.110:3333/ad/delete/${entityToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log("Anúncio excluído com sucesso.");
                fetchAnuncios();
                setShowDeleteModal(false);
            } else {
                console.error("Erro ao excluir o anúncio:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao excluir o anúncio:", error);
        }
    };

    const filteredAnuncios = anuncios.filter(anuncio =>
        anuncio.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            <Slider {...settings} className="anuncios-carousel">
                {filteredAnuncios.map(anuncio => (
                    <div key={anuncio.id} className="anuncio-card">
                        <Card>
                            <button className="close-button" onClick={() => handleDeleteClick(anuncio)}>X</button>
                            <Card.Img
                                variant="top"
                                src={anuncio.imageUrl}
                                alt={anuncio.description}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>{anuncio.description}</Card.Title>
                                <Card.Text>
                                    <a href={anuncio.link} target="_blank" rel="noopener noreferrer">Ver mais</a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Slider>
            <ConfirmDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                entityName={entityToDelete ? entityToDelete.description : ""}
                onConfirmDelete={() => {
                    console.log("Excluir", entityToDelete);
                    deleteAd();
                }}
            />
        </>
    );
}

export default AnunciosCarousel;
