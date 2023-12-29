import HeaderPropos from "../components/HeaderPropos";
import WebProjects from "../components/WebProjects";
import { MobileGame } from "../components/MobileGame";
import MinecraftHome from "../components/MinecraftHome";
import FormationProjects from "../components/FormationProjects";
import ReaseauxFooter from "../components/ReseauxFooter";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

import '../components/HeaderPropos.css'
import './main.css'
import '../components/WebProjects.css'
import '../components/MobileGame.css'
import '../components/MinecraftHome.css'
import '../components/FormationProject.css'
import '../components/ReaseauxFooter.css'
import '../components/Footer.css'

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