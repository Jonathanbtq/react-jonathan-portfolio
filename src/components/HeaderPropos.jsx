import reseaux from '../content/reseaux'

export default function HeaderPropos(){
    return (
        <div className="idx_prem_frt_ctn">
            <h1 className="idx_prem_h">A Propos</h1>
            {/* <div class="idx_prem_vns">
                <img class="idx_cgn_d" src="images/symfony-icon.webp" alt=""/>
                <img class="idx_cgn_dx" src="images/logo-g0a77623af_640.png" alt=""/>
                <img class="idx_cgn_dr" src="images/csslogo.png" alt="">
                <img class="idx_cgn_ds" src="images/jslogo.png" alt="">
                <img class="idx_cgn_dt" src="images/clogo.png" alt="">
            </div> */}
            <p className="idx_prem_p">JONATHAN BOTQUIN !</p>
            <div className="idx_prem_propos">
                Passionné de programmation, je suis développeur web FullStack. Vous retrouverez sur ce site mes différents projets, de la programmation et du Minecraft.
            </div>

            <div className="idx_prem_btn">
                <ul className="idx_prem_btn_ul">
                    {reseaux.map((reseau, index) => (
                        <li key={index} className="idx_prem_btn_li">
                            <a href={reseau.url} target="_blank" className="idx_prem_btn_a">
                                <img src={reseau.image} alt="" className="idx_prem_img" />
                                test
                            </a>
                        </li> 
                    ))}
                </ul>
            </div>
        </div>
    )
}