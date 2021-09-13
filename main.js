function main(){
    /**
     * @type {HTMLCanvasElement} canvas
     */
    var canvas = document.getElementById('myCanvas');

    /**
     * @type {WebGLRenderingContext} gl
     */
    var gl = canvas.getContext('webgl');

    var vertices = [
        -1.0, 1.0, //A
        -0.1, 0, //B
        0.1, 0, //C
        1.0,1.0
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Buat Vertex Shader
    var vertexShaderCode = `
        attribute vec2 coordinates;

        void main(){
            gl_Position = vec4(coordinates,0.0 ,1.0);
            gl_PointSize = 10.0;
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexShaderCode);
    gl.compileShader(vertexShader);

    // Buat Fragment Shader
    var fragmentShaderCode = `
        void main(){
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }

    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // Membuat suatu paket berbentuk program yang berisi shader shader yang diperlukan
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram,vertexShader);
    gl.attachShader(shaderProgram,fragmentShader);

    // Link Program
    gl.linkProgram(shaderProgram);

    // Gunakan Program
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(coord);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP,0 , 4);

}