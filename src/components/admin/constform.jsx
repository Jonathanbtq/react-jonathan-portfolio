import { useState } from "react";

export default function ConstForm() {
    const [constData, setConstData] = useState({
        name: '',
        value: '',
        active: '',
        note: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConstData({
            ...constData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const constsData = {
            name: constData.name,
            value: constData.value,
            active: constData.active,
            note: constData.note,
        }

        console.log(constsData)

        fetch('http://localhost:3500/addconst', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(constsData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Erreur lors de la requête:", error)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="">name</label>
                <input type="text" name="name" value={constData.name} onChange={handleChange} />
            </div>
            <div className="">
                <label htmlFor="">value</label>
                <input type="text" name="value" value={constData.value} onChange={handleChange} />
            </div>
            <div className="">
                <label htmlFor="">active</label>
                <input type="text" name="active" value={constData.active} onChange={handleChange} />
            </div>
            <div className="">
                <label htmlFor="">note</label>
                <input type="text" name="note" value={constData.note} onChange={handleChange} />
            </div>
            <input type="submit" value="Ajouter" />
        </form>
    )
}