import React from "react";
import "../styles/Home.css";
import "../App.css";
import AcademicBg from "../components/AcademicBg";
import Experience from "../components/Experience";
import Projects from "../components/Projects";

function Home({ data }) {
    const [modalProject, setModalProject] = React.useState(null);

    const openModal = (project) => {
        setModalProject({ ...project, currentIndex: 0 });
        document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    const closeDialog = () => {
        setModalProject(null);
        document.body.style.overflow = "unset"; // Restore background scroll
    };
    return (
        <div className="home-body">
            <AcademicBg
                data={data}
                modalProject={modalProject}
                setModalProject={setModalProject}
                openModal={openModal}
                closeDialog={closeDialog}
            />
            <Experience
                data={data}
                modalProject={modalProject}
                setModalProject={setModalProject}
                openModal={openModal}
                closeDialog={closeDialog}
            />
            <Projects
                data={data}
                modalProject={modalProject}
                setModalProject={setModalProject}
                openModal={openModal}
                closeDialog={closeDialog}
            />
        </div>
    );
}

export default Home;
