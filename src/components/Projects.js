import React from "react";
import "../styles/Home.css";
import "../App.css";
import ProjectInfo from "./ProjectInfo";

function Projects({ data, modalProject, setModalProject, openModal, closeDialog }) {
    const projects = data.projects;
    

    return (
        <div>
            <h2 className="home-title">Projects</h2>
            <div className="home-card-container">
                {projects.map((pro, index) => {
                    return (
                        <div key={index} className="home-card">
                            <img
                                src={pro.carousel[0]}
                                className="project-card-image"></img>
                            <h3>{pro.title}</h3>
                            <div className="labels-container">
                                {pro.skills.map((skill, i) => (
                                    <div key={i} className="label">{skill}</div>
                                ))}
                            </div>
                            <div className="btn-container">
                                <button
                                    className="button"
                                    onClick={() => openModal(pro)}>
                                    More info
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {modalProject && (
                <ProjectInfo
                    modalProject={modalProject}
                    setModalProject={setModalProject}
                    closeDialog={closeDialog}
                />
            )}
        </div>
    );
}

export default Projects;
