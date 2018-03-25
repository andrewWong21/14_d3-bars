
//buttons
var changeButton = document.getElementById("changeButton");


//data taken from http://federal-budget.insidegov.com/compare/115-119-121/2012-vs-2016-vs-2018-Estimate
//total surplus / deficit deficit as %GDP
var percentData = [[2012,-6.8],[2016,-3.3],[2018,-2.3]];

//total surplus / deficit 
//data taken from http://federal-budget.insidegov.com/compare/50-53-103/1948-vs-1951-vs-2000
//data in trillions
var totalData = [[1948,88.6],[1951,42.7],[2000,290]];

isPercent = false;

var updateGraph = function(){
    var chart = d3.select(".chart");
    var button = d3.selectAll("button");
    var header = d3.select("#header");
    var dataSet = null;
    if (isPercent){
        dataSet = percentData;
        header.text("total surplus / deficit deficit as %GDP");
        button.text("change to total surplus - deficit data");
    }
    else{
        dataSet = totalData;
        header.text("total surplus - deficit in billions");
        button.text("change to percent GDP data");
    }
    
    //remove all the divs if any divs exist
    chart.selectAll("div").remove();

    //update with new data
    var bar = chart.selectAll("div");
    var barUpdate = bar.data(dataSet);
    var barEnter = barUpdate.enter().append("div");
    barEnter.transition()
        .duration( function(d){
            if (isPercent){
                return Math.abs(d[1]) * 1000;
            }
            else{
                return Math.abs(d[1])*100; ; 
            }
             
        })
        .style("width", function(d) {
            if (isPercent){
                return Math.abs(d[1]) * 100 + "px";
            }
            else{
                return Math.abs(d[1]) * 1 + 500 + "px"; 
            }})
        .style("background-color", function(d){
            if (isPercent && d[1] < 0){
                return "orange";
            }
            return "lightsteelblue"; })
        .text(function(d){
            if (isPercent){
                return d[0] + ": " + d[1] + "%";
            }
            else{
                return d[0] + ": " + d[1] + " billion";
            }
        });
    isPercent = !isPercent;
    console.log(isPercent + " " + dataSet[0]);
};

updateGraph();
changeButton.addEventListener("click", updateGraph);

