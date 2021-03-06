$(document).ready(function()	{
	
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 40
	}, width = 725 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width]);
	
	var y = d3.scale.linear()
		.range([height, 0]);

	var formatCurrency = d3.format(",");

	var div = d3.select("body")
		.append("div")
			.attr("id", "schoolinfo")
			.style("opacity", 0);

	//var color = d3.scale.category10();
	var color = d3.scale.ordinal()
		.domain([1, 2, 3])
		.range(["rgb(53,135,212)", "rgb(77, 175, 74)", "rgb(228, 26, 28)"]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("#chart")
		.append("svg")
			.attr("class", "chart")
			.attr("viewBox", "0 0 725 600")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("shelter_analysis.csv", function(error, data) {

		x.domain([0, 100]).nice();
		y.domain([0, 3.5]).nice();

		//x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", -6)
				.style("text-anchor", "end")
				.text("Adoption Ratio (%)");

		//y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Avg. Adoption Period Length In Years")

		//legend y position
		var LYP = 300, 
			LXP = 570;
			
		svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP).text("Animal Type").style("font-weight", "bold");

		//color legend
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 20).attr("r", 12).style("fill", "rgb(53, 135, 212)").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 25).style("text-anchor", "start").text(function(d) {
			return "Cat";
		});
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 50).attr("r", 12).style("fill", "rgb(77, 175, 74)").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 55).style("text-anchor", "start").text(function(d) {
			return "Dog";
		});
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80).attr("r", 12).style("fill", "rgb(228, 26, 28)").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 85).style("text-anchor", "start").text(function(d) {
			return "Other";
		});
		svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP + 110).text("Average Animal Totals").style("font-weight", "bold");

		//size legend
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 30 + 110).attr("r", 20).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 140).style("text-anchor", "start").text("10,000+");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 60 + 110).attr("r", 15).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 170).style("text-anchor", "start").text("5,000");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80 + 110).attr("r", 9).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 190).style("text-anchor", "start").text("1,000");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 93 + 110).attr("r", 4).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 210).style("text-anchor", "start").text("500+");


		//circles
		svg.selectAll(".dot")
			.data(data.sort(
				function(d) {
					return 4 + (d.Total2013 * .002);
				}))
			.enter()
			.append("circle")
				.attr("class", "dot")
				.attr("r", 
					function(d) {
						return (4 + (d.Total2013 * .002));
					})//gave it a base 4 plus a proportional amount to the enrollment
				.attr("cx", 
					function(d) {
						return x(d.ratio2013);
					})
				.attr("cy", 
					function(d) {
						return y(d.age2013);
					})
				.style("fill", 
					function(d) {
						if (d.type == 3) {
							return "rgb(228, 26, 28)";
						} else if (d.type == 2) {
							return "rgb(77, 175, 74)";
						} else if (d.type == 1) {
							return "rgb(53, 135, 212)";
						}
					});
				
		var running = false;
		var timer;
		
		$("button").on("click", function() {
		
			var duration = 3000,
				maxstep = 2018,
				minstep = 2013;
			
			if (running == true) {
			
				$("button").html("Play");
				running = false;
				clearInterval(timer);
				
			} 
			/*
else if (running == true && $("#slider").val() == maxstep) {
				 running = true;
				 $("button").html("Play1");
				 
			
			} 
*/
			else if (running == false) {
			
				$("button").html("Pause");
				
				sliderValue = $("#slider").val();
				
				timer = setInterval( function(){
						if (sliderValue < maxstep){
							sliderValue++;
							$("#slider").val(sliderValue);
							$('#range').html(sliderValue);
						}
						$("#slider").val(sliderValue);
						update();
					
				}, duration);
				running = true;
				
				
			}

		});
	
		$("#slider").on("change", function(){
			update();
			$("#range").html($("#slider").val());
			clearInterval(timer);
			$("button").html("Play");
		});
	
		update = function() {
		
			d3.selectAll(".dot")
				.transition()
				.duration(1000)
				.attr("cy", function(d) {
			
					switch ($("#slider").val()) {
						case "2013":
							return y(d.age2013);
							break;
						case "2014":
							return y(d.age2014);
							break;
						case "2015":
							return y(d.age2015);
							break;
						case "2016":
							return y(d.age2016);
							break;
						case "2017":
							return y(d.age2017);
							break;
						case "2018":
							return y(d.age2018);
							break;
					}
				})
				.transition()
				.duration(1000)
				.attr("cx", function(d) {
					switch ($("#slider").val()) {
						case "2013":
							return x(d.ratio2013);
							break;
						case "2014":
							return x(d.ratio2014);
							break;
						case "2015":
							return x(d.ratio2015);
							break;
						case "2016":
							return x(d.ratio2016);
							break;
						case "2017":
							return x(d.ratio2017);
							break;
						case "2018":
							return x(d.ratio2018);
							break;
					}
				})
				.transition()
				.duration(1000)
				.attr("r", function(d) {
					switch ($("#slider").val()) {
						case "2013":
							return (4 + (d.Total2013 * .002));
							break;
						case "2014":
							return (4 + (d.Total2014 * .002));
							break;
						case "2015":
							return (4 + (d.Total2015 * .002));
							break;
						case "2016":
							return (4 + (d.Total2016 * .002));
							break;
						case "2017":
							return (4 + (d.Total2017 * .002));
							break;
						case "2018":
							return (4 + (d.Total2018 * .002));
							break;
					}
				});
		};
		
	});

});
