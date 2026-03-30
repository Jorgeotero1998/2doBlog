import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();
    const [details, setDetails] = useState(null);
    const isFavorite = store.favorites.includes(item.name);

    const imgType = type === "people" ? "characters" : type;

    useEffect(() => {
        
        fetch(`https://www.swapi.tech/api/${type}/${item.uid}`)
            .then(res => res.json())
            .then(data => setDetails(data.result.properties))
            .catch(err => console.error(err));
    }, [item.uid, type]);

    return (
        <div className="card m-2 border border-secondary border-opacity-25 shadow-sm" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
            <img
                src={`https://starwars-visualguide.com/assets/img/${imgType}/${item.uid}.jpg`}
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image"; }}
                className="card-img-top"
                alt={item.name}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body bg-white text-start">
                <h5 className="card-title fw-bold text-dark mb-3">{item.name}</h5>
                
                
                {!details ? (
                    <p className="small text-muted">Loading details...</p>
                ) : (
                    <>
                        {type === "people" && (
                            <>
                                <p className="card-text mb-1 small text-dark">Gender: {details.gender}</p>
                                <p className="card-text mb-1 small text-dark">Hair Color: {details.hair_color}</p>
                                <p className="card-text mb-3 small text-dark">Eye-Color: {details.eye_color}</p>
                            </>
                        )}
                        {type === "planets" && (
                            <>
                                <p className="card-text mb-1 small text-dark">Population: {details.population}</p>
                                <p className="card-text mb-3 small text-dark">Terrain: {details.terrain}</p>
                            </>
                        )}
                        {type === "vehicles" && (
                            <>
                                <p className="card-text mb-1 small text-dark">Model: {details.model}</p>
                                <p className="card-text mb-3 small text-dark">Class: {details.vehicle_class}</p>
                            </>
                        )}
                    </>
                )}

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-primary px-3 rounded-0 fw-bold">
                        Learn more!
                    </Link>
                    <button
                        className="btn btn-outline-warning border-warning rounded-0 p-2"
                        style={{ width: "38px", height: "38px" }}
                        onClick={() => {
                            if (isFavorite) {
                                dispatch({ type: "remove_favorite", payload: item.name });
                            } else {
                                dispatch({ type: "add_favorite", payload: item.name });
                            }
                        }}
                    >
                        <i className={`${isFavorite ? "fas" : "far"} fa-heart text-warning`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
