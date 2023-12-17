import persoproject from "../content/persoproject"

export default function webprojects(){
    return (
        <>
        <div className="idx_cinque_ctn">
            <div className="idx_cinque_div">
                <div className="idx_cinque_bloc">
                    <h2>03. Projet Personnel Web</h2>
                    
                    <a href="https://github.com/Jonathanbtq" target="_blank" className="lien_page_index">GitHub</a>

                    {persoproject.map((projet, index) => (
                        <div className="card_idx_prj_web">
                            <div className="card_web_ctn card_idx_lilalys">
                                <img className="card_web_ctn_img" src="images/lilalysshop/lilalys1.PNG" alt="" />
                                <p>{projet.name}</p>
                            </div>
                        </div> 
                    ))}
                    
                </div>
            </div>
        </div>
        </>
    )
}