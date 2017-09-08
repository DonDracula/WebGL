/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gSimpleShader = null;
var gShaderVertexPositionAttribute = null;

//load and complie a shader from index.html
function loadAndCompileShader(id, shaderType){
    var shaderText, shaderSource,compiledShader;
    
    //1.从index.html中获取shader资源
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
    
    //2.根据数据类型（vertex 或者 fragment）创建shader
    compiledShader = gGL.createShader(shaderType);
    
    //3.连接新生成的shader
    gGL.shaderSource(compiledShader,shaderSource);
    gGL.compileShader(compiledShader);
    
    //4.错误检查，并返回结果
    if(!gGL.getShaderParameter(compiledShader,gGL.COMPILE_STATUS)){
        alert("A shader compiling error occurred:"+gGL.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

//初始化
function initSimpleShader(vertexShaderID,fragmentShaderID){
    //1.加载并关联vertex和fragment shader
    var vertexShader= loadAndCompileShader(vertexShaderID,gGL.VERTEX_SHADER);
    var fragmentShader = loadAndCompileShader(fragmentShaderID,gGL.FRAGMENT_SHADER);
    
    //2.shader创建并与程序相关联
    gSimpleShader=gGL.createProgram();
    gGL.attachShader(gSimpleShader,vertexShader);
    gGL.attachShader(gSimpleShader,fragmentShader);
    gGL.linkProgram(gSimpleShader);
    
    //3.错误检查
    if(!gGL.getProgramParameter(gSimpleShader,gGL.LINK_STATUS))
        alert("Error linking shader");
    
    //4.获得指向aSquareVertexPosition属性的引用
    gShaderVertexPositionAttribute=gGL.getAttribLocation(gSimpleShader,"aSquareVertexPosition");
    
    //5.加载顶点缓冲
    gGL.bindBuffer(gGL.ARRAY_BUFFER,gSquareVertexBuffer);
    //6.设置顶点位置属性
    gGL.vertexAttribPointer(gShaderVertexPositionAttribute,
    3,          //三维顶点(x,y,z)
    gGL.FLOAT,  //浮点型
    false,      //是否是标准化向量
    0,           //number of bytes to skip in between elements
    0);         //offsets to the firest element
}
        