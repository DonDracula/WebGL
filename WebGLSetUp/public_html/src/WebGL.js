/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var gGL =null;

function initializeGL(){
    var canvas = document.getElementById("GLCanvas");
    
    gGL = canvas.getContext("webgl")||
            canvas.getContext("experimental-webgl");
    if(gGL!==null){
        gGL.clearColor(0.8,0.9,0.8,1.0);//set color 
        
        //初始化顶点缓冲
        initSquareBuffer();
        //加载vertex和fragment shader
        initSimpleShader("VertexShader","FragmentShader");
    }else{
        documentj.write("<br><b>WebGL is not supported!</b>");
    }
}

function drawSquare(){
    gGL.clear(gGL.COLOR_BUFFER_BIT);
    
    //activate the shader to use
    gGL.useProgram(gSimpleShader);
    //enable the vertex position attribute
    gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);
    
    //draw with the above settings
    gGL.drawArrays(gGL.TRIANGLE_STRIP,0,4);
}

function doGLDraw(){
    initializeGL();
    drawSquare();
}