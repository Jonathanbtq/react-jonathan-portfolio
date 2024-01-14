import formaProjects from "../content/formaProjects"
import React, { useRef, useState } from "react"

import symfony from '../assets/img/symfony-icon.webp'
import css from '../assets/img/csslogo.png'
import js from '../assets/img/jslogo.png'
import html from '../assets/img/htmlicon.png'
import bootstrap from '../assets/img/bootstrap.png'
import php from '../assets/img/phpicon.png'

const iconMap = {
    'SYMFONY': symfony,
    'CSS': css,
    'JS': js,
    'HTML': html,
    'BOOTSTRAP': bootstrap,
    'PHP': php,
    // 'REACT': react,
};

export default function FormationProjects() {
    
    const [scrollX, setScrollX] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef();

    function isEven(number) {
        return number % 2 === 0;
    }

    const handleScroll = (direction, projectIndex) => {
        console.log(projectIndex)
        formaProjects.forEach((project, index) => {
            // console.log(index)
            if(projectIndex === index){
                console.log(project)
                {project.array_options.img.map((img, imgIndex) => (
                    console.log(img)
                    // render (
                    //     <li key={imgIndex}>
                    //     <img src={img} alt={`Image ${imgIndex + 1}`} />
                    //     </li>
                    // )
                ))}
            }
            // if (!project) return;
        
            // const containerWidth = container.clientWidth;
            // const moveAmount = containerWidth / 2;
        
            // if (direction === "left") {
            //     setScrollX((prev) => {
            //         console.log('test', moveAmount)
            //       const newScrollX = Math.max(prev - moveAmount, 0);
            //       console.log("New scrollX:", newScrollX);
            //       return newScrollX;
            //     });
            //     setCurrentImageIndex((prev) => Math.max(prev - 1, 0));
            // } else if (direction === "right") {
            //     setScrollX((prev) => {
            //         console.log('test', Math.min(prev + moveAmount, container.scrollWidth - containerWidth))
            //       const newScrollX = Math.min(prev + moveAmount, container.scrollWidth - containerWidth);
            //       console.log("New scrollX:", newScrollX);
            //       return newScrollX;
            //     });
            //     setCurrentImageIndex((prev) => Math.min(prev + 1, containerRef.current[projectIndex].length - 1));
            // }
        });
    };

  const ProjetMapping = () => {
    return (
      <React.Fragment>
        {formaProjects.map((projet, projectIndex) => (
          <div className="prt_frm_card" key={projet.id}>
            {projet.array_options.map((options, optionsIndex) => (
              <div className="prt_frm_crd_ctn" key={optionsIndex} Ref={optionsIndex}>
                <p className="left_arrow_forma" onClick={() => handleScroll('left', projet.id)}>left</p>
                <ul className="prt_frm_content">
                  {options.img.map((img, imgIndex) => (
                    <li key={imgIndex}>
                      <img src={img} alt={`Image ${imgIndex + 1}`} />
                    </li>
                  ))}
                </ul>
                <p className="right_arrow_forma" onClick={() => handleScroll('right', projectIndex)}>right</p>
              </div>
            ))}
            <div className="prt_frm_card_content">
              <h3>{projet.name}</h3>
              <p>{projet.description}</p>
              <p className="lang_use_prt_frm">Langages utilisés :</p>
              <div className="prt_frm_card_stack">
                {projet.array_options.map((options, optionsIndex) => (
                  <React.Fragment key={optionsIndex}>
                    {options.stacks.map((stack, stackIndex) => (
                      <div className="prt_frm_crd_icon" key={stackIndex}>
                        {iconMap[stack] && <img src={iconMap[stack]} alt={stack} />}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  };

    return (
        <>
            <div className="projet_form_ctn">
                <div className="prt_frm_wth">
                    <div className="prt_frm_head">
                        <h2>Projets de formation</h2>
                        <a href="https://github.com/Jonathanbtq" target="_blank" className="lien_page_index">GitHub</a>
                    </div>
                    <ProjetMapping  />
                </div>
            </div>
        </>
    )
}