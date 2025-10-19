document.addEventListener("DOMContentLoaded", () => {
    loadSkills();
    loadProjects();
});

function loadSkills() {
    fetch("data/skills.json")
        .then(res => res.json())
        .then(skills => {
            const tbody = document.querySelector("#skills-table tbody")
            skills.forEach(skill => {
                const tr = document.createElement("tr")
                tr.innerHTML = `
                    <td>${skill.area}</td>
                    <td>${skill.technologies.join(" | ")}</td>
                `
                tbody.appendChild(tr)
            })
        })
}

function loadProjects() {
    fetch("data/projects.json")
        .then(res => res.json())
        .then(projects => {
            const container = document.querySelector(".cards-grid")
            projects.forEach(project => {
                const card = document.createElement("div")
                card.className = "project-card"
                const stackButtons = project.stack.map(tech => `
                    <div class="card-button-secondary"><p>${tech}</p></div>
                `).join("")
                const links = project.links.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>
                `).join("")
                let status = typeof project.status === "string" ? project.status.toLowerCase() : "";
                if (status == 'in progress') {
                    status = `<span class="card-button-ongoing">In Progress</span>`;
                } else {
                    status = `<span class="card-button-primary">Completed</span>`;
                }

                card.innerHTML = `
                    <div>
                        <p>${project.date} — ${status}</p>
                        <h4>${project.title}</h4>
                            <div class="stack-list">${stackButtons}</div>
                            <p>${project.desc}</p>
                            ${links ? `<div class="project-links">${links}</div>` : ""}
                    </div>
                    <div class="img-div">
                        <img src="${project.image}" alt="${project.alt}" class="big-img" />
                    </div>
                `
                container.appendChild(card)
            })
        })
}