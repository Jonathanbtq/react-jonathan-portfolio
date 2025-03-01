import { useState } from "react";

export default function ModuleNewForm({ setConstFormVisible }) {
    const [message, setMessage] = useState('');
    const [messageClass, setMessageClass] = useState('');
    const [moduleData, setModuleData] = useState({
        name: '',
        ref: '',
        description: '',
        version_dolibarr: '',
        version_module: '',
        prix_ht: '',
        prix_ttc: '',
        active: '',
    });
    const [file, setFile] = useState(null);
    const [zipFile, setZipFile] = useState(null);

    // Gestion du changement de fichier image
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Gestion du changement de fichier ZIP
    const handleZipFileChange = (e) => {
        setZipFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModuleData({
            ...moduleData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        Object.keys(moduleData).forEach(key => {
            data.append(key, moduleData[key]);
        });

        // Ajouter les fichiers à FormData
        if (file) {
            data.append("file", file);
        }
        if (zipFile) {
            data.append("zipFile", zipFile);
        }

        fetch('http://localhost:3500/addDoliModule', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: data
        })
            .then(response => response.json())
            .then(data => {
                if (data.value === 'error') {
                    setMessageClass('msgerror');
                } else {
                    setMessageClass('msgsuccess');
                }
                setMessage(data.message);
                // setModuleData({
                //     name: '',
                //     ref: '',
                //     description: '',
                //     version_dolibarr: '',
                //     version_module: '',
                //     prix_ht: '',
                //     prix_ttc: '',
                //     active: '',
                // });
            })
            .catch(error => {
                setMessage(error.message);
                console.error("Erreur lors de la requête:", error);
            });
    };

    return (
        <div className="form_ctn_const_admin">
            {message && 
                <p className={messageClass}>{message}</p>
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={moduleData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ref">Ref</label>
                    <input type="text" name="ref" value={moduleData.ref} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="version_dolibarr">Version Dolibarr</label>
                    <input type="text" name="version_dolibarr" value={moduleData.version_dolibarr} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={moduleData.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="version_module">Version Module</label>
                    <input type="text" name="version_module" value={moduleData.version_module} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="prix_ht">Prix HT</label>
                    <input type="number" name="prix_ht" value={moduleData.prix_ht} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="prix_ttc">Prix TTC</label>
                    <input type="number" name="prix_ttc" value={moduleData.prix_ttc} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="active">Active</label>
                    <input type="text" name="active" value={moduleData.active} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="file">Icon</label>
                    <input type="file" name="file" onChange={handleFileChange} accept="image/*" />
                </div>
                <div>
                    <label htmlFor="file">fichier Zip</label>
                    <input type="file" name="zipFile" onChange={handleZipFileChange} accept=".zip" />
                </div>
                <input type="submit" value="Ajouter" />
            </form>
        </div>
    );
}
