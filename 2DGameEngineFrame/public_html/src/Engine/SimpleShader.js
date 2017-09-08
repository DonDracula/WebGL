/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function SimpleShader(vertexShaderID,fragmentShaderID){
    //instance variables(Convention:all instance variable:mVariables)
    this.mCompiledShader = null;
    //reference to the compiled shader in webgl context
    this.mShaderVertexPositionAttribute = null;
    //reference to squarevertexposition in shader
    this.mPixelColor = null;
    //reference to the pixelColor uniform in the fragment shader

    var gl = gEngine.Core.getGL();

    //start of constructor code
    //1.load and compile vertex and fragment shaders
    var vertexShader = this._loadAndCompileShader(vertexShaderID,gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderID,gl.FRAGMENT_SHADER);

    //2.create and link  the shaders into a prpgram
    this.mCompiledShader=gl.createProgram();
    gl.attachShader(this.mCompiledShader,vertexShader);
    gl.attachShader(this.mCompiledShader,fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    //3.check for error
    if(!gl.getProgramParameter(this.mCompiledShader,gl.LINK_STATUS)){
        alert("Error linkging shader");
        return null;
    }

    //4.gets a referrence to the aSquareVertexPosition attributes
    this.mShaderVertexPositionAttribute=gl.getAttribLocation(this.mCompiledShader,"aSquareVertexPosition");

    //5.activates the verte buffer loaded in Engine.Core_VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER,gEngine.VertexBuffer.getGLVertexRef());

    //6.describe teh characteristic of hte vertex position attribute
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
    3,          //each element is a 3-float (x,y,z)
    gl.FLOAT,   //data type is FLOAT
    false,      //if the content is normalized vectors
    0,          //number of bytes to skip in between elements
    0);         //offsets to the first element

    //7.获得fragment shader中的变量uPixelColor
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader,"uPixelColor");
}


SimpleShader.prototype.activateShader = function(pixelColor){
    var gl=gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor,pixelColor);
};

SimpleShader.prototype.getShader=function(){
    return this.mCompiledShader;
};

//returns a compiled shader form a shader in the dom
//the id is the id of the script in the html tag
//SimpleShader.prototype._loadAndCompileShader=function(id,shaderType){
SimpleShader.prototype._loadAndCompileShader=function(filePath, shaderType){
    var xmlReq, shaderSource = null,compiledShader=null;
    var gl = gEngine.Core.getGL();

    //1.get the shader source from index.html
   // shaderText = document.getElementById(id);
    //shaderSource = shaderText.firstChild.textContent;
    //把html元素替换成文件路径读取
     xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        alert("Failed to load shader: " + filePath + " [Hint: you cannot double click index.html to run this project. " +
                "The index.html file must be loaded by a web-server.]");
        return null;
    }
    shaderSource = xmlReq.responseText;

    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }

    //2.create the shader based  on the shader type: vertex or fragment
    compiledShader = gl.createShader(shaderType);

    //3.compole the created shader
    gl.shaderSource(compiledShader,shaderSource);
    gl.compileShader(compiledShader);

    //4.check for errors and return results 
    //the log info is how shader compilation errors are typicallu displayed.
    //this is useful for debugging the shader
    if(!gl.getShaderParameter(compiledShader,gl.COMPILE_STATUS)){
        alert("A shader compiling error occurred: "+gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};

