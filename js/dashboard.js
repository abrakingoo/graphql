// dashboard.js
import createPieChartSVG from "./ratio.js";

const user = JSON.parse(localStorage.getItem("user"))?.data?.user?.[0];
if (!user) {
    window.location.href = "../index.html";
} else {
    console.log("Logged in Usewr:>>> ", user)
    const login = user?.login;
    const id = user?.id;
    const attrs = user?.attrs;

    document.getElementById("user-login").textContent = login;
    document.getElementById("user-id").textContent = id;
    document.getElementById("name").textContent = `${user?.firstName} ${user?.lastName}`;
    document.getElementById("email").textContent = user?.email;
    document.getElementById("campus").textContent = user?.campus;
    document.getElementById("ratio").textContent = user?.auditRatio.toFixed(1);
    document.getElementById("level").textContent = user?.events[0].level;

    createPieChartSVG(user?.totalUp, user?.totalDown)

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "../index.html";
    });

    const svg = document.getElementById("skills-svg");
    const svgWidth = 600;
    const svgHeight = 500;
    const maxValue = 100;
    const padding = 100;

    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.innerHTML = "";

    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radius = Math.min(svgWidth, svgHeight) / 2 - padding;

    const skillCount = user.skills.length;
    const angleStep = (2 * Math.PI) / skillCount;

    const polygonPoints = [];

    user.skills.forEach((skill, index) => {
        const valueRatio = skill.amount / maxValue;
        const angle = index * angleStep - Math.PI / 2; // start at top
        const x = centerX + Math.cos(angle) * radius * valueRatio;
        const y = centerY + Math.sin(angle) * radius * valueRatio;
        polygonPoints.push(`${x},${y}`);

        // Axis line
        const axisX = centerX + Math.cos(angle) * radius;
        const axisY = centerY + Math.sin(angle) * radius;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", axisX);
        line.setAttribute("y2", axisY);
        line.setAttribute("stroke", "#ccc");
        svg.appendChild(line);

        // Label
        const label = skill.type.replace("skill_", "").replace(/-/g, " ");
        const labelX = centerX + Math.cos(angle) * (radius + 20);
        const labelY = centerY + Math.sin(angle) * (radius + 20);
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", labelX);
        text.setAttribute("y", labelY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "14");
        text.setAttribute("fill", "#333");
        text.textContent = label;
        svg.appendChild(text);
    });

    // Draw the polygon (data shape)
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", polygonPoints.join(" "));
    polygon.setAttribute("fill", "rgba(0, 123, 255, 0.3)");
    polygon.setAttribute("stroke", "blue");
    polygon.setAttribute("stroke-width", "2");
    svg.appendChild(polygon);

    // Draw dots at each vertex
    polygonPoints.forEach(point => {
        const [x, y] = point.split(',').map(Number);
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", "blue");
        svg.appendChild(circle);
    });
}
