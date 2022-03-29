<script setup>
import {onMounted,ref} from 'vue';
import * as d3 from "d3";
let arr = ref([0,1]);
let g
onMounted(()=>{
    const svg=d3.select("#mainsvg")
    g = svg.append('g').attr('class','ggroup')
    addAndUpdate(g.selectAll('rect'))
})

function add(){
  arr.value=[...arr.value,arr.value.length]
}

function addAndUpdate() {
  add()
  let rect = g.selectAll('rect')
    .data(arr.value)
    .enter()
    .append('rect')
    .attr('width', 10+'px')
    .attr('x',(n,i)=>{
      return i * 30 +'px';
    })
    .attr('y',(i)=>{
      return 0
    })
    .attr('height',  100+'px')
    .attr('fill', 'green')
    console.log({rect})
   updateText();
}
function updateText(rect){
  let text =g.selectAll('text')
    .data(arr.value,function(n,i){
      return n;
    })
    .text((n,i)=>{
      return n;
    })
    .attr('font-size', '12px')
    .attr('x',(n,i)=>{
      return i * 30 +'px';
    })
    .attr('y',(i)=>{
      return 40
    })
    .attr('fill', 'black');

    text.enter()
    .append('text')
    .text((n,i)=>{
      return n;
    })
    .attr('font-size', '12px')
    .attr('x',(n,i)=>{
      return i * 30 +'px';
    })
    .attr('y',(i)=>{
      return 40
    })
    .attr('fill', 'black');

    text.exit().remove();
}

function minAndUpdate(react){
  min()
  let rect=g.selectAll('rect')
    .data(arr.value)
    .exit()
    .remove()

  updateText();
  
}
function min(){
  arr.value.shift()
}
</script>

<template>
  <div class="bg-gray-50">
    数据：{{arr}} 
    <div>
      <div>数据
          <button @click="add">增加</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button @click="min">删除</button>
    
      </div>
      <div>视图
          <button @click="addAndUpdate">增加</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button @click="minAndUpdate">删除</button>
      </div>
    </div>
    <div>
       <svg id="mainsvg" width="680" height="400"></svg>
    </div>
    <div></div>
  </div>
</template>
