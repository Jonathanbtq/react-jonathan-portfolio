import { useEffect } from "react";
import { useState } from "react"
import persoproject from "../content/persoproject"

import symfony from '../assets/img/symfony-icon.webp'
import css from '../assets/img/csslogo.png'
import js from '../assets/img/jslogo.png'
import html from '../assets/img/htmlicon.png'
import bootstrap from '../assets/img/bootstrap.png'
import php from '../assets/img/phpicon.png'
import react from '../assets/img/reacticon.png'

export default function webprojects() {

    const [selectedProject, setSelectedProject] = useState(null)
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isProjetId, setIsProjetId] = useState(null);

    function renderStackIcon(stack) {
        const iconMap = {
          'SYMFONY': symfony,
          'CSS': css,
          'JS': js,
          'HTML': html,
          'BOOTSTRAP': bootstrap,
          'PHP': php,
          'REACT': react,
        };
      
        const iconSrc = iconMap[stack];
      
        if (iconSrc) {
          return <img className="idx_cnq_crd_icon" src={iconSrc} alt={stack} />;
        }
      
        return null;
    }

    function handleGetData({ projet, index }) {
        if (selectedProject === projet) {
            setIsDetailVisible(!isDetailVisible)
        } else {
            setSelectedProject(projet);
            setIsDetailVisible(true);
            setIsProjetId(index);
        }
    }

    useEffect(() => {
        console.log('test')
    }, [isDetailVisible])

    return (
        <>
            <div className="idx_cnq_wth">
                <div className="idx_cinque_ctn">
                    <div className="idx_cinque_div">
                        <h2>Projets Personnels Web</h2>

                        <a href="https://github.com/Jonathanbtq" target="_blank" className="lien_page_index">GitHub</a>

                        <div className="card_idx_prj_web">
                            {persoproject.map((projet, index) => (
                                <div
                                    key={index}
                                    className={`card_web_ctn`}
                                    onClick={() => handleGetData({ projet, index })}
                                >
                                    <div className={`card_ctn_color ${isDetailVisible && isProjetId === index ? 'card_web_ctn_select' : ''}`}></div>
                                    <img className="card_web_ctn_img" src={projet.img} alt="" />
                                    <p>{projet.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedProject && (
                    <div className={`idx_cnq_content ${isDetailVisible ? '' : 'idx_cnq_content_hidden'}`}>
                        <div className="idx_cnq_ctn_right">
                            <img src={selectedProject.img} alt="" />
                        </div>
                        <div className="idx_cnq_ctn_left">
                            <h3>{selectedProject.name}</h3>
                            <p>{selectedProject.description}</p>
                            <a href={selectedProject.url}>Lien vers le site</a>
                            <i class="fas fa-link"></i>
                            <div className="idx_cnq_content_p">
                                {selectedProject.stack.map((stack, index) => (
                                    renderStackIcon(stack, index)
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}