Popular / About Sundar’s Block be2abfb3155a38be4de4
Updated August 29, 2015
d3 | Force layout with images

Open
Force layout test/experiment with images

Sources: - Force Layout - Force-based label placement - Collapsible force layout with directed paths and images/text in the nodes. - Labeled Force Layout

index.html#

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Marvel Characters | Force layout with images</title>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

    <style>
      @import url(http://fonts.googleapis.com/css?family=Source+Code+Pro:400,600);
      body {font-family: "Source Code Pro", Consolas, monaco, monospace; line-height: 160%; font-size: 16px;  margin: 0; }
      path.link {
        fill: none;
        stroke-width: 2px;
      }
      .node:not(:hover) .nodetext {
        display: none;
      }
      h1 { font-size: 36px; margin: 10px 0; text-transform: uppercase; font-weight: normal;}
      h2, h3 { font-size: 18px; margin: 5px 0 ; font-weight: normal;}
      header {padding: 20px; position: absolute; top: 0; left: 0;}
      a:link { color: #EE3124; text-decoration: none;}
      a:visited { color: #EE3124; }
      a:hover { color: #A4CD39; text-decoration: underline;}
      a:active { color: #EE3124; }
    </style>
</head>


<body>
    <header>
      <h1>Marvel Characters</h1>
      <h2>Click to view their identity</h2>
      <h3>And link to their web page!</h3>
    </header>
    <!-- container for force layout visualisation  -->
    <section id="vis"></section>
<script>

// some colour variables
  var tcBlack = "#130C0E";

// rest of vars
var w = 960,
    h = 800,
    maxNodeSize = 50,
    x_browser = 20,
    y_browser = 25,
    root;

var vis;
var force = d3.layout.force();

vis = d3.select("#vis").append("svg").attr("width", w).attr("height", h);

d3.json("data/marvel.json", function(json) {

  root = json;
  root.fixed = true;
  root.x = w / 2;
  root.y = h / 4;


        // Build the path
  var defs = vis.insert("svg:defs")
      .data(["end"]);


  defs.enter().append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

     update();
});


/**
 *
 */
function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force.nodes(nodes)
        .links(links)
        .gravity(0.05)
    .charge(-1500)
    .linkDistance(100)
    .friction(0.5)
    .linkStrength(function(l, i) {return 1; })
    .size([w, h])
    .on("tick", tick)
        .start();

   var path = vis.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    path.enter().insert("svg:path")
      .attr("class", "link")
      // .attr("marker-end", "url(#end)")
      .style("stroke", "#eee");


  // Exit any old paths.
  path.exit().remove();



  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id; });


  // Enter any new nodes.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", click)
      .call(force.drag);

  // Append a circle
  nodeEnter.append("svg:circle")
      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
      .style("fill", "#eee");


  // Append images
  var images = nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50);

  // make the image grow a little on mouse over and add the text details on click
  var setEvents = images
          // Append hero text
          .on( 'click', function (d) {
              d3.select("h1").html(d.hero);
              d3.select("h2").html(d.name);
              d3.select("h3").html ("Take me to " + "<a href='" + d.link + "' >"  + d.hero + " web page ⇢"+ "</a>" );
           })

          .on( 'mouseenter', function() {
            // select element in current context
            d3.select( this )
              .transition()
              .attr("x", function(d) { return -60;})
              .attr("y", function(d) { return -60;})
              .attr("height", 100)
              .attr("width", 100);
          })
          // set back
          .on( 'mouseleave', function() {
            d3.select( this )
              .transition()
              .attr("x", function(d) { return -25;})
              .attr("y", function(d) { return -25;})
              .attr("height", 50)
              .attr("width", 50);
          });

  // Append hero name on roll over next to the node as well
  nodeEnter.append("text")
      .attr("class", "nodetext")
      .attr("x", x_browser)
      .attr("y", y_browser +15)
      .attr("fill", tcBlack)
      .text(function(d) { return d.hero; });


  // Exit any old nodes.
  node.exit().remove();


  // Re-select for update.
  path = vis.selectAll("path.link");
  node = vis.selectAll("g.node");

function tick() {


    path.attr("d", function(d) {

     var dx = d.target.x - d.source.x,
           dy = d.target.y - d.source.y,
           dr = Math.sqrt(dx * dx + dy * dy);
           return   "M" + d.source.x + ","
            + d.source.y
            + "A" + dr + ","
            + dr + " 0 0,1 "
            + d.target.x + ","
            + d.target.y;
  });
    node.attr("transform", nodeTransform);
  }
}


/**
 * Gives the coordinates of the border for keeping the nodes inside a frame
 * http://bl.ocks.org/mbostock/1129492
 */
function nodeTransform(d) {
  d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
    d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
    return "translate(" + d.x + "," + d.y + ")";
   }

/**
 * Toggle children on click.
 */
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }

  update();
}


/**
 * Returns a list of all nodes under the root.
 */
function flatten(root) {
  var nodes = [];
  var i = 0;

  function recurse(node) {
    if (node.children)
      node.children.forEach(recurse);
    if (!node.id)
      node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}


</script>

</body>
</html>
marvel.json#

{
 "name": "marvel",
 "img": "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/marvel.png",
 "children": [
  {
   "name": "Heroes",
   "children": [
    {
      "hero": "Spider-Man",
      "name": "Peter Benjamin Parker",
      "link": "http://marvel.com/characters/54/spider-man",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_spiderman.png",
      "size": 40000
    },
    {
      "hero": "CAPTAIN MARVEL",
      "name": "Carol Danvers",
      "link": "http://marvel.com/characters/9/captain_marvel",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_captainmarvel.png",
      "size": 40000
    },
    {
      "hero": "HULK",
      "name": "Robert Bruce Banner",
      "link": "http://marvel.com/characters/25/hulk",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_hulk.png",
      "size": 40000
    },
    {
      "hero": "Black Widow",
      "name": "Natalia 'Natasha' Alianovna Romanova",
      "link": "http://marvel.com/characters/6/black_widow",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_blackwidow.png",
      "size": 40000
    },
    {
      "hero": "Daredevil",
      "name": "Matthew Michael Murdock",
      "link": "http://marvel.com/characters/11/daredevil",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_daredevil.png",
      "size": 40000
    },
    {
      "hero": "Wolverine",
      "name": "James Howlett",
      "link": "http://marvel.com/characters/66/wolverine",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_wolverine.png",
      "size": 40000
    },
    {
      "hero": "Captain America",
      "name": "Steven Rogers",
      "link": "http://marvel.com/characters/8/captain_america",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_captainamerica.png",
      "size": 40000
    },
    {
      "hero": "Iron Man",
      "name": "Anthony Edward 'Tony' Stark",
      "link": "http://marvel.com/characters/29/iron_man",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_ironman.png",
      "size": 40000
    },
    {
      "hero": "THOR",
      "name": "Thor Odinson",
      "link": "http://marvel.com/characters/60/thor",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/top_thor.png",
      "size": 40000
    }
  ]
  },
  {
   "name": "Villains",
   "children": [
    {
      "hero": "Dr. Doom",
      "name": "Victor von Doom",
      "link": "http://marvel.com/characters/13/dr_doom",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/drdoom.png",
      "size": 40000
    },
    {
      "hero": "Mystique",
      "name": "Unrevealed",
      "link": "http://marvel.com/characters/1552/mystique",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/mystique.png",
      "size": 40000
    },
    {
      "hero": "Red Skull",
      "name": "Johann Shmidt",
      "link": "http://marvel.com/characters/1901/red_skull",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/redskull.png",
      "size": 40000
    },
    {
      "hero": "Ronan",
      "name": "Ronan",
      "link": "http://marvel.com/characters/49/ronan",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/ronan.png",
      "size": 40000
    },
    {
      "hero": "Magneto",
      "name": "Max Eisenhardt",
      "link": "http://marvel.com/characters/35/magneto",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/magneto.png",
      "size": 40000
    },
    {
      "hero": "Thanos",
      "name": "Thanos",
      "link": "http://marvel.com/characters/58/thanos",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/thanos.png",
      "size": 40000
    },
    {
      "hero": "Black Cat",
      "name": "Felicia Hardy",
      "link": "http://marvel.com/characters/271/black_cat",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/blackcat.png",
      "size": 40000
    }
   ]
  },
  {
   "name": "Teams",
   "children": [
    {
      "hero": "Avengers",
      "name": "",
      "link": "http://marvel.com/characters/68/avengers",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/avengers.png",
      "size": 40000
    },
    {
      "hero": "Guardians of the Galaxy",
      "name": "",
      "link": "http://marvel.com/characters/70/guardians_of_the_galaxy",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/gofgalaxy.png",
      "size": 40000
    },
    {
      "hero": "Defenders",
      "name": "",
      "link": "http://marvel.com/characters/534/defenders",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/defenders.png",
      "size": 40000
    },
    {
      "hero": "X-Men",
      "name": "",
      "link": "http://marvel.com/characters/71/x-men",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/xmen.png",
      "size": 40000
    },
    {
      "hero": "Fantastic Four",
      "name": "",
      "link": "http://marvel.com/characters/69/fantastic_four",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/fantasticfour.png",
      "size": 40000
    },
    {
      "hero": "Inhumans",
      "name": "",
      "link": "http://marvel.com/characters/1040/inhumans",
      "img":  "https://dl.dropboxusercontent.com/u/19954023/marvel_force_chart_img/inhumans.png",
      "size": 40000
    }
   ]
  }
 ]
}