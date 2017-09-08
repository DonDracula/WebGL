/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function MyGame(htmlCanvasID){
    //the shader for drawing
    this.mShader = null;

    gEngine.Core.initializeWebGL(htmlCanvasID);

    //this.mShader = new SimpleShader("VertexShader","FragmentShader");
        this.mShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",    // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the FragmentShader

    //clear the canvas
    gEngine.Core.clearCanvas([0.8,0.9,0.8,1]);

    //activate the proper shader
    this.mShader.activateShader([0.8,0.8,0.9,1]);

    //draw with the currently activated geometry and the activated shader
    var gl= gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}

