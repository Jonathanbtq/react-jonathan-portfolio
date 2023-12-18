import persoproject from "../content/persoproject"

export default function webprojects() {
    return (
        <>
            <div className="idx_cinque_ctn">
                <div className="idx_cinque_div">
                    <h2>03. Projet Personnel Web</h2>

                    <a href="https://github.com/Jonathanbtq" target="_blank" className="lien_page_index">GitHub</a>

                    <div className="card_idx_prj_web">
                        {persoproject.map((projet, index) => (
                            <div key={index} className="card_web_ctn">
                                <img className="card_web_ctn_img" src={projet.img} alt="" />
                                <p>{projet.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}