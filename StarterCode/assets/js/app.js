//  chart parameters
var svgWidth = 900;
var svgHeight = 600;

// svg margins
var margin = {
    top: 60,
    right: 60,
    bottom: 100,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// use svg element to select body, append area and set dimensions 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// append group and set margins 
var chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import csv file 
var file = "assets/data/data.csv"

d3.csv(file).then(successHandle, errorHandle);
function errorHandle(error) {
    throw err;
}
// function by states and loop through data for smokes and age
function successHandle(states) {
    states.map(function (data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
    });

    var xscale = d3.scaleLinear()
        .domain([8.1, d3.max(states, d => d.smokes)])
        .range([0, width]);

    var yscale = d3.scaleLinear()
        .domain([20, d3.max(states, d => d.age)])
        .range([height, 0]);


    var bottomAxis = d3.axisBottom(xscale)
        .ticks(7);
    var leftAxis = d3.axisLeft(yscale);

// append axis to chart 
    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chart.append("g")
        .call(leftAxis);


    // add circles to chart
    var circlesGroup = chart.selectAll("circle")
        .data(states)
        .enter()
        .append("circle")
        .attr("cx", d => xscale(d.smokes))
        .attr("cy", d => yscale(d.age))
        .attr("r", "13")
        .attr("fill", "#788dc2")
        .attr("opacity", ".75")


    // add text to circles

    var circlesGroup = chart.selectAll()
        .data(states)
        .enter()
        .append("text")
        .attr("x", d => xscale(d.smokes))
        .attr("y", d => yscale(d.age))
        .style("font-size", "13px")
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .text(d => (d.abbr));


}


