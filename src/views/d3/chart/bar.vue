<script setup>
import {onMounted,ref} from 'vue';
import * as d3 from "d3";
let data =[
  {
    text:'青椒',
    value:20
  },
   {
    text:'西红柿',
    value:30
  },
   {
    text:'花菜',
    value:60
  }
]
let update
let g
onMounted(()=>{
    const svg=d3.select("#mainsvg")
    const margin={top:40,bottom:40,left:40,right:40}
    const width=+svg.attr('width')
    const height=+svg.attr('height')
   
    const innerWidth=width-margin.left-margin.right
    const innerHeight=height-margin.top-margin.bottom
    
   
    update = function (){
      g= svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`)
       // 纵坐标
      let yScale= d3.scaleLinear().domain([0,d3.max(data,(o)=>(o.value))+20]).range([innerHeight,0]);
      var yAxis = d3.axisLeft(yScale).tickPadding(10);
      g.append('g').call(yAxis)
      // 横坐标
      let xScale= d3.scaleBand(d3.map(data,(o,i)=>(o.text)), [0,innerWidth])
      // .paddingInner(0.5).paddingOuter(0.5)
      var xAxis = d3.axisBottom(xScale).tickPadding(10);
      g.append('g').attr("transform", `translate(0,${innerHeight})`).call(xAxis)

      //柱状图
      let bandwidth=xScale.bandwidth()
        g.selectAll('rect')
          .data(data)
          .attr('width',bandwidth)
          .attr('height',(o,i)=>(innerHeight-yScale(o.value)))
          .attr('fill','balck')
          .attr('x',(o,i)=>(i*bandwidth))
          .attr('y',(o,i)=>yScale(o.value))

        g.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x',(o,i)=>(i*bandwidth))
          .attr('y',(o,i)=>yScale(o.value))
          .attr('width',bandwidth)
          .transition().duration(1000)
         
          .attr('height',(o,i)=>(innerHeight-yScale(o.value)))
          .attr('fill','balck')
         

        g.selectAll('rect')
          .data(data)
          .exit()
          .remove('rect')
    }
    update()
})

function addBar(){
  console.log(data)
  data=[...data,{
    text:`香蕉${data.length}`,
    value:200
  }]
  g.remove()
  update()
}
</script>

<template>
  <div class="bg-gray-50">
    <span @click="addBar">柱状图</span>
    
    <svg id="mainsvg" width="680" height="400"></svg>
  </div>
</template>
