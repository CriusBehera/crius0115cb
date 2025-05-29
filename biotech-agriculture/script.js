document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    let gradientPosition = 0;
    let colorIndex = 0;
    let transitionStep = 0; // Controls smooth transition blending

    const colorSets = [
        ["#2A2A72", "#009FFD", "#192A56"],
        ["#1E1E42", "#7F00FF", "#E100FF"],
        ["#141E30", "#243B55", "#141E30"],
        ["#192A56", "#3D3D99", "#6A097D"],
        ["#001510", "#0F3D3E", "#1E6F5C"],
    ];

    function getInterpolatedColor(startColor, endColor, step, maxStep) {
        let startRGB = startColor.match(/\w\w/g).map(hex => parseInt(hex, 16));
        let endRGB = endColor.match(/\w\w/g).map(hex => parseInt(hex, 16));

        let interpolatedRGB = startRGB.map((start, i) =>
            Math.round(start + (endRGB[i] - start) * (step / maxStep))
        );

        return `rgb(${interpolatedRGB.join(",")})`;
    }

    function updateGradient() {
        gradientPosition += 0.5;
        transitionStep += 1;

        let nextIndex = (colorIndex + 1) % colorSets.length;
        let interpolatedColors = colorSets[colorIndex].map((startColor, i) =>
            getInterpolatedColor(startColor, colorSets[nextIndex][i], transitionStep, 100)
        );

        body.style.background = `linear-gradient(${gradientPosition}deg, ${interpolatedColors[0]}, ${interpolatedColors[1]}, ${interpolatedColors[2]})`;

        if (transitionStep >= 100) {
            transitionStep = 0;
            colorIndex = nextIndex;
        }
    }

    setInterval(updateGradient, 50);
});