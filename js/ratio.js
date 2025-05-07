export default function createPieChartSVG(totalUp, totalDown) {
    const total = totalUp + totalDown;
    const upRatio = totalUp / total;
    const downRatio = totalDown / total;

    const upMB = Math.floor(totalUp / 10000) / 100;
    const downMB = (totalDown / 1_000_000).toFixed(2);

    // Convert to angles
    const upAngle = upRatio * 360;
    const largeArcFlag = upAngle > 180 ? 1 : 0;

    // Pie chart radius
    const r = 80;
    const cx = 100;
    const cy = 100;

    // Endpoint of the up slice arc
    const endX = cx + r * Math.cos((upAngle - 90) * Math.PI / 180);
    const endY = cy + r * Math.sin((upAngle - 90) * Math.PI / 180);

    const svg = `
  <svg width="200" height="220" viewBox="0 0 200 220">
    <!-- Background circle (totalDown) -->
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#f44336" />

    <!-- Foreground arc (totalUp) -->
    <path d="
      M ${cx} ${cy}
      L ${cx} ${cy - r}
      A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    " fill="#4caf50" />

    <!-- Legend -->
    <text x="10" y="210" font-size="12" fill="#4caf50">Done: ${upMB} MB</text>
    <text x="100" y="210" font-size="12" fill="#f44336">Received: ${downMB} MB</text>
  </svg>
  `;

    document.getElementById("audit-ratio").innerHTML = svg;
}
