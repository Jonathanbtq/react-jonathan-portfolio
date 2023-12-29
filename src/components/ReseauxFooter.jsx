import twitterImg from '../assets/img/twitter.png'
import instagramImg from '../assets/img/instagram.png'
import githubImg from '../assets/img/github.png'

export default function ReaseauxFooter(){
    return (<>
        <div className="footer_wth">
            <div className="ftr_border_ctn">
                <div className="footer_header">
                    <h1>Reseaux sociaux</h1>
                </div>
                <div className="footer_ftr">
                    <a target='_blank' href="https://twitter.com/Jonathanbtq">
                        <img src={twitterImg} alt="" />
                    </a>
                    <a target='_blank' href="https://www.instagram.com/btqjonathan/?hl=fr">
                        <img src={instagramImg} alt="" />
                    </a>
                    <a target='_blank' href="https://github.com/Jonathanbtq">
                        <img src={githubImg} alt="" />
                    </a>
                </div>
            </div>
        </div>
    </>)
}