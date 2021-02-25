function drawGraph(data){
  data = convertToArray(data);

  data = data.sort(function (a, b) {
    return d3.ascending(a.value, b.value);
  })

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  var margin = {
    top: 15,
    right: 30,
    bottom: 15,
    left: 200
  };

  var width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#graphic").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.linear()
    .range([0, width])
    .domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

  var y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], .1)
    .domain(data.map(function (d) {
      return d.name;
    }));

  //make y axis to show bar names
  var yAxis = d3.svg.axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient("left");

  var gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

  var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

  //append rects
  bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function (d) {
      return x(d.value);
    });

  //add a value label to the right of each bar
  bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
      return y(d.name) + y.rangeBand() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
      return x(d.value) + 3;
    })
    .text(function (d) {
      return d.value;
    });
}

function convertToArray(data){
  const convertedData = [];
  for (let key in data) {
    convertedData.push({name:key, value:data[key]});
  }

  return convertedData;
}

function clearGraph(){
  const graphic = document.getElementById('graphic');
  if (graphic.hasChildNodes()) {
    graphic.removeChild(graphic.childNodes[0]);
  }
}