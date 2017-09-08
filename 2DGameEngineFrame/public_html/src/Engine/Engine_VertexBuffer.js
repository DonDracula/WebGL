/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var gEngine = gEngine||{ };

//the vertexbuffer object
gEngine.VertexBuffer =(function(){
    //1.define the vertices for a square
    var verticesOfSquare=[
        0.5,0.5,0.0,
        -0.5,0.5,0.5,
        0.5,-0.5,0.0,
        -0.5,-0.5,0.0
    ];
    
    //reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;
    
    var getGLVertexRef = function(){return mSquareVertexBuffer;};
    
    var initialize = function(){
        var gl = gEngine.Core.getGL();
        //1.create a buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();
        
        //2.active vertexbuffer
        gl.bindBuffer(gl.ARRAY_BUFFER,mSquareVertexBuffer);
        
        //3.loads verticesOfSquare into the vertexbuffer
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verticesOfSquare),gl.STATIC_DRAW);
    };
    
    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };
    return mPublic;
}());

