import formaProjects from "../content/formaProjects"
import React, { useRef, useState } from "react"

import symfony from '../assets/img/symfony-icon.webp'
import css from '../assets/img/csslogo.png'
import js from '../assets/img/jslogo.png'
import html from '../assets/img/htmlicon.png'
import bootstrap from '../assets/img/bootstrap.png'
import php from '../assets/img/phpicon.png'

export default function FormationProjects() {

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
      
        if (iconSrc == stack) {
          return <img className="idx_cnq_crd_icon" src={iconSrc} alt={stack} />;
        }
      
        return null;
    }

    function isEven(number) {
        return number % 2 === 0;
    }

    const [scrollX, setScrollX] = useState(0);
    const containerRef = useRef(null)

    const handleScroll = (direction) => {
        const container = containerRef.current
        console.log(container)
        if(!container) return

        const containerWidth =container.clientWidth
        const moveAmount = containerWidth / 2;

        if (direction === "left") {
        setScrollX((prev) => Math.max(prev - moveAmount, 0));
        } else if (direction === "right") {
        setScrollX((prev) => Math.min(prev + moveAmount, container.scrollWidth - containerWidth));
        }
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
                            <div className="prt_frm_card" key={index}>
                                {projet.array_options.map((options, optionsIndex) => (
                                    <div className="prt_frm_crd_ctn" ref={containerRef} key={optionsIndex}>
                                        <p className="left_arrow_forma" onClick={() => handleScroll('left')}>left</p>
                                        <ul className="prt_frm_content">
                                            {options.img.map((img, imgIndex) => (
                                                <li>
                                                    <img src={img} alt={`Image ${imgIndex + 1}`} key={imgIndex} />
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="right_arrow_forma" onClick={() => handleScroll('right')}>right</p>
                                    </div>
                                ))}
                                <div className="prt_frm_card_content">
                                    <h3>{projet.name}</h3>
                                    <p>{projet.description}</p>
                                    <p className="lang_use_prt_frm">Langages utilisés :</p>
                                    <div className="prt_frm_card_stack">
                                        {projet.array_options.map((options, optionsIndex) => (
                                            <React.Fragment  key={optionsIndex}>
                                                {options.stacks.map((stack, stackIndex) => (
                                                    <div className="prt_frm_crd_icon" key={stackIndex}>
                                                        {stack === 'SYMFONY' ? (
                                                        <img src={symfony} alt={stack} />
                                                        ) : stack === 'CSS' ? (
                                                        <img src={css} alt={stack} />
                                                        ) : stack === 'JS' ? (
                                                        <img src={js} alt={stack} />
                                                        ) : stack === 'HTML' ? (
                                                            <img src={html} alt={stack} />
                                                        ) : stack === 'BOOTSTRAP' ? (
                                                            <img src={bootstrap} alt={stack} />
                                                        ) : stack === 'PHP' ? (
                                                            <img src={php} alt={stack} />
                                                        ) : null}
                                                  </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="prt_frm_card" key={index}>
                                <div className="prt_frm_card_content">
                                    <h3>{projet.name}</h3>
                                    <p>{projet.description}</p>
                                    <p className="lang_use_prt_frm">Langages utilisés :</p>
                                    <div className="prt_frm_card_stack">
                                        {projet.array_options.map((options, optionsIndex) => (
                                            <React.Fragment  key={optionsIndex}>
                                                {options.stacks.map((stack, stackIndex) => (
                                                    <div className="prt_frm_crd_icon" key={stackIndex}>
                                                        {stack === 'SYMFONY' ? (
                                                            <img src={symfony} alt={stack} />
                                                        ) : stack === 'CSS' ? (
                                                            <img src={css} alt={stack} />
                                                        ) : stack === 'JS' ? (
                                                            <img src={js} alt={stack} />
                                                        ) : stack === 'HTML' ? (
                                                            <img src={html} alt={stack} />
                                                        ) : stack === 'BOOTSTRAP' ? (
                                                            <img src={bootstrap} alt={stack} />
                                                        ) : stack === 'PHP' ? (
                                                            <img src={php} alt={stack} />
                                                        ) : null}
                                                  </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <img src={projet.img} alt="" />
                            </div>
                    ))}
                </div>
            </div>
        </>
    )
}