// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    showSection("about");

    // Get all navigation buttons
    const navButtons = document.querySelectorAll(".nav-btn");

    // Add click event for each button
    navButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const sectionId = this.getAttribute("onclick")
                .match(/'([^']+)'/)[1]; // extract the id from showSection('id')

            showSection(sectionId, event);
        });
    });
});

// Main function to switch sections
function showSection(sectionId, event) {
    // Hide all sections
    document.querySelectorAll(".page-section").forEach(sec => {
        sec.classList.remove("active");
    });

    // Remove active state from all buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active-btn");
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Highlight the clicked button
    if (event && event.target) {
        event.target.classList.add("active-btn");
    }
}

// === Build citation bar chart dynamically ===
document.addEventListener("DOMContentLoaded", function () {
    const dataTable = document.getElementById("citations-data");
    const chart = document.getElementById("bar-chart");
    const yAxis = document.getElementById("y-axis");
    if (!dataTable || !chart) return;

    // Parse data
    const rows = Array.from(dataTable.querySelectorAll("tr")).slice(1);
    const data = rows.map(row => ({
        year: row.cells[0].textContent.trim(),
        value: parseInt(row.cells[1].textContent.trim(), 10)
    }));

    // Find max for scaling
    const maxValue = Math.max(...data.map(d => d.value));
    const yStep = Math.ceil(maxValue / 3);

    // --- Build Y axis labels ---
    yAxis.innerHTML = "";
    const numTicks = 4; // number of labels (including zero)
    for (let i = 0; i < numTicks; i++) {
        const value = Math.round(maxValue - (i * (maxValue / (numTicks - 1))));
        const label = document.createElement("div");
        label.classList.add("y-label");
        label.textContent = value;
        yAxis.appendChild(label);
    }

    // --- Build Bars ---
    chart.innerHTML = "";
    data.forEach(d => {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${(d.value / maxValue) * 100}%`;
        bar.title = `${d.year}: ${d.value}`;

        const label = document.createElement("div");
        label.classList.add("x-label");
        label.textContent = d.year;

        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        chart.appendChild(barContainer);
    });
});

/*document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-container");
  const img2 = document.querySelector(".image2");

  let active = false;

  header.addEventListener("mouseenter", () => {
    img2.style.opacity = "1"; // show second image
    active = true;
  });

  header.addEventListener("mousemove", (e) => {
    if (!active) return; // do nothing until mouse enters
    const rect = header.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    img2.style.clipPath = `polygon(${x}% 0, 100% 0, 100% 100%, ${x}% 100%)`;
  });

  header.addEventListener("mouseleave", () => {
    active = false;
    img2.style.clipPath = "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)";
    img2.style.opacity = "0"; // fade out smoothly
  });
});*/



