import React, { useState } from "react";
import formaProjects from "../content/formaProjects";
import symfony from '../assets/img/symfony-icon.webp';
import css from '../assets/img/csslogo.png';
import js from '../assets/img/jslogo.png';
import html from '../assets/img/htmlicon.png';
import bootstrap from '../assets/img/bootstrap.png';
import php from '../assets/img/phpicon.png';

const iconMap = {
    'SYMFONY': symfony,
    'CSS': css,
    'JS': js,
    'HTML': html,
    'BOOTSTRAP': bootstrap,
    'PHP': php,
};

export default function FormationProjects() {
    // Stocker l'index de l'image en fonction du projet
    const [currentIndexes, setCurrentIndexes] = useState(
        formaProjects.reduce((acc, projet) => ({ ...acc, [projet.id]: 0 }), {})
    );

    const handleScroll = (direction, projectId, imagesLength) => {
        setCurrentIndexes((prevIndexes) => {
            const currentIndex = prevIndexes[projectId] ?? 0;
            let newIndex = direction === "left"
                ? (currentIndex === 0 ? imagesLength - 1 : currentIndex - 1)
                : (currentIndex === imagesLength - 1 ? 0 : currentIndex + 1);

            return { ...prevIndexes, [projectId]: newIndex };
        });
    };

    return (
        <div className="projet_form_ctn">
            <div className="prt_frm_wth">
                <div className="prt_frm_head">
                    <h2>Projets de formation</h2>
                    <a href="https://github.com/Jonathanbtq" target="_blank" className="lien_page_index">GitHub</a>
                </div>

                {formaProjects.map((projet) => (
                    <div className="prt_frm_card" key={projet.id}>
                        <div className="prt_frm_crd_ctn">
                            <p className="left_arrow_forma" onClick={() => handleScroll('left', projet.id, projet.array_options.img.length)}>←</p>

                            <ul className="prt_frm_content">
                                <li>
                                    <img src={`${window.location.origin}${projet.array_options.img[currentIndexes[projet.id]]}`} alt={`Image ${currentIndexes[projet.id] + 1}`} />
                                </li>
                            </ul>

                            <p className="right_arrow_forma" onClick={() => handleScroll('right', projet.id, projet.array_options.img.length)}>→</p>
                        </div>

                        <div className="prt_frm_card_content">
                            <h3>{projet.name}</h3>
                            <p>{projet.description}</p>
                            <p className="lang_use_prt_frm">Langages utilisés :</p>
                            <div className="prt_frm_card_stack">
                                {projet.array_options.stacks.map((stack, index) => (
                                    <div className="prt_frm_crd_icon" key={index}>
                                        {iconMap[stack] && <img src={iconMap[stack]} alt={stack} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
