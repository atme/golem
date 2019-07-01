# Golem

Small library to have a comfortable environment to write a WebGL application

## Examples

```js
import golem from 'golem'

const vertex = `
attribute vec4 a_position;

void main() {
    gl_Position = a_position;
}
`;

const fragment = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
}
`;

const canvas = document.getElementById("c");
const [gl, program] = golem.create(canvas, vertex, fragment);

const position = [
  0, 0,
  0, 0.5,
  0.7, 0,
];
golem.vertex(gl, program, 'a_position', position);

const count = 1;
golem.drawTriangles(gl, count);
```