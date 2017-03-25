// ES6 : http://exploringjs.com/es6/ch_core-features.html

// { // BLOCK

let zoom = d3.zoom();

let svg = d3.select("body")                                //
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
  .call(zoom.on("zoom", () => {
      svg.attr("transform", d3.event.transform);
  }))
  .append("g")

// DRAW A HEX

var h = (Math.sqrt(3)/2),
    radius = 100,
    xp = document.body.clientWidth / 2,
    yp = document.body.clientHeight / 2,
    hexagonData = [
      { "x": radius+xp,   "y": yp}, 
      { "x": radius/2+xp,  "y": radius*h+yp},
      { "x": -radius/2+xp,  "y": radius*h+yp},
      { "x": -radius+xp,  "y": yp},
      { "x": -radius/2+xp,  "y": -radius*h+yp},
      { "x": radius/2+xp, "y": -radius*h+yp}
    ];

drawHexagon = 
  d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveCardinalClosed.tension(.75));

var enterElements = 
    svg.append("path")
                .attr("d", drawHexagon(hexagonData))
                .attr("stroke", "red")
                .attr("stroke-dasharray","20,5")
                .attr("stroke-width", 3)
                .attr("fill", "rgba(255,0,0,0.4)");


// Utilities
function print(obj){
    console.log(obj)
}



// } // END BLOCK