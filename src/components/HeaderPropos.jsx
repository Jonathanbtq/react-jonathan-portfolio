import reseaux from '../content/reseaux'
import profileImg from '../assets/img/pdp2.jpg'

export default function HeaderPropos() {
    return (
        <div className="idx_wth_ctn">
            <div className="idx_prem_frt_ctn">
                <div className="idx_prem_lft">
                    <h1 className="idx_prem_h">A Propos</h1>
                    <p className="idx_prem_p">JONATHAN BOTQUIN</p>
                    <div className="idx_prem_propos">
                        Développeur web FullStack. Vous retrouverez sur ce site mes différents projets, de la programmation et du Minecraft.
                    </div>

                    <div className="idx_prem_btn">
                        <ul className="idx_prem_btn_ul">
                            {reseaux.map((reseau, index) => (
                                <li key={index} className="idx_prem_btn_li">
                                    <a href={reseau.url} target="_blank" className="idx_prem_btn_a">
                                        <img src={reseau.image} alt="" className="idx_prem_img" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="idx_prem_img">
                    <img src={profileImg} alt="" className="idx_prem_img" />
                </div>
            </div>
        </div>

    )
}