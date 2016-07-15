var a = -90, b = 0, c = 90, d = 180;
var g = d3.select('#vis')// select and then select all?
// In d3's data join paradigm, you select the elements you want to bind data to.
// If those elements don't exist yet, d3 knows to place them in the Enter selection
// so you can address them using .enter(). The article linked in your question is the
// best explanation of this. I urge you to go over it again.
    .selectAll('svg')
    //The basic difference between select and selectAll is that select
    //squashes the hierarchy of the existing selections, while selectAll preserves it.
    .data([a, b, a, b, d,
           c, d, d, a, a,// this is a funny way to build the array...why not directly place values or do it generativly?
           b, a, d, b, c,
           b, c, b, c, b,
           c, d, c, d, b])
    .enter()// eneter each point to modify?
      .append('svg')
      .attr({ width: 80, height: 80 })
      .append('g') // g = group
      .attr('transform', function(d) { console.log(d);return 'rotate(' + d + ', 40, 40)'; });

var line = d3.svg.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; });

function unit(angle) { return [Math.cos(angle), Math.sin(angle)]; }
function mult(x, y) { return x.map(function(_) { return _ * y; }); }

function gen(i) {
   var angle = Math.PI * 0.5 * (i / 30);
   return [[0, 0],
      mult(unit(angle), (1 / Math[(angle < Math.PI/4) ? 'cos' : 'sin'](angle) * 80))
   ];
}

g.selectAll('path.a')
    .data(d3.range(0, 31).map(gen))
    .enter().append('path')
    .attr({ 'class': 'a', d: line });