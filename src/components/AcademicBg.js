import React from "react";
import "../styles/Home.css";
import "../App.css";

function AcademicBg({
    data,
    modalProject,
    setModalProject,
    openModal,
    closeDialog,
}) {
    return (
        <div>
            <h2 className="home-title">Academic background</h2>
            <div className="home-card-container">
                {data.education.map((edu, index) => {
                    return (
                        <div key={index} className="home-card home-card-academic-bg">
                            <h3>{edu.degree}</h3>
                            <h6>
                                {edu.institution +
                                    " | " +
                                    edu.startDate +
                                    " - " +
                                    edu.endDate +
                                    " | " +
                                    edu.credits +
                                    " | GPA: " +
                                    edu.gpa}
                            </h6>
                            <div className="home-card-details">
                                {edu.details && (
                                    <>
                                        {edu.details.some(
                                            (d) => typeof d === "object"
                                        ) ? (
                                            <ul>
                                                {edu.details.map((detail, i) =>
                                                    typeof detail ===
                                                        "object" ? (
                                                        <li key={i}>
                                                            <strong>
                                                                {detail.title}
                                                            </strong>
                                                            :{" "}
                                                            {detail.description}{detail.more && (
                                                                <>
                                                                    <button
                                                                        className="button" style={{
                                                                            display: "inline",
                                                                            marginLeft: "0.25rem",
                                                                            padding: "0.15rem 0.75rem",
                                                                            borderRadius: "0.5rem",
                                                                            width: "auto",
                                                                        }}
                                                                        onClick={() =>
                                                                            openModal(
                                                                                data.projects[i]
                                                                            )
                                                                        }>
                                                                        More
                                                                    </button>
                                                                </>
                                                            )}
                                                        </li>
                                                    ) : (
                                                        <p key={i}>{detail}</p>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            edu.details.map((detail, i) => (
                                                <p key={i}>{detail}</p>
                                            ))
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AcademicBg;
