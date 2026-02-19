document.addEventListener("DOMContentLoaded", () => {
    loadSkills();
    loadProjects();
    loadContProjects(); // remove this when want to lock it again
    loadEducations();
    initBackgroundGrid();
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

let gridCols = 0;
let gridRows = 0;
let gridSize = 40;
let activeCell = null;

function initBackgroundGrid() {
    const grid = document.getElementById("bg-grid");
    if (!grid) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    gridCols = Math.ceil(width / gridSize);
    gridRows = Math.ceil(height / gridSize);
    const total = gridCols * gridRows;

    grid.style.gridTemplateColumns = `repeat(${gridCols}, ${gridSize}px)`;
    grid.style.gridTemplateRows = `repeat(${gridRows}, ${gridSize}px)`;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
        const cell = document.createElement("div");
        cell.classList.add("bg-cell");
        fragment.appendChild(cell);
    }
    grid.innerHTML = "";
    grid.appendChild(fragment);
}

// Track mouse globally
// Track mouse globally
let activeIndices = new Set();
// Cache cells to avoid querying DOM on every move
let cachedCells = [];

// Update cache in initBackgroundGrid
const originalInit = initBackgroundGrid;
initBackgroundGrid = function () {
    originalInit();
    cachedCells = document.querySelectorAll(".bg-cell");
    activeIndices = new Set();
};

document.addEventListener("mousemove", (e) => {
    if (gridCols === 0) return;

    const x = e.clientX;
    const y = e.clientY;

    const col = Math.floor(x / gridSize);
    const row = Math.floor(y / gridSize);

    // Range in cells (radius)
    const range = 3;

    const newIndices = new Set();

    // Loop through bounding box around cursor
    const startCol = Math.max(0, col - range);
    const endCol = Math.min(gridCols - 1, col + range);
    const startRow = Math.max(0, row - range);
    const endRow = Math.min(gridRows - 1, row + range);

    for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
            const dx = c - col;
            const dy = r - row;
            // Use distance formula for circle, or just box for square area
            // Let's use circle for smoother effect
            if (dx * dx + dy * dy <= range * range) {
                const index = r * gridCols + c;
                newIndices.add(index);
            }
        }
    }

    // Remove old that are not in new
    activeIndices.forEach((index) => {
        if (!newIndices.has(index)) {
            if (cachedCells[index])
                cachedCells[index].classList.remove("hovered");
        }
    });

    // Add new
    newIndices.forEach((index) => {
        if (cachedCells[index]) cachedCells[index].classList.add("hovered");
    });

    activeIndices = newIndices;
});

// Clear hover on mouse leave window
document.addEventListener("mouseleave", () => {
    if (activeCell) {
        activeCell.classList.remove("hovered");
        activeCell = null;
    }
});

// Debounce resize
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initBackgroundGrid, 200);
});
