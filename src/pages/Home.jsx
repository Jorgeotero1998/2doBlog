import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        // Cargar Personajes
        fetch("https://www.swapi.tech/api/people")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_people", payload: data.results }));

        // Cargar Planetas
        fetch("https://www.swapi.tech/api/planets")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_planets", payload: data.results }));

        // Cargar Vehículos
        fetch("https://www.swapi.tech/api/vehicles")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_vehicles", payload: data.results }));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-danger mb-4 fw-bold text-start">Characters</h1>
            <div className="d-flex flex-row overflow-auto mb-5 pb-3">
                {store.people?.map(item => <Card key={item.uid} item={item} type="people" />)}
            </div>

            <h1 className="text-danger mb-4 fw-bold text-start">Planets</h1>
            <div className="d-flex flex-row overflow-auto mb-5 pb-3">
                {store.planets?.map(item => <Card key={item.uid} item={item} type="planets" />)}
            </div>

            <h1 className="text-danger mb-4 fw-bold text-start">Vehicles</h1>
            <div className="d-flex flex-row overflow-auto mb-5 pb-3">
                {store.vehicles?.map(item => <Card key={item.uid} item={item} type="vehicles" />)}
            </div>
        </div>
    );
};