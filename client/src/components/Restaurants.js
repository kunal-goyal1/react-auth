import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Restaurants(props) {
    const [rests, setRests] = useState([]);
    const [updaterest, setupdaterest] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getallrests = async () => {
        try {
            console.log(props.token);
            const response = await axios.get(
                "http://localhost:8000/rest/getall",
                { headers: { authorization: "Bearer " + props.token } }
            );
            setRests(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const submithandler = async (data) => {
        try {
            const senddta = {
                ...data,
                id: Math.random().toString(),
            };
            const response = await axios.post(
                "http://localhost:8000/rest/create",
                senddta,
                { headers: { authorization: "Bearer " + props.token } }
            );
            setRests((prev) => {
                return [...prev, senddta];
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deleterest = async (id) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/rest/delete",
                {
                    id: id,
                },
                { headers: { authorization: "Bearer " + props.token } }
            );
            const arr = [];
            for (let i = 0; i < rests.length; i++) {
                if (rests[i].id !== id) {
                    arr.push({ ...rests[i] });
                }
            }
            setRests(arr);
        } catch (error) {
            console.log(error);
        }
    };

    const updateRest = (id) => {
        console.log(id);
        setupdaterest(id);
    };

    const saverest = async (data) => {
        try {
            const senddata = {
                id: data.id,
                location: data.update_loc,
                name: data.update_name,
            };
            const response = await axios.post(
                "http://localhost:8000/rest/update",
                senddata,
                { headers: { authorization: "Bearer " + props.token } }
            );
            setupdaterest(null);
            const updatedrests = [];
            for (let i = 0; i < rests.length; i++) {
                if (rests[i].id === data.id) {
                    console.log("hi");
                    updatedrests.push({ ...senddata });
                } else {
                    updatedrests.push({ ...rests[i] });
                }
            }
            setRests(updatedrests);
        } catch (error) {}
    };

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
                    submithandler(data);
                })}
            >
                <input
                    {...register("name")}
                    type="text"
                    placeholder="name"
                ></input>
                <input
                    {...register("location")}
                    type="text"
                    placeholder="location"
                ></input>
                <button type="submit">Add Restaurant</button>
            </form>
            {rests.map((rest) => {
                if (updaterest !== null && updaterest === rest.id) {
                    return (
                        <form
                            onSubmit={handleSubmit((data) => {
                                saverest({ ...data, id: rest.id });
                            })}
                            key={rest.id}
                        >
                            <input
                                {...register("update_name")}
                                placeholder="name"
                            ></input>
                            <input
                                {...register("update_loc")}
                                type="text"
                                placeholder="location"
                            ></input>
                            <button type="submit">save</button>
                        </form>
                    );
                } else {
                    return (
                        <div key={rest.id}>
                            <p>{rest.name}</p>
                            <p>{rest.location}</p>
                            <button
                                onClick={() => {
                                    deleterest(rest.id);
                                }}
                            >
                                delete
                            </button>
                            <button
                                onClick={() => {
                                    updateRest(rest.id);
                                }}
                            >
                                update
                            </button>
                        </div>
                    );
                }
            })}
            <button onClick={getallrests}>get all</button>
        </>
    );
}
