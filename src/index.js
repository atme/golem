// @flow

const create = (
  canvas: HTMLCanvasElement,
  vertex: string,
  fragment: string
): [WebGLRenderingContext, WebGLProgram] => {
  const gl = canvas.getContext('webgl')
  if (!gl) {
    throw new Error('WebGL doesn\'t work in the browser')
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex)
  if (typeof vertexShader === 'string') {
    throw new Error(vertexShader)
  }

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment)
  if (typeof fragmentShader === 'string') {
    throw new Error(fragmentShader)
  }

  const program = createProgram(gl, vertexShader, fragmentShader)
  if (typeof program === 'string') {
    throw new Error(program)
  }

  gl.useProgram(program)
  return [gl, program]
}

const createShader = (gl, type, source): WebGLShader | string => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success: boolean = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }

  const err = gl.getShaderInfoLog(shader)
  gl.deleteShader(shader)
  return err
}

const createProgram = (gl, vertex, fragment): WebGLProgram | string => {
  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  const success: boolean = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  const err = gl.getProgramInfoLog(program)
  gl.deleteProgram(program)
  return err
}

const vertex = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  data: Array<number>
) => {
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
  const attr = gl.getAttribLocation(program, name)
  gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(attr)
}

const texture = (gl: WebGLRenderingContext, image: HTMLImageElement) => {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
}

const drawTriangles = (gl: WebGLRenderingContext, count: number) => {
  gl.drawArrays(gl.TRIANGLES, 0, 3 * count)
}

export default { create, vertex, texture, drawTriangles }
