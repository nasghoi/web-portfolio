document.addEventListener("DOMContentLoaded", () => {
    loadSkills();
    loadProjects();
    loadEducations();
});

function loadEducations() {
    fetch("data/educations.json")
        .then((res) => res.json())
        .then((educations) => {
            const container = document.querySelector("#educations-grid");
            educations.forEach((education) => {
                const card = document.createElement("div");
                card.className = "education-card glass-card";
                card.innerHTML = `
                    <div class="edu-content">
                        <h3>${education.university}</h3>
                        <p class="edu-level">${education.level_of_education}</p>
                    </div>
                    <div class="edu-meta">
                        <span class="cgpa-badge">CGPA: ${education.cgpa}</span>
                    </div>
                `;
                container.appendChild(card);
            });
        });
}

function loadSkills() {
    fetch("data/skills.json")
        .then((res) => res.json())
        .then((skills) => {
            const container = document.querySelector("#skills-grid");
            skills.forEach((skill) => {
                const card = document.createElement("div");
                card.className = "skill-card glass-card";

                const techChips = skill.technologies
                    .map((tech) => `<span class="tech-chip">${tech}</span>`)
                    .join("");

                card.innerHTML = `
                    <h3>${skill.area}</h3>
                    <div class="tech-chips-container">
                        ${techChips}
                    </div>
                `;
                container.appendChild(card);
            });
        });
}

function loadProjects() {
    fetch("data/projects.json")
        .then((res) => res.json())
        .then((projects) => {
            const container = document.querySelector(".cards-grid");
            projects.forEach((project) => {
                const card = document.createElement("div");
                card.className = "project-card glass-card";

                // Tech chips similar to skills section
                const stackButtons = project.stack
                    .map((tech) => `<span class="tech-chip">${tech}</span>`)
                    .join("");

                const links = project.links
                    .map(
                        (link) => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                        <i class="fa-solid fa-link"></i> ${link.label}
                    </a>
                `,
                    )
                    .join("");

                let status =
                    typeof project.status === "string"
                        ? project.status.toLowerCase()
                        : "";
                if (status == "in progress") {
                    status = `<span class="card-button-ongoing">In Progress</span>`;
                } else {
                    status = `<span class="card-button-primary">Completed</span>`;
                }

                card.innerHTML = `
                    <div class="img-div">
                        <img src="${project.image}" alt="${project.alt}" loading="lazy" />
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.85rem; color: #64748b; font-family: 'Fira Code', monospace;">${project.date}</span>
                            ${status}
                        </div>
                        <h4>${project.title}</h4>
                        <div class="stack-list">${stackButtons}</div>
                        <p>${project.desc}</p>
                        ${
                            links
                                ? `<div class="project-links">${links}</div>`
                                : ""
                        }
                    </div>
                `;
                container.appendChild(card);
            });
        });
}

function loadContProjects() {
    fetch("data/cont-projects.json")
        .then((res) => res.json())
        .then((projects) => {
            const container = document.querySelector(".cards-grid-cont");
            projects.forEach((project) => {
                const card = document.createElement("div");
                card.className = "project-card glass-card";

                const stackButtons = project.stack
                    .map((tech) => `<span class="tech-chip">${tech}</span>`)
                    .join("");

                const links = project.links
                    .map(
                        (link) => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                        <i class="fa-solid fa-link"></i> ${link.label}
                    </a>
                `,
                    )
                    .join("");

                let status =
                    typeof project.status === "string"
                        ? project.status.toLowerCase()
                        : "";
                if (status == "in progress") {
                    status = `<span class="card-button-ongoing">In Progress</span>`;
                } else {
                    status = `<span class="card-button-primary">Completed</span>`;
                }

                card.innerHTML = `
                    <div class="img-div">
                        <img src="${project.image}" alt="${project.alt}" loading="lazy" />
                    </div>
                    <div>
                         <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.85rem; color: #64748b; font-family: 'Fira Code', monospace;">${project.date}</span>
                            ${status}
                        </div>
                        <h4>${project.title}</h4>
                        <div class="stack-list">${stackButtons}</div>
                        <p>${project.desc}</p>
                        ${
                            links
                                ? `<div class="project-links">${links}</div>`
                                : ""
                        }
                    </div>
                `;
                container.appendChild(card);
            });
        });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
