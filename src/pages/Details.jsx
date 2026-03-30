import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Details = () => {
    const { type, id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(false);

    const imgType = type === "people" ? "characters" : type;

    useEffect(() => {
        const getDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                if (!response.ok) throw new Error("Error en la petición");
                const data = await response.json();
                
                if (data.result && data.result.properties) {
                    setItem(data.result.properties);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            }
        };
        getDetails();
    }, [type, id]);

    if (error) return <div className="text-center mt-5 text-danger">Error loading details. Please try again.</div>;
    if (!item) return <div className="text-center mt-5 text-primary">Loading Star Wars data...</div>;

    return (
        <div className="container mt-5">
            <div className="d-flex flex-md-row flex-column align-items-center mb-4">
                <div className="bg-secondary bg-opacity-25 d-flex justify-content-center align-items-center rounded shadow-sm" 
                     style={{ minWidth: "400px", height: "400px" }}>
                    <img 
                        src={`https://starwars-visualguide.com/assets/img/${imgType}/${id}.jpg`} 
                        className="img-fluid rounded" 
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                        onError={(e) => e.target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found"}
                        alt={item.name} 
                    />
                </div>
                <div className="ms-md-5 text-center mt-3 mt-md-0 px-3">
                    <h1 className="fw-bold display-3">{item.name}</h1>
                    <p className="fs-5 mt-4 text-muted">
                        Star Wars is an American epic space opera multimedia franchise created by George Lucas, 
                        which began with the eponymous 1977 film and quickly became a worldwide pop-culture phenomenon.
                        This {type.slice(0, -1)} is an essential part of the galactic history.
                    </p>
                </div>
            </div>

            <hr className="text-danger border-2 mt-5 mb-5" />

            <div className="row text-danger text-center fw-bold gx-2 gy-4">
                <div className="col-12 col-md-2 border-md-end border-danger border-opacity-25">
                    Name<br/><span className="text-dark fw-normal d-block mt-2 small">{item.name}</span>
                </div>
                {type === "people" && (
                    <>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Birth Year<br/><span className="text-dark fw-normal d-block mt-2 small">{item.birth_year}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Gender<br/><span className="text-dark fw-normal d-block mt-2 small">{item.gender}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Height<br/><span className="text-dark fw-normal d-block mt-2 small">{item.height}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Skin Color<br/><span className="text-dark fw-normal d-block mt-2 small">{item.skin_color}</span></div>
                        <div className="col-6 col-md-2">Eye Color<br/><span className="text-dark fw-normal d-block mt-2 small">{item.eye_color}</span></div>
                    </>
                )}
                {type === "planets" && (
                    <>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Climate<br/><span className="text-dark fw-normal d-block mt-2 small">{item.climate}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Population<br/><span className="text-dark fw-normal d-block mt-2 small">{item.population}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Orbital Period<br/><span className="text-dark fw-normal d-block mt-2 small">{item.orbital_period}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Rotation Period<br/><span className="text-dark fw-normal d-block mt-2 small">{item.rotation_period}</span></div>
                        <div className="col-6 col-md-2">Diameter<br/><span className="text-dark fw-normal d-block mt-2 small">{item.diameter}</span></div>
                    </>
                )}
                {type === "vehicles" && (
                    <>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Model<br/><span className="text-dark fw-normal d-block mt-2 small">{item.model}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Class<br/><span className="text-dark fw-normal d-block mt-2 small">{item.vehicle_class}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Passengers<br/><span className="text-dark fw-normal d-block mt-2 small">{item.passengers}</span></div>
                        <div className="col-6 col-md-2 border-md-end border-danger border-opacity-25">Length<br/><span className="text-dark fw-normal d-block mt-2 small">{item.length}</span></div>
                        <div className="col-6 col-md-2">Manufacturer<br/><span className="text-dark fw-normal d-block mt-2 small">{item.manufacturer}</span></div>
                    </>
                )}
            </div>
        </div>
    );
};
