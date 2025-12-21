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
                    if ('show' in pro && pro.show === false){
                        return null;
                    } else{
                        return (
                        <div key={index} className="home-card">
                            <img
                                src={pro.image}
                                className="project-card-image"></img>
                            <h3>{pro.title}</h3>
                            <div className="labels-container">
                                {pro.skills.map((skill, i) => (
                                    <div key={i} className="label">{skill}</div>
                                ))}
                            </div>
                            <div className="btn-container">
                                {pro.live && (
                                    <button
                                        className="button"
                                        onClick={() => window.open(pro.live, '_blank')}>
                                        <img className="img-icon" src="./assets/images/webicon.png" alt="Live" /> Live
                                    </button>
                                )}
                                {pro.repo && (
                                    <button
                                        className="button"
                                        onClick={() => window.open(pro.repo, '_blank')}>
                                        <img className="img-icon" src="./assets/images/githubicon.jpg" alt="GitHub" />
                                        Repo
                                    </button>
                                )}
                                {pro.moreInfoLink  && (
                                    <button
                                        className="button"
                                        onClick={() => window.open(pro.moreInfoLink, '_blank')}>
                                        📝 More info
                                    </button>
                                )}
                                {!pro.moreInfoLink && !pro.prototype && (
                                    <button
                                        className="button"
                                        onClick={() => openModal(pro)}>
                                        📝 More info
                                    </button>
                                )}
                                {pro.prototype && (
                                    <button
                                        className="button button-wider"
                                        onClick={() => window.open(pro.prototype, '_blank')}>
                                            <img className="img-icon" src="./assets/images/figmaicon.png" alt="Prototype in Figma" />
                                        Try prototype
                                    </button>
                                )}
                            </div>
                        </div>
                        );
                    }
                    
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
