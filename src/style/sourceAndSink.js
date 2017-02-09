let svgb64Str = require('./svgUtil.js');

// QUAD1  |  QUAD2
// (-, -) |  (+, -)
// -------------
// QUAD4  | QUAD3
// (-, +) |  (+, +)
const quad1 = '-0.86, 0.5, -0.75, 0.65, -1, 0.95, -0.95, 1, -0.65, 0.75, -0.5, 0.86, 0, 1';

const quad2 = '0.5, 0.86, 0.71, 0.71, 0.86, 0.5, 1, 0';

const quad3 = '0.86, -0.5, 0.75, -0.65, 1, -0.95, 0.95, -1, 0.65, -0.75, 0.5, -0.86, 0, -1';

const quad4 = '-0.5, -0.86, -0.71, -0.71, -0.86, -0.5, -1, 0,';

const points = () => {
  return `${quad1}, ${quad2}, ${quad3}, ${quad4}`;
};

const svgUri = (node, strokeColor = 'grey' , edgeWidth = 1) => {
  let cloneMarker = '';
  let clipPath = '';

  let nodeCenterX = node.width() / 2;
  let nodeCenterY = node.height() / 2;
  let circleRadius = (node.width() - 2) / 2;

  if (node.data('clonemarker')) {
    clipPath = `
    <defs>
      <clipPath id="cut-off-bottom">
        <rect x="0" y="${2 * node.height() / 3}" width="${node.width()}" height="${node.width()}" />
      </clipPath>
    </defs>
    `;
    cloneMarker = `
    <circle cx="${nodeCenterX}" cy="${nodeCenterY}" r="${circleRadius}" fill='#D2D2D2' stroke='grey' clip-path="url(#cut-off-bottom)" />
    `;
  }

  const sourceAndSink = 
  `
    <circle cx='${nodeCenterX}' cy='${nodeCenterY}' r='${circleRadius}' fill='none' stroke='${strokeColor}' stroke-width='${edgeWidth}'  />
    ${clipPath}
    ${cloneMarker}
    <line x1='0' y1='${node.height()}' x2='${node.width()}' y2='0' stroke-width='${edgeWidth}' stroke='${strokeColor}'/>
  `;

  return svgb64Str(sourceAndSink, node.width(), node.height(), 0, 0, node.width(), node.height());
};

module.exports = {
  svgUri: svgUri,
  points: points
};
