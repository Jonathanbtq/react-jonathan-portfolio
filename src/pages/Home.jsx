import HeaderPropos from "../components/HeaderPropos";
import WebProjects from "../components/WebProjects";
import { MobileGame } from "../components/MobileGame";
import MinecraftHome from "../components/MinecraftHome";
import FormationProjects from "../components/FormationProjects";
import ReaseauxFooter from "../components/ReseauxFooter";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

import '../styles/HeaderPropos.css'
import './main.css'
import '../styles/WebProjects.css'
import '../styles/MobileGame.css'
import '../styles/MinecraftHome.css'
import '../styles/FormationProject.css'
import '../styles/ReaseauxFooter.css'
import '../styles/Footer.css'

function Home() {
    return (<>
        <HeaderPropos />
        <WebProjects />
        <FormationProjects />
        <MobileGame />
        <MinecraftHome />
        <ReaseauxFooter />
        <Footer />

        <ScrollToTopButton />
    </>)
}

export default Home;