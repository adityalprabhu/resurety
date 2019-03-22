import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { DataService } from '../services/dataService/dataService'

@Component({
  selector: 'app-scatterplot-gen-chart',
  templateUrl: './scatterplot-gen-chart.component.html',
  styleUrls: ['./scatterplot-gen-chart.component.css']
})

export class ScatterplotGenChartComponent implements OnInit {
  title = 'Capacity vs Annual Generation ';
  description = "This graph is a CapacityMW vs GenerationMWhPerYear scatter plot graph where the x-axis is CapacityMW which indicates the maximum possible 'nameplate capacity' power generation in MW, and y-axis is GenerationMWhPerYear, which is average annual energy generation in MW-hours."

  private svg: any;

  data: any;
  subscription: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getWindData();
  }

  getWindData() {
    this.subscription = this.dataService.windData$.subscribe(
      res => {
        if (res) {
          this.createGraph(res)
        }
      });
  }

  private createGraph = (data) => {

    var margin = { top: 40, right: 40, bottom: 40, left: 100 },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var svg = d3.select(".genchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .range([0, width]);

    var y = d3.scaleLinear()
      .range([height, 0]);

    var xAxis = d3.axisBottom(x)
    var yAxis = d3.axisLeft(y)


    y.domain(d3.extent(data, function (d) { return +d['"GenerationMWhPerYear"'] }));
    x.domain(d3.extent(data, function (d) { return +d['"CapacityMW"'] }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("x", width)
      .attr("dy", "-0.71em")
      .attr("text-anchor", "end")
      .text("CapacityMW");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr('dy', '20em')
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("GenerationMWhPerYear");

    svg.selectAll(".point")
      .data(data)
      .enter().append("circle")
      .attr("class", "point")
      .attr("fill", "#7A99AC")
      .attr("stroke", "#444")
      .attr("r", 3)
      .style("display", function (d) { return d['"GenerationMWhPerYear"'] ? null : "none"; })
      .attr("cy", function (d) { return y(d['"GenerationMWhPerYear"']); })
      .attr("cx", function (d) { return x(d['"CapacityMW"']) });
  }
}