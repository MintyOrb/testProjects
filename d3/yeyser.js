
<head><meta charset="utf-8">

<title>D3 Example</title>
<style>
h1 {
     font-family: sans-serif;
     text-align: center;
}

svg {
     display: block;
     margin-left: auto;
     margin-right: auto;
     border: 1px solid black;
}

svg text {
  font-size: 11px;
  font-family: sans-serif;
  text-anchor: middle;
}

.axis path,
.axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: sans-serif;
  font-size: 10px;
}

</style>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
</head>

<body>
<h1>D3 Example</h1>
<svg class="chart"></svg>

<script>
var chartWidth = 500;
var chartHeight = 500;

/********
 * Data *
 ********/

var allData;

/**************
 * Load Data  *
 **************/

var index = 0;

d3.csv("titanic passenger list.csv",function(row,i){
       return {
         name: row.name,
         survived: (row.survived==1) ? "Yes": "No",
         sex: row.sex,
         age: +row.age,
         fare: +row.fare,
         key: i
       };
}, function(error,rows){
       if(error){
         console.log(error);
       }
       rows.sort(function(a,b) { return (a.name).localeCompare(b.name);});
       allData = rows;
       makeChart(rows.slice(index,index+10));
});

var key = function(d){ return d.key; };

/**********
 * Scales *
 **********/
var x,y,c,s,r;


/********
 * Axes *
 ********/

var xAxis;
var yAxis;

/**************
 * Make Chart *
 **************/

function makeChart(data){

  // y position
  y = d3.scale.linear()
    .domain([d3.min(allData,function(d){ return d.age}),d3.max(allData,function(d){ return d.age})])
    .range([465,10]);

  // color
  c = d3.scale.ordinal()
    .domain(["male","female"])
    .range(["#a6cee3","#fb9a99"]);

  // stroke
  s = d3.scale.ordinal()
    .domain(["No","Yes"])
    .range(["#e31a1c","#1f78b4"]);

  // radius
  r = d3.scale.linear()
    .domain([0,d3.max(allData,function(d){ return d.fare})])
    .range([5,50]);

  var canvas = d3.select(".chart")
      .style("width",chartWidth)
      .style("height",chartHeight);

  update(data);

  xAxis = d3.svg.axis()
    .scale(x)
    .ticks(0)
    .orient("bottom");

  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  canvas.append("g")
    .attr("class","axis")
    .attr("transform","translate(25,0)")
    .call(yAxis)
  .append("text")
    .text("Passenger Age")
    .attr("transform", "rotate(-90)")
    .attr("y", 15)
    .attr("dx", -10)
    .style("text-anchor", "end");

  canvas.append("g")
    .attr("class","axis")
    .attr("transform","translate(0,"+(chartHeight-25)+")")
    .call(xAxis)
  .append("text")
    .text("Click to sample a new passenger.")
    .attr("x", chartHeight-15)
    .attr("dy", 12)
    .style("text-anchor", "end");

  canvas.on("click", function(){ fetch(++index,index+10); index=index%allData.length;});

  genderLegend();
  survivedLegend();

}

/**********
 * Legend *
 **********/

function genderLegend() {
  // Draw the gender legend
  var legend = d3.select(".chart").selectAll(".legend")
      .data(c.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", 475)
      .attr("y", 9)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", c);

  legend.append("text")
      .attr("x", 465)
      .attr("y", 18)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d.charAt(0).toUpperCase()+d.slice(1); });
}

function survivedLegend() {

  var group = d3.select(".chart").append("g")
      .attr("class", "legend-group");

  group.append("text")
      .text("Passenger survived?")
      .attr("x", 493)
      .attr("y", 59)
      .style("font-weight", "bold")
      .style("text-anchor", "end");

  var legend = group.selectAll(".legend")
      .data(s.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", 475)
      .attr("y", 65)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", s);

  legend.append("text")
      .attr("x", 465)
      .attr("y", 73)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
}

/***************
 * Update Loop *
 ***************/

function update(data){

  //BIND DATA
  var scatter = d3.select(".chart").selectAll("circle")
    .data(data,key);

  //UPDATE
  // x position
  x = d3.scale.linear()
  .domain([0,data.length-1])
  .range([35,490]);

  scatter.attr("stroke-width","5px");

  //ENTER
  scatter.enter().append("circle")
    .attr("fill-opacity",0.85)
    .attr("r",function(d){ return 5;})
    .attr("stroke",function(d){ return s(d.survived)})
    .on("mouseover", function(d){ d3.select(this).transition().attr("stroke-width", "5px").attr("r", r(d.fare));})
    .on("mouseout", function(){ d3.select(this).transition().delay(1000).attr("stroke-width","0px").attr("r",5);})
    .append("svg:title")
    .text(function(d){ return d.name;});

  //ENTER + UPDATE
  scatter.transition().duration(1000)
    .attr("cx",function(d,i){ return x(i); })
    .attr("cy",function(d){ return y(d.age);})
    .attr("fill",function(d){ return c(d.sex)})
    .attr("stroke",function(d){ return s(d.survived)})
    .attr("stroke-width","0px");


  //EXIT
  scatter.exit().transition().duration(1000).attr("cx",0).attr("fill-opacity",0).remove();
}

function fetch(start,stop){
  if(stop<=allData.length){
    update(allData.slice(start,stop));
  }
  else{
    var remainder = stop-allData.length;
    update(allData.slice(start, allData.length).concat(allData.slice(0,remainder)));
  }
}

</script>


</body>
<<13-final.html >>