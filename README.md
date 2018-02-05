# G3D

G3D is a web 3d render engine focusing on realistic rendering. It runs on browser (using webgl) as well as on WEEX (using GCanvas).

## Install

The only way to use G3D is installing it via npm. 

```bash
$ npm install g3d
```

You could involve it in your own build progress (using browserify, webpack, weex-toolkit eg).

```javascript
import G3D from 'g3d';
// you need a HTMLCanvasElement
const canvas = document.querySelector('#canvas');
// create an engine
const engine = new G3D.Engine(canvas);
// create a scene
const scene = new G3D.Scene(engine);
// render the scene
scene.render();
```

## Usage

### Web

Basiclly, you need a HTMLCanvasElement to start. You need to create a G3D engine, and then create a scene, a camera, some lights, some meshes (the cube in the following example), and call `scene.render()` to draw your scene on canvas.

```javascript
import G3D from 'g3d';
// you need a HTMLCanvasElement
const canvas = document.querySelector('#canvas');
// create an engine
const engine = new G3D.Engine(canvas);
// create a scene
const scene = new G3D.Scene(engine);
// create a camera
const camera = new G3D.ArcRotateCamera(scene);
camera.radius = 10;
// create a light
const light = new G3D.AmbientLight(scene);
// create a sphere
const cube = G3D.Meshbuilder.createCube(scene, 5);
// render the scene
setInterval(function(){
    cube.rotation.x +=1;
    scene.render();
}, 16);
```

### Weex (GCanvas)

The difference between the way using G3D in weex and the way in browser is as following: 

* You need to assign `GImage` to `G3D.Env.Image`.
* You need to create an Engine using a gcanvas instance but not a HTMLElement.

```javascript
import G3D from 'g3d';
// replace G3D.Env.Image with GImage
G3D.Env.Image = GImage;
// create an engine using a gcanvas instance
const Engine = new G3D.Engine(gcanvas);
```

> About GImage and gcanvas instance, you could refer to []();

## Guide

There's a series of guide posts.

* [Chapter 1: First Steps](http://www.taobao.com)
* [Chapter 2: Position and Rotation](http://www.taobao.com)

## Playground

You can play with G3D in [playground]().

## API Reference

* [Engine](http://www.taobao.com)