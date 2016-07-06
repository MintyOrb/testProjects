function t(_) { return 'translate(' + _ + ')'; }
function u(a, l) { return [Math.cos(a) * l, Math.sin(a) * l]; }
function tu(a, l) { return t(u(a, l)); }
function plus(x, y) { return x.map(function(_) { return _ + y; }); }
function l(len, by) {
    return d3.svg.line()
        .x(function(x) { return (x == -1) ? 0 : len * Math.cos(Math.PI * 2 * (x / by)); })
        .y(function(x) { return (x == -1) ? 0 : len * Math.sin(Math.PI * 2 * (x / by)); });
}

var s = Math.sqrt(3) * 100,
    w = 500, g = d3.select('body').append('svg')
    .attr({ width: w, height: w })
    .append('g').attr('transform', t([w/2,w/2]));

g.append('circle').attr({ 'class': 'a', r: 200 });
g.append('circle').attr({ 'class': 'a', r: 100 });

g.selectAll('circle.b')
    .data(plus(d3.range(0,6), 0.5))
    .enter().append('circle')
    .attr({ 'class': 'b', r: 100,
        transform: function(d) {
            return tu(((Math.PI * 2) / 6) * d, 100);
        }
    });

g.selectAll('path.b')
    .data([plus(d3.range(0,4), 0.25), plus(d3.range(0,4), -0.25)])
    .enter().append('path').attr({ 'class': 'b', d: l(200, 3) });

g.selectAll('path.c')
    .data([plus(d3.range(0,4), -0.25)])
    .enter().append('path').attr({ 'class': 'c', d: l(100, 3) });

g.selectAll('group.d')
    .data(d3.range(1,7).map(function(d) { return [-1, d, d + 1]; }))
    .enter().append('path')
    .attr({ 'class': 'd', d: l(s, 6)});