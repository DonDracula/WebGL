/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

var gEngine = gEngine || { };    //initialize the variable while ensuring it is not redefined

gEngine.Core = (function(){
    //instance variable:the graphical context for drawing
    var mGL = null;
    
    //Accessor of the webgl context
    var getGL = function(){return mGL;};
    
    //initialize the webgl,the vertex buffer and compile the shaders
    var initializeWebGL = function(htmlCanvasID){
        var canvas = document.getElementById(htmlCanvasID);
        //get the standard or experimental webgl and binds to the canvas area
        //store the results to the instance variable mGL
        mGL=canvas.getContext("webgl")||canvas.getContext(experimental-webgl);
        
        if(mGL == null){
            document.write("<br><b>WebGL is not supportd!</b>");
            return;
        }
        
        //now initialize the vertexbuffer
        gEngine.VertexBuffer.initialize();
    }
    //clears the draw area and draws one square
    var clearCanvas = function(color){
        mGL.clearColor(color[0],color[1],color[2],color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };
        //contains he functions and cariables that will be accessible
    var mPublic = {
        getGL:getGL,
        initializeWebGL:initializeWebGL,
        clearCanvas:clearCanvas
    };
    
    return mPublic;
}());