// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-5 border-bottom sticky-top">
            <div className="container">
                <Link to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
                        style={{ width: "80px" }}
                        alt="Star Wars Logo"
                    />
                </Link>
                <div className="ml-auto dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle fw-bold"
                        type="button"
                        id="favoritesDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Favorites <span className="badge bg-secondary ms-1">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2" aria-labelledby="favoritesDropdown" style={{ minWidth: "220px" }}>
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item text-center text-muted small">(Empty)</li>
                        ) : (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center mb-1">
                                    <span className="dropdown-item p-0">{fav}</span>
                                    <i
                                        className="fas fa-trash text-danger ms-2"
                                        onClick={() => dispatch({ type: "remove_favorite", payload: fav })}
                                        style={{ cursor: "pointer" }}
                                    ></i>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};