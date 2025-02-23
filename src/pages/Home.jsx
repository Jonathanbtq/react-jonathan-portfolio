import HeaderPropos from "../components/HeaderPropos";
import WebProjects from "../components/WebProjects";
import { MobileGame } from "../components/MobileGame";
import MinecraftHome from "../components/MinecraftHome";
import FormationProjects from "../components/FormationProjects";
import ReseauxFooter from "../components/ReseauxFooter";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

import '../styles/HeaderPropos.css'
import './main.css'
import '../styles/boutique/boutique.css'
import '../styles/WebProjects.css'
import '../styles/MobileGame.css'
import '../styles/MinecraftHome.css'
import '../styles/FormationProject.css'
import '../styles/ReseauxFooter.css'
import '../styles/Footer.css'
import { useEffect, useState } from "react";

function Home() {
    const [constVariable, setConstVariable] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3500/addconst')
            .then(response => {
                setConstVariable(response.data.value);
            })
            .catch(error => {
                console.error('There was an error retrieving the global variable!', error);
              });
    }, []);

    return (<>
        <HeaderPropos />
        <WebProjects />
        <MobileGame />
        <FormationProjects />
        {/* <MinecraftHome /> */}
        <ReseauxFooter />
        <Footer />

        <ScrollToTopButton />
    </>)
}

export default Home;