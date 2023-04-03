function finalproject(){
    var filePath1="prem_all_years.csv";
    var filePath2="EPL_Standings_2000-2022.csv";
    var filePath3="stadiums-with-GPS-coordinates-parsed.csv";
    league_titles_barchart(filePath2)
    england_choropleth(filePath3)
    shots_scatter(filePath1)
    streamgraph(filePath1)
    node_linked_diagram(filePath1)

}
var node_linked_diagram=function(filePath1){
    var topsix = ["Man United", "Man City", "Arsenal", "Liverpool", "Chelsea", "Tottenham"];
    var teamsDict = {};
    topsix.forEach(function(team){
        teamsDict[team] = {
            'Team': team,
            'HScore': 0,
            'AScore': 0,
            'HDraws': 0,
            'ADraws': 0,
            'TotalPoints' : 0
        };
    });
    var rowConverter5 = function(d){
        if(topsix.includes(d.HomeTeam) && topsix.includes(d.AwayTeam)) {
            var homeTeamDict = teamsDict[d.HomeTeam];
            var awayTeamDict = teamsDict[d.AwayTeam];
            var hScore = 3*d.FTR.split('H').length - 3;
            var aScore = 3*d.FTR.split('A').length - 3;
            var hDraws = d.FTR.split('D').length - 1;
            var aDraws = d.FTR.split('D').length - 1;
            homeTeamDict['HScore'] += hScore;
            homeTeamDict['HDraws'] += hDraws;
            awayTeamDict['AScore'] += aScore;
            awayTeamDict['ADraws'] += aDraws;
            homeTeamDict["TotalPoints"] += hScore + hDraws
            awayTeamDict["TotalPoints"] += aScore + aDraws
        }
    };
    d3.csv(filePath1, rowConverter5).then(function(data){
        var teamsList = Object.values(teamsDict);
        console.log(teamsList);

        var data={
            "nodes":[
                {id: 1, name: 'Man United', x: 87, y: 145,TotalPoints:329}, 
                {id: 2, name: 'Man City', x: 176, y: 94,TotalPoints:242},  
                {id: 3, name: 'Arsenal', x: 249, y: 162,TotalPoints:281}, 
                {id: 4, name: 'Liverpool', x: 208, y: 253,TotalPoints:304}, 
                {id: 5, name: 'Chelsea', x: 105, y: 246,TotalPoints:333}, 
                {id: 6, name: 'Tottenham', x: 140, y: 120,TotalPoints:219}
            ],
            "edges":[{'source': {id: 1, name: 'Man United', x: 87, y: 145,TotalPoints:329}, 
                      'target': {id: 2, name: 'Man City', x: 176, y: 94,TotalPoints:242},
                     'headtohead':70},
                     {'source': {id: 1, name: 'Man United', x: 87, y: 145,TotalPoints:329}, 
                      'target': {id: 3, name: 'Arsenal', x: 249, y: 162,TotalPoints:281},
                     'headtohead':55},
                     {'source': {id: 1, name: 'Man United', x: 87, y: 145,TotalPoints:329}, 
                      'target': {id: 4, name: 'Liverpool', x: 208, y: 253,TotalPoints:304},
                     'headtohead':75},
                     {'source': {id: 1, name: 'Man United', x: 87, y: 145,TotalPoints:329}, 
                      'target': {id: 5, name: 'Chelsea', x: 105, y: 246,TotalPoints:333},
                     'headtohead':98},
                     {'source': {id: 1, name: 'Man United', x: 87, y: 145,TotalPoints:329}, 
                      'target': {id: 6, name: 'Tottenham', x: 140, y: 120,TotalPoints:219},
                     'headtohead':80},
                     {'source': {id: 2, name: 'Man City', x: 176, y: 94,TotalPoints:242}, 
                      'target': {id: 3, name: 'Arsenal', x: 249, y: 162,TotalPoints:281},
                     'headtohead':40},
                     {'source': {id: 2, name: 'Man City', x: 176, y: 94,TotalPoints:242}, 
                      'target': {id: 4, name: 'Liverpool', x: 208, y: 253,TotalPoints:304},
                     'headtohead':63},
                     {'source': {id: 2, name: 'Man City', x: 176, y: 94,TotalPoints:242}, 
                      'target': {id: 5, name: 'Chelsea', x: 105, y: 246,TotalPoints:333},
                     'headtohead':88},
                     {'source': {id: 2, name: 'Man City', x: 176, y: 94,TotalPoints:242}, 
                     'target': {id: 6, name: 'Tottenham', x: 140, y: 120,TotalPoints:219},
                    'headtohead':40},
                     {'source': {id: 3, name: 'Arsenal', x: 249, y: 162,TotalPoints:281}, 
                      'target': {id: 4, name: 'Liverpool', x: 208, y: 253,TotalPoints:304},
                     'headtohead':40},
                     {'source': {id: 3, name: 'Arsenal', x: 249, y: 162,TotalPoints:281}, 
                      'target': {id: 5, name: 'Chelsea', x: 105, y: 246,TotalPoints:333},
                     'headtohead':40},
                     {'source': {id: 3, name: 'Arsenal', x: 249, y: 162,TotalPoints:281}, 
                      'target': {id: 6, name: 'Tottenham', x: 140, y: 120,TotalPoints:219},
                     'headtohead':40},
                     {'source': {id: 4, name: 'Liverpool', x: 208, y: 253,TotalPoints:304}, 
                      'target': {id: 5, name: 'Chelsea', x: 105, y: 246,TotalPoints:333},
                     'headtohead':40},
                     {'source': {id: 4, name: 'Liverpool', x: 208, y: 253,TotalPoints:304}, 
                      'target': {id: 6, name: 'Tottenham', x: 140, y: 120,TotalPoints:219},
                     'headtohead':40},
                     {'source': {id: 5, name: 'Chelsea', x: 105, y: 246,TotalPoints:333}, 
                      'target': {id: 6, name: 'Tottenham', x: 140, y: 120,TotalPoints:219},
                     'headtohead':40},
                     ]
        }
        data["links"]=[]
    
        for(var i=0;i<data.edges.length;i++){
            var obj={}
            obj["source"]=data.edges[i]["source"].id;
            obj["target"]=data.edges[i]["target"].id;
            obj["chem"]=data.edges[i]["chem"]
            data.links.push(obj);
        }

        var width=800;
        var height=500;
        var margin={
            top:50,bottom:50,left:50,right:50
        }
        const svg=d3.select("#nodelinked")
            .append("svg")
            .attr("width",width-margin.right-margin.left)
            .attr("height",height-margin.top-margin.bottom)

        let strength_factor = -2000
        let r = 15
        var force = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(function(d) { return d.id;}))
            .force("charge", d3.forceManyBody().strength(strength_factor))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(function(d){
                return r
            }))
        let stroke_scaling = 30

        var rScale = d3.scaleLinear()
            .domain([d3.min(data["nodes"], function(d) { return d.TotalPoints; }), d3.max(data["nodes"], function(d) { return d.TotalPoints; })])
            .range([5, 20]);

        var link = svg.selectAll("line")
            .data(data["links"])
            .enter()
            .append("line")
            .attr("stroke", "gray")


        var node = svg.selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .style("fill", "green")
            .attr("r", function(d) {return rScale(d.TotalPoints)});

        var text = svg.append("g")
            .attr("class", "text");

        var label = svg.selectAll("text")
            .data(data.nodes)
            .enter()
            .append("text")
            .text(function(d) { return d.name;})
            .attr("font-size", "12px")
            .attr("fill", "black")
            .attr("text-anchor", "middle");

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
                
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })

            label.attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; });
                
            svg.append("text")
                .attr("x", 35)
                .attr("y", 95)
                .text("Number of Points"); 
            })
        svg.append("text")
            .attr("x", (width) / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .style("font-weight", "bold")
            .text("Head to Head Performances Between Big Six");

        var minSize = d3.min(teamsList, function(d) { return d.TotalPoints; });
        var maxSize = d3.max(teamsList, function(d) { return d.TotalPoints; });
        var sizeScale = d3.scaleLinear()
                        .domain([minSize, maxSize])
                        .range([5, 20]);

        legend_scaling = 55
        var legend = svg.selectAll(".circlelegend")
                            .data([minSize, (minSize+maxSize)/2, maxSize])
                            .enter().append("g")
                            .attr("class", "circlelegend")
                            .attr("transform", function(d, i) {
                                return "translate(70," + (i * legend_scaling + 100) + ")";
                            });

        legend.append("circle")
            .attr("cx", 10)
            .attr("cy", 10)
            .attr("r", function(d) { return sizeScale(d); })
            .attr("fill", "green")

        legend.append("text")
            .attr("x", 30)
            .attr("y", 10)
            .attr("dy", ".35em")
            .text(function(d) { return d; });
            });   
    };

var streamgraph=function(filePath1){
    var topsix = ["Man United", "Man City", "Arsenal", "Liverpool", "Chelsea", "Tottenham"];
    var rowConverter4 = function(d){
        if (topsix.includes(d.HomeTeam)) {
            return {
                Team: d.HomeTeam,
                ShotsTargetConceded: parseInt(d.AST),
                GoalsConceded: parseInt(d.FTAG),
                CornersConceded: parseInt(d.AC)
            }
        } else if (topsix.includes(d.AwayTeam)) {
            return {
                Team: d.AwayTeam,
                ShotsTargetConceded: parseInt(d.HST),
                GoalsConceded: parseInt(d.FTHG),
                CornersConceded: parseInt(d.HC)
            }
        }
    }
    d3.csv(filePath1, rowConverter4).then(function(data){
        var height = 500
        var width = 800
        var padding=20
        var svg = d3.select("#streamgraph")
        .append("svg").attr("width", width).attr("height", height);
        var keys = ['ShotsTargetConceded', 'CornersConceded', 'GoalsConceded']
        // console.log(data)
        mean_vals = d3.rollup(data, x=> ({ShotsTargetConceded: d3.mean(x, d => d.ShotsTargetConceded),
             CornersConceded: d3.mean(x, d => d.CornersConceded),GoalsConceded: d3.mean(x, d => d.GoalsConceded)}) , d=> d.Team)

        const mean_vals_dict = Array.from(mean_vals, ([key, value]) => ({
            Team: key,
            ShotsTargetConceded: value.ShotsTargetConceded,
            CornersConceded: value.CornersConceded,
            GoalsConceded: value.GoalsConceded

           }));

        var xScale = d3.scaleBand()
            .domain(data.map(d=>d.Team))
            .range([padding, width/1.1])
            .padding(0.1)

        var yScale = d3.scaleLinear()
            .domain([0,d3.max(mean_vals_dict, function(d){return d.ShotsTargetConceded + d.CornersConceded + d.GoalsConceded + 1})])
            .range([height/1.17, padding])

        var colors = d3.scaleOrdinal()
            .domain(keys)
            .range(["darkred", "green", "yellow"]) 
    
        var stackedGen = d3.stack().keys(keys)
        var stacked = stackedGen(mean_vals_dict)
        // console.log(stacked)
        
        var xAxis = d3.axisBottom()
            .scale(xScale)
                    
        var yAxis = d3.axisLeft()
            .scale(yScale)

        var areas = d3.area()
            .x(function(d, i) { return xScale(d.data.Team); })
            .y0(function(d) { return yScale(d[0]);})
            .y1(function(d) { return yScale(d[1]);})
        
        svg.selectAll("g")
            .data(stacked)
            .enter()
            .append("path")
            .attr("fill", function(d) { return colors(d.key); })
            .attr("d", areas)
            .attr("transform", "translate(82.5,0)")
            
        svg.append("g").call(xAxis).attr("class", "xAxis").attr("transform", "translate(30, 427.5)")
            .selectAll("text").attr("text-anchor", "end")
            .attr("dx", "-0.2em").attr("dy", "0.15em").attr("transform", "rotate(-40)")

        svg.append("g").call(yAxis).attr("class", "yAxis").attr("transform", "translate(50, 0)")
            .attr("x", -25).attr("dy", ".25em").attr("text-anchor", "end")
        
        svg.append("text")
            .attr("x", (width / 2)-22)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "18px")
            .style("font-weight", "bold")
            .text("Average Shots, Corners, Goals Conceded Amongst Big Six Premier League Teams");
        let stream_y_adjust = 25
        svg.append("text")
            .attr("class", "xAxisLabel")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height - stream_y_adjust)
            .text("Teams");
    
        let y_text_padding = 5.5
            svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", y_text_padding)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Average Shots/Corners/Goals Conceded");

        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (padding * 5) + "," + padding*3 + ")");

        var legendRectSize = 18;
        var legendSpacing = 4;

        var legendItems = legend.selectAll(".legend-item")
            .data(["Shots on Target Conceded", "Corners Conceded", "Goals Conceded"])
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * keys.length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return "translate(" + horz + "," + vert + ")";
            });

            legendItems.append("rect")
            .attr("width", legendRectSize)
            .attr("height", legendRectSize)
            .attr("fill", function(d) { return colors(d); })
            .attr("stroke", function(d) { return colors(d); });

            legendItems.append("text")
            .attr("x", legendRectSize + legendSpacing)
            .attr("y", legendRectSize - legendSpacing)
            .text(function(d) { return d; });
            
    })
}
var shots_scatter=function(filePath1){
    var rowConverter3 = function(d){
        return{
            HomeTeam: d.HomeTeam,
            AwayTeam: d.AwayTeam,
            HomeShots: parseInt(d.HS),
            AwayShots: parseInt(d.AS),
            HomeGoals: parseInt(d.FTHG),
            AwayGoals: parseInt(d.FTAG),
        }
    }
    d3.csv(filePath1, rowConverter3).then(function(data){
        var height = 700
        var width = 700
        var svg = d3.select("#shots_scatterplot")
        .append("svg").attr("width", width).attr("height", height);
        var topteams = ["Man United", "Man City", "Arsenal", "Liverpool", "Chelsea", "Tottenham"];
            topdata = data.filter(function(d) {
            return topteams.includes(d.HomeTeam) || topteams.includes(d.AwayTeam);
            });

        var topdata = data.filter(function(d) {
            if (topteams.includes(d.HomeTeam)) {
                return true;
            } else if (topteams.includes(d.AwayTeam)) {
                d.HomeShots = d.AwayShots;
                d.HomeGoals = d.AwayGoals;
                return true;
            } else {
                return false;
            }
        });
        let padding = 50
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(topdata, function(d) { return d.HomeShots + 1; })])
            .range([padding, width-padding]);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(topdata, function(d) { return d.HomeGoals + 1; })])
            .range([height-padding, padding]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
        svg.append("g").call(xAxis).attr("class", "xAxis").attr("transform","translate(0, 654)")
        svg.append("g").call(yAxis).attr("class", "yAxis").attr("transform","translate(44, 0)")
        let color = {
            "Man United": "Red",
            "Man City": "Pink",
            "Liverpool": "Green",
            "Arsenal": "Orange",
            "Tottenham": "Purple",
            "Chelsea": "Yellow"
        }

        svg.selectAll("circle")
            .data(topdata)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.HomeShots); })
            .attr("cy", function(d) { return yScale(d.HomeGoals); })
            .attr("r", 3)
            .style("fill", function(d){ return color[d.HomeTeam]})

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .style("text-anchor", "middle")
            .text("Number of shots");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", 12)
            .style("text-anchor", "middle")
            .text("Number of goals");
        
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .attr("font-size", "20px")
            .text("Number of Shots vs Number of Goals in Premier League History");

        var legend = svg.append("g")
            .attr("transform", "translate(" + (width - padding * 2) + "," + padding + ")");
        
        legend.selectAll("rect")
            .data(topteams)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", function(d, i) { return i * 20; })
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d) { return color[d]; });
        
        legend.selectAll("text")
            .data(topteams)
            .enter()
            .append("text")
            .attr("x", 15)
            .attr("y", function(d, i) { return i * 20 + 10; })
            .text(function(d) { return d; });
    })   
}

var england_choropleth=function(filePath3){
    var rowConverter = function(d){
        return{
            City: d.City,
            Team: d.Team,
            Stadium: d.Stadium,
            Capacity: parseInt(d.Capacity),
            Latitude: parseFloat(d.Latitude),
            Longitude: parseFloat(d.Longitude),
            image_path: d.Stad_file
        }
    }
    d3.csv(filePath3, rowConverter).then(function(data){
        var bigsixteams = ["Manchester United", "Manchester City", "Arsenal", "Liverpool", "Chelsea", "Tottenham Hotspur"];
            bigsixdata = data.filter(function(d) {
            return bigsixteams.includes(d.Team);
            });
        var height = 700
        var width = 1434
        var svg = d3.select("#choropleth_map")
        .append("svg").attr("width", width).
        attr("height", height);
        console.log(bigsixdata)
        var tooltip = d3.select("#choropleth_map")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
        var mouseover = function(event, d) {
            tooltip
                .style('opacity', 1)
                .html(d.Team + '<br>' + d.Stadium + '<br>' + 'Capacity: ' + d.Capacity)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }

        var mousemove = function(event, d) {
            var circlePos = {
                x: parseFloat(d3.select(this).attr("cx")),
                y: parseFloat(d3.select(this).attr("cy"))
            };
            tooltip
                .html("This is " + d.Stadium + " which is located in " + d.City +". "
                + "This is where " + d.Team + " FC plays. " + "The capacity of "+ d.Stadium+ " is " + d.Capacity + " people." 
                + '<br><img src="' + d.image_path + '" alt="' + d.Team + '" width="500" height="300">')
                .style('left', (circlePos.x + 10) + 'px')
                .style('top', (circlePos.y - 10) + 'px')
            }
        var mouseleave = function(d) {
            tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
            }

        const projection = d3.geoMercator()
            .center([-1.5, 54])
            .translate([width/2, height/2])
            .scale(2800);
        const pathgeo = d3.geoPath().projection(projection); 
        const worldmap = d3.json('world.json');  

        worldmap.then(function(data){
            svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('d', pathgeo)
                .attr('fill', function(d) {
                    if (d.properties.name === 'England') {
                        return 'red';
                    } else {
                        return 'gray';
                    }
                })
                .attr('stroke', 'white')
    
        svg.selectAll('circle')
            .data(bigsixdata)
            .enter()
            .append('circle')
            .attr('cx', function(d) { return projection([d.Longitude, d.Latitude])[0]; })
            .attr('cy', function(d) { return projection([d.Longitude, d.Latitude])[1]; })
            .attr('r', 4)
            .attr('opacity', 0.7)
            .attr('fill', 'blue')
            .style('z-index', '1')
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 15)
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .attr("font-size", "20px")

        })
    });
}


var league_titles_barchart=function(filePath2){
    var rowConverter2 = function(d){
        return{
            Pos: parseInt(d.Pos),
            Team: d.Team,
        }
    }
    d3.csv(filePath2, rowConverter2).then(function(data){
        var bigsixteams = ["Manchester United", "Manchester City", "Arsenal", "Liverpool", "Chelsea", "Tottenham Hotspur"];
            bigsixdata = data.filter(function(d) {
            return bigsixteams.includes(d.Team);
            });
        top_finishes_counts = d3.rollup(bigsixdata,
            function(v) { return v.filter(function(d) { return d.Pos == 1 }).length }, 
            function(d) { return d.Team }
          );
        top_four_counts = d3.rollup(bigsixdata,
            function(v) { return v.filter(function(d) { return d.Pos <= 4 }).length }, 
            function(d) { return d.Team }
          );
        //
        outside_top_six_counts = d3.rollup(bigsixdata,
            function(v) { return v.filter(function(d) { return d.Pos >= 7 }).length }, 
            function(d) { return d.Team }
          );
        const top_finishes = Array.from(top_finishes_counts, ([key, value]) => ({
            Team: key,
            Count: value,
           }));
        const top_four_finishes = Array.from(top_four_counts, ([key, value]) => ({
            Team: key,
            Count: value,
           }));
        const bottom_finishes = Array.from(outside_top_six_counts, ([key, value]) => ({
            Team: key,
            Count: value,
           }));
        
        top_finishes.sort(function(a, b){
            return d3.descending(a.Count, b.Count);
        });
        let width = 500
        let height = 500
        let paddingInner = 0.05
        let padding = 20
        let pointsY = top_finishes.map(function(d) {
            return d.Count;
        });;
        var svg = d3.select("#barchart_plot")
                .append("svg")
                .attr("width", width)
                .attr("height", height)

        let xScale = d3.scaleBand()
            .domain(top_finishes.map(d =>d.Team))
            .range([padding, width/1.2])
            .paddingInner(paddingInner)
        
        let yScale = d3.scaleLinear()
            .domain([0, Math.max(...pointsY) + 1])
            .range([height/1.2, padding])
        
        var xAxis = d3.axisBottom()
            .scale(xScale)
        
        var yAxis = d3.axisLeft()
            .scale(yScale)

        svg.append("g").attr("name", "xAxis").attr("transform","translate(34, 418)").call(xAxis)
            .selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end")
            .attr("dx", "-.8em").attr("dy", "0.15em")
        svg.append("g").attr("name", "yAxis").attr("transform","translate(50, 0)").call(yAxis)

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .style("text-anchor", "middle")
            .text("Team");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", padding)
            .style("text-anchor", "middle")
            .text("Count of Finishes");
        
    

        let x_adjust = 35
        let y_adjust = 83.3333
        svg.selectAll(".barplotq3").data(top_finishes).enter().append("rect")
            .attr("class", "barchart_plot")
            .attr("x", function(d, i){
                return xScale(d.Team) + x_adjust
            })
            .attr("y", function(d){
                return yScale(d.Count)
            })
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.Count) - y_adjust)
            .attr("fill", "green");
        
        var radio = d3.select('#radio_barchart')
            .attr('name', 'prem').on("change", function (d) {
            const datasets = {
                "Champs": top_finishes,
                "Champions League": top_four_finishes,
                "Nothing": bottom_finishes
                };
            current_data = d.target.value
            c_data = datasets[current_data]
            //console.log(c_data)
            c_data.sort(function(a, b){
                return d3.descending(a.Count, b.Count);
            });
            let pointsY = c_data.map(function(d) {
                return d.Count;
            });;
            const colors = {
                "Champs": "Green",
                "Champions League": "#fde725",
                "Nothing": "#bb151a"
            };
            xScale = d3.scaleBand()
                .domain(c_data.map(d=>d.Team))
                .range([padding, width/1.2])
                .paddingInner(paddingInner)

            yScale = d3.scaleLinear()
                .domain([0, Math.max(...pointsY) + 1])
                .range([height/1.2, padding])

            x_axis = d3.axisBottom(xScale)
            y_axis = d3.axisLeft(yScale);
            
            d3.selectAll("[name=xAxis]")
                .transition()
                .duration(1750)
                .call(x_axis)
            d3.selectAll("[name=yAxis]")
                .transition()
                .duration(1750)
                .call(y_axis)

            svg.selectAll(".barchart_plot").remove();

            svg.selectAll(".barplotq3").data(c_data).enter().append("rect")
                .attr("class", "barchart_plot")
                .attr("x", function(d, i){
                    return xScale(d.Team) + x_adjust
                })
                .attr("y", function(d){
                    return yScale(d.Count)
                })
                .attr("width", xScale.bandwidth())
                .transition()
                .duration(1750)
                .attr("height", d => height - yScale(d.Count) - y_adjust)
                .attr("fill", d => colors[current_data]);
        });
    document.getElementById("intro").innerHTML = `
    In my final project I decided to take a look at the English Premier League (EPL), 
    one of the most prestigious domestic leagues in world football (soccer).
    
    I have played soccer for over 15 years now and have watched the EPL for over a decade. 
    I have seen many incredible moments in my time, but I wanted to see if I could get 
    the whole picture of the premier league and see which team fares the best in history.
    
    With that being said, the EPL begun in 1992 and the only available data I could find 
    went from 2000-2022. So, we are missing a chunk of EPL seasons, but we'll just have 
    to take a look at different club's histories in the 21st century. 
    <br><br>
    Since we are trying to find the best team in Premier League history, I have shortlisted 
    6 teams to take a closer look at. These teams are called the “Big Six” in the Premier League 
    and have gained this title because of their historic dominance in the EPL. This isn't some 
    term I made up, it is commonly used in English punditry and everyday conversation to refer 
    to these six teams. The teams are Manchester United, Manchester City, Liverpool, Chelsea, 
    Arsenal, and Tottenham. These are the teams I will focus on since they are widely considered 
    as the top six in modern EPL history. Finally, I just want to clarify that this data is only 
    from the EPL. It has no match or performance data from the Champions League, Europa League, 
    other league tournaments, or international play. 
    <br><br>
      `;        
    document.body.style.backgroundColor = "lightblue";
    document.getElementById("choropleth_title").innerHTML = `Top Teams Locations and Stadiums in England<br>
    `;
    document.getElementById("choropleth_text").innerHTML = `These are some of the most historic teams in England, 
    and therefore they must have some of the most historic stadiums and fans. Here we take a look at where 
    teams are located in England and some information about their iconic stadiums. With that being said, 
    let's take a look at the data. Be sure to hover your mouse over the circles to interact with the data. <br><br>`

    document.getElementById("bar_title").innerHTML = "Premier League Finishes Through History"
    document.getElementById("bar_text").innerHTML = `Here we have three different bar charts. 
    The English Champions button informs how many EPL championships each of the big six teams have won 
    since 2000. This is the ideal finish to the season. The next button is Champions League Finishes. The 
    Champions League is an extremely prestigious tournament of teams all throughout Europe that players 
    dream of playing in. Only the top four teams in the previous premier leagues season qualify for it, with 
    most other leagues having even less qualification spots. This highlights how high level the EPL is. There 
    is also the Europa League which is the league just below the Champions League. The teams that finish 5th 
    and 6th in the EPL qualify for it and get to battle it out in their own tournament. This is also a decent 
    finish but is not great if a team wants to be fighting for EPL supremacy. The third bar chart shows how many 
    times each EPL team finished outside of the top six and didn't qualify for any European Competitions. This 
    is an extremely disappointing finish for any of these teams. <br><br>
    
    What we see here is that United, City, and Chelsea lead the way in EPL titles at the top with United having a 
    slight lead. Next, we see that United, Chelsea, and Arsenal are the most consistent at making it into the 
    Champions League with 17, 17, and 16 qualifications respectively. Finally, we see Tottenham and Man City have 
    had the most disappointing seasons with eight finishes each outside the top six, a poor finish for a team 
    considered a part of the “Big Six”.`

    document.getElementById("individual_games").innerHTML = `<br>Now that we've taken a look at end of season performance 
    in the EPL, lets take a closer look at performances in individual matches. Next we'll look at some key stats across 
    all recorded EPL seasons.<br><br>`

    document.getElementById("scatter_text").innerHTML = `First, we will look at the relationship between shots and goals 
    in the Premier League for each Premier League club. What we see is a bit surprising in that more shots doesn't 
    generally mean more goals. It is helpful in some cases, but there are many cases where teams have over 25 shots 
    in games but still score no goals. We also see there is a fairly nice spread of all the top six teams throughout 
    the graph, with no one team absolutely dominating any one section. It is slightly apparent though that Chelsea and Man City 
    are a bit more dominant at the top end of the spectrum, meaning they typically score the most goals and take the 
    most shots.<br><br>`
    document.getElementById("stream_text").innerHTML = `Next, we look at the average number of shots conceded, corners 
    conceded, and goals conceded to see how these teams fare defensively over the years. It is said that defenses win 
    championships making this a hugely important category to look at. What we see here is that there is a very small 
    difference in defensive quality across these teams in the 21st century. Only Tottenham have an actual noticeable 
    increase in goals, corners, and shots conceded over the years. It is also interesting to see that there is a relatively 
    predictable variation in goals conceded when shots and corners conceded also vary. This means these might be decent 
    predictors for the number of goals conceded, but that's beyond the point. What we see is that only Tottenham seem to 
    be falling a bit behind on the defensive metric.
    <br><br>
    Finally, we will look at the head-to-head performances of these teams across all seasons. I have calculated the 
    total number of points each of these teams has against the others in the “Big Six” and summed up the totals over 
    all the years. This shows how these teams fare in the biggest games of the EPL season. <br><br>`
    document.getElementById("node_text").innerHTML = `What we see from the head-to-head performances is that Chelsea 
    and Man United have racked up the most points against the best opponents. Liverpool and Arsenal aren't too far 
    behind, but there is a gap. Finally, Man City and Tottenham are clearly at the bottom with another gap between 
    them and Liverpool/Arsenal.<br><br><br>`
    document.getElementById("section_title").innerHTML = `The Fight for Ultimate Premier League Glory`
    document.getElementById("Conclusion").innerHTML = `Conclusion<br><br>`
    document.getElementById("closing_remarks").innerHTML = `After all those visualizations let's summarize what 
    we've seen. We saw Manchester United, Manchester City and Chelsea as the dominant Premier League finishers, 
    with Arsenal and Liverpool just a bit behind. We also saw a lack of consistency from Manchester City, as well
     as a clearly lower level of EPL finishes from Tottenham. Next, we have our individual match data where we saw
      all teams thrive offensively with Manchester City and Chelsea getting the slight edge. Defensively we saw a 
      group of overall quality performances with Tottenham falling behind again. Finally, we looked at head-to-head
       results where we saw Chelsea and Manchester United dominate again. With that I'll leave it for you to decide
        who has achieved ultimate Premier League glory in the 21st century. Thank you.<br><br><br><br><br><br>`
})}

