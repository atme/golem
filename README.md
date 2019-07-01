# Golem

Small library to have a comfortable environment to write a WebGL application

## Installation

```sh
yarn add atme/golem
```
or
```sh
npm i atme/golem
```

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

## API
### Draw texture
```js
// ... some previous code

const texCoord = [
  0.0, 0.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 1.0,
  1.0, 0.0,
  1.0, 1.0,
];
golem.vertex(gl, program, 'a_texCoord', texCoord);

const image = new Image();
image.src = 'https://your.domain/image.png';
im.onload = () => {
    golem.texture(gl, image);

    golem.drawTriangles(gl, 2);
};
```
