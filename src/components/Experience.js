import React from "react";
import "../styles/Home.css";
import "../App.css";

function Experience({ data, modalProject, setModalProject, openModal, closeDialog }) {
    const experience = data.experience;
    return (
        <div>
            <h2 className="home-title">Experience</h2>
            <div className="home-card-container">
                {experience.map((exp, index) => {
                    return (
                        <div key={index} className="home-card">
                            <div className="home-card-title-with-image">
                                <img src={exp.logo} className="home-logo"></img>
                                <div className="home-card-title-text">
                                    <h3>{exp.title}</h3>
                                    <h6>
                                        {exp.company} |{" "}
                                        {exp.startDate === exp.endDate
                                            ? exp.startDate
                                            : `${exp.startDate} - ${exp.endDate}`}
                                    </h6>
                                </div>
                            </div>
                            <div className="home-card-details">
                                <p>{exp.description}</p>
                                <ul>
                                    {exp.responsibilities.map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="labels-container">
                                {exp.skills.map((skill, i) => (
                                    <div key={i} className="label">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Experience;
