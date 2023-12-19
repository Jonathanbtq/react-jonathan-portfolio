import formaProjects from "../content/formaProjects"

export default function FormationProjects(){

    function isEven(number) {
        return number % 2 === 0;
    }

    return (
        <>
            <div className="projet_form_ctn">
                <div className="prt_frm_wth">
                    <div className="prt_frm_head">
                        <h2>Projets de formation</h2>
                        <a href="https://github.com/Jonathanbtq" target="_blank" className="lien_page_index">GitHub</a>
                    </div>
                    {formaProjects.map((projet, index) => (
                        isEven(index) 
                        ? 
                        <div className="prt_frm_card">
                            <img src="http://jonathanbotquin.fr/images/maquette/lordblock.PNG" alt="" />
                            <div className="prt_frm_card_content">
                                <h3>{projet.name}</h3>
                                <p>{projet.description}</p>
                                <p>Langages utilisés :</p>
                                <div className="prt_frm_card_stack">
                                    {projet.array_options.map((options, optionsIndex) => (
                                        <div key={optionsIndex}>
                                            {options.stacks.map((stack, stackIndex) => (
                                                <img key={stackIndex} src={`URL_DE_VOTRE_LOGO_${stack}.png`} alt={stack} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        : 
                        <div className="prt_frm_card">
                            <div className="prt_frm_card_content">
                            <h3>{projet.name}</h3>
                                <p>{projet.description}</p>
                                <p>Langages utilisés :</p>
                                <div className="prt_frm_card_stack">
                                    {projet.array_options.map((options, optionsIndex) => (
                                        <div key={optionsIndex}>
                                            {options.stacks.map((stack, stackIndex) => (
                                                <img key={stackIndex} src={`URL_DE_VOTRE_LOGO_${stack}.png`} alt={stack} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <img src="http://jonathanbotquin.fr/images/maquette/lordblock.PNG" alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}