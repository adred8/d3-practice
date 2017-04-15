function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var studentData = [{"sub1": 23, "sub2": 43, "sub3": 51}];
for (var i = 1; i < 50; i++){
  var subArr = {"sub1": getRandomIntInclusive(0, 100),
                "sub2": getRandomIntInclusive(0, 100),
                "sub3": getRandomIntInclusive(0, 100)};
  studentData.push(subArr);
}
var sortedStudentDataSub1 = {"0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0};
var sortedSub1 = [0, 0, 0, 0, 0];
var sortedStudentDataSub2 = {"0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0};
var sortedSub2 = [0, 0, 0, 0, 0];
var sortedStudentDataSub3 = {"0-20": 0, "21-40": 0, "41-60": 0, "61-80": 0, "81-100": 0};
var sortedSub3 = [0, 0, 0, 0, 0];
for (var i = 0; i < 50; i++){
  if (studentData[i].sub1 < 21){
    sortedStudentDataSub1["0-20"]++;
    sortedSub1[0]++;
  }
  else if (studentData[i].sub1 < 41) {
    sortedStudentDataSub1["21-40"]++;
    sortedSub1[1]++;
  }
  else if (studentData[i].sub1 < 61) {
    sortedStudentDataSub1["41-60"]++;
    sortedSub1[2]++;
  }
  else if (studentData[i].sub1 < 81) {
    sortedStudentDataSub1["61-80"]++;
    sortedSub1[3]++;
  }
  else{
    sortedStudentDataSub1["81-100"]++;
    sortedSub1[4]++;
  }

  if (studentData[i].sub2 < 21){
    sortedStudentDataSub2["0-20"]++;
    sortedSub2[0]++;
  }
  else if (studentData[i].sub2 < 41) {
    sortedStudentDataSub2["21-40"]++;
    sortedSub2[1]++;
  }
  else if (studentData[i].sub2 < 61) {
    sortedStudentDataSub2["41-60"]++;
    sortedSub2[2]++;
  }
  else if (studentData[i].sub2 < 81) {
    sortedStudentDataSub2["61-80"]++;
    sortedSub2[3]++;
  }
  else{
    sortedStudentDataSub2["81-100"]++;
    sortedSub2[4]++;
  }

  if (studentData[i].sub3 < 21){
    sortedStudentDataSub3["0-20"]++;
    sortedSub3[0]++;
  }
  else if (studentData[i].sub3 < 41) {
    sortedStudentDataSub3["21-40"]++;
    sortedSub3[1]++;
  }
  else if (studentData[i].sub3 < 61) {
    sortedStudentDataSub3["41-60"]++;
    sortedSub3[2]++;
  }
  else if (studentData[i].sub3 < 81) {
    sortedStudentDataSub3["61-80"]++;
    sortedSub3[3]++;
  }
  else{
    sortedStudentDataSub3["81-100"]++;
    sortedSub3[4]++;
  }
}
var sortedStudentData = [];
sortedStudentData.push(sortedStudentDataSub1);
sortedStudentData.push(sortedStudentDataSub2);
sortedStudentData.push(sortedStudentDataSub3);
var studentDataSub1 = [];
var studentDataSub2 = [];
var studentDataSub3 = [];
for (var i = 0; i < 50; i++){
  studentDataSub1.push(studentData[i].sub1);
  studentDataSub2.push(studentData[i].sub2);
  studentDataSub3.push(studentData[i].sub3)
}
var subjectDisplay = studentDataSub1;
var compareDisplay = sortedSub1;

$(document).ready( function(){
  if (document.cookie !== "username=admin"){
    window.location.href = "index.html";
  }
  $(".logout-button").on('click', function(){
    document.cookie = "username=admin; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  });
  $(document).on('change','#subject-select-box',function(){
    var selectedVal = $( "#subject-select-box option:selected" ).text();
    if (selectedVal === "subject 1"){
      console.log("sub1");
      subjectDisplay = studentDataSub1;
      compareDisplay = sortedSub1;
      d3.selectAll("svg").remove();
      graphDisplay(subjectDisplay, compareDisplay);
    }
    if (selectedVal === "subject 2"){
      console.log("sub2");
      subjectDisplay = studentDataSub2;
      compareDisplay = sortedSub2;
      d3.selectAll("svg").remove();
      graphDisplay(subjectDisplay, compareDisplay);
    }
    if (selectedVal === "subject 3"){
      console.log("sub3");
      subjectDisplay = studentDataSub3;
      compareDisplay = sortedSub3;
      d3.selectAll("svg").remove();
      graphDisplay(subjectDisplay, compareDisplay);
    }
  });
});

console.log(compareDisplay);
/////////////////////////////////////////////////////////////////////////////////
// Graph update function
////////////////////////////////////////////////////////////////////////////////
function graphDisplay(subjectDisplay, compareDisplay){

  var svgWidth = 650;
  var svgHeight = 400;
  var studentCanvas = d3.select(".practice-section").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("background", "#FFFDE7")
    .style("box-shadow", "1px 1px 6px 1px lightgray")
    .append("g")
      .attr("transform", "translate(30, -50)");

  console.log(studentDataSub1);
  var studentBarWidth = 10;
  var studentBarOffset = 2;
  var studentColorScale = d3.scaleLinear()
    .domain([0, d3.max(subjectDisplay)])
    .range(["#FFEB3B", "#00BCD4"]);
  var studentYScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, (svgHeight/2)]);
  var yAxisScale = d3.scaleLinear()
    .domain([0, 100])
    .range([svgHeight/2, 0]);
  var yAxis = d3.axisLeft(yAxisScale);
  var studentXScale = d3.scaleBand()
    .domain(d3.range(1, 51))
    .rangeRound([0, (svgWidth-30)]);
  var xAxis = d3.axisBottom(studentXScale);

  studentCanvas.selectAll("rect")
    .data(subjectDisplay)
    .enter()
    .append("rect")
      .attr("fill", function(d){ return studentColorScale(d); })
      .attr("width", studentBarWidth)
      .attr("height", function(d){ return studentYScale(d); })
      .attr("x", function(d, i){ return i* ( studentBarWidth + studentBarOffset ); })
      .attr("y", function(d){ return (svgHeight-studentYScale(d)); })
      .on("mouseover", function(d, i){
        console.log(3);
        tooltip.transition()
          .style("opacity", 1);
        tooltip.text("Student " + (i + 1) + " : " + d + " marks")
          .style("left", (d3.event.pageX + 15) + 'px')
          .style("top", (d3.event.pageY + 15) + 'px')
        d3.select(this)
          .style("opacity", ".5");
      })
      .on("mouseout", function(d){
        tooltip.transition()
          .style("opacity", "0");
        d3.select(this)
          .style("opacity", "1");
      })
  studentCanvas.append("g")
    .attr("transform", "translate(0, 200)")
    .call(yAxis);
  studentCanvas.append("g")
    .attr("transform", "translate(-10, 410)")
    .call(xAxis);

  var tooltip = d3.select(".practice-section").append("section")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("min-width", "30px")
    .style("background", "#f4f4f4")
    .style("padding", "5 15px")
    .style("border", "1px #333 solid")
    .style("border-radius", "1px")
    .style("opacity", "0")
    .style("padding", "2px")
    .style("text-align", "center")



  //////////////////////////////////////////////////////////////////////////////
  // second graph display
  //////////////////////////////////////////////////////////////////////////////
  var radius = svgHeight/2;

  //defining svg
  var compareCanvas = d3.select(".more-practice-section").append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .style("background", "#FFFDE7")
  .style("box-shadow", "1px 1px 6px 1px lightgray")
  .append("g")
    .attr("transform", "translate(330, 200)");

  //arc generator
  var arc = d3.arc()
    .outerRadius(radius - 60)
    .innerRadius(radius - 100);

  //pie generator
  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d; });

  var compareColorScale = d3.scaleLinear()
    .domain([0, 5])
    .range(["#E91E63", "#F8BBD0"]);

  var compareYLabel = ["0 - 20", "21 - 40", "41 - 60", "61 - 80", "81 - 100"];
  var theArc = compareCanvas.selectAll(".donut-arc")
    .data(pie(compareDisplay))
    .enter()
    .append("g")
    .attr("class", "donut-arc");

  theArc.append("path")
    .attr("d", arc)
    .attr("fill", function(d, i){
      return compareColorScale(i);
    })
    // .on("mouseover", function(d, i){
    //   console.log(3);
    //   tooltip.transition()
    //     .style("opacity", 1);
    //   // compareYLabel[i] + " : " + d
    //   tooltip.text(function(d, i){ return;})
    //     .style("left", (d3.event.pageX + 15) + 'px')
    //     .style("top", (d3.event.pageY + 15) + 'px')
    //   d3.select(this)
    //     .style("opacity", ".5");
    // })
    // .on("mouseout", function(d){
    //   tooltip.transition()
    //     .style("opacity", "0");
    //   d3.select(this)
    //     .style("opacity", "1");
    // });


  theArc.append("text")
    .attr("transform", function(d){
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", "1.5em")
    .text(function(d) { return d.data; })
    .style("font-weight", "500")
    .style("font-size", "13px");

}
graphDisplay(subjectDisplay, compareDisplay);
