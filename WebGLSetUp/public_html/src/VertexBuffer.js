/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var gSquareVertexBuffer = null;

function initSquareBuffer(){
    //define the vertices for a squre
    var verticesOfSquare=[
        0.5,0.5,0.0,
        -0.5,0.5,0.0,
        0.5,-0.5,0.0,
        -0.5,-0.5,0.0
    ];
    //1.create a buffer on the gGL context for our vertex positions
    gSquareVertexBuffer = gGL.createBuffer();
    
    //2.activate vertexBuffer
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);
    
    //3.loads verticesOfSquare into the vertexBuffer
    gGL.bufferData(gGL.ARRAY_BUFFER,new Float32Array(verticesOfSquare),gGL.STATIC_DRAW);
}

