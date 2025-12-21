import React from "react";
import "../styles/Home.css";
import "../styles/ProjectInfo.css";
import "../App.css";

function ProjectInfo({ modalProject, setModalProject, closeDialog }) {
    const sectionsProjects = [
        "objectives",
        "results",
        "features",
        "challenges",
        "learnt-lessons",
    ];
    const sectionsProjectsDisplay = {
        objectives: "🎯 Objectives",
        results: "📊 Results",
        features: "⚙️ Features",
        challenges: "🧩 Challenges",
        "learnt-lessons": "💡 Learned Lessons",
    };
    return (
        <div className="modal">
            <div className="modal-content">
                {/* Header Bar */}
                <div className="modal-header">
                    <h3>{modalProject.title}</h3>
                    <button
                        className="close-x"
                        onClick={() => closeDialog(null)}>
                        ✕
                    </button>
                </div>

                {/* Main Content */}
                <div className="modal-body">
                    {modalProject.carousel.length > 0 && (
                        <div className="carousel">
                            {modalProject.carousel.length > 1 && (
                                <button
                                    className="carousel-btn prev"
                                    onClick={() =>
                                        setModalProject((prev) => ({
                                            ...prev,
                                            currentIndex:
                                                (prev.currentIndex -
                                                    1 +
                                                    prev.carousel.length) %
                                                prev.carousel.length,
                                        }))
                                    }>
                                    ‹
                                </button>
                            )}

                            {
                                modalProject.carousel.length >= 1 &&  (
                                    <img
                                        src={
                                            modalProject.carousel[modalProject.currentIndex]
                                        }
                                        className="carousel-image"
                                        alt={modalProject.title}
                                    />
                                )
                            }

                            {modalProject.carousel.length > 1 && (
                                <button
                                    className="carousel-btn next"
                                    onClick={() =>
                                        setModalProject((prev) => ({
                                            ...prev,
                                            currentIndex:
                                                (prev.currentIndex + 1) %
                                                prev.carousel.length,
                                        }))
                                    }>
                                    ›
                                </button>
                            )}
                        </div>
                    )}

                    <h4>📖 Description</h4>
                    <p>{modalProject.description}</p>

                    {sectionsProjects.map(
                        (section, idx) =>
                            console.log(modalProject) ||
                            (modalProject[section] &&
                                modalProject[section].length > 0 && (
                                    <div key={idx} className="project-section">
                                        <h4>
                                            {sectionsProjectsDisplay[section]}
                                        </h4>
                                        <ul>
                                            {" "}
                                            {console.log(section)}
                                            {modalProject[section].map(
                                                (item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        {item}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))
                    )}

                    <h4>🛠️ Skills</h4>
                    <div className="labels-container">
                        {modalProject.skills.map((skill, i) => (
                            <div key={i} className="label">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="modal-footer">
                    <button
                        className="close-btn"
                        onClick={() => closeDialog(null)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProjectInfo;
