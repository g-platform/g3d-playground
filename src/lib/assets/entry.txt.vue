<template>
    <div>
    <gcanvas v-if="isWeex" ref="canvas_holder" 
        style="width:750;height:750;backgroundColor:rgba(255,255,255,1)"></gcanvas>
    <canvas v-if="!isWeex" ref="canvas_holder"
        style="width:750px;height:750px;"></canvas>
        <div>Hello Gama 3D.</div>
    </div>
</template>
<script>

const isWeex = typeof callNative === 'function';

const weex_scope = {};

__GCanvas_holder__;

__G3D_holder__;


const {GCanvas, G3D} = weex_scope;
const {enable} = GCanvas;
G3D.Env.Image = isWeex ? GCanvas.Image : Image;

__Main_holder__;


function start(ref, size) {
  if (isWeex) {
    ref.width = size.width;
    ref.height = size.height;
  }
  const render = run(G3D, ref);
  setInterval(render, 16);
}

export default {
  data() {
    return {
      isWeex: isWeex
    };
  },

  mounted: function() {
    var ref = this.$refs.canvas_holder;

    var size = isWeex
      ? {
          width: 750,
          height: 750
        }
      : {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height)
        };
    if (!isWeex) {
      ref.width = size.width;
      ref.height = size.height;
    }

    ref = enable(ref);
    start(ref, size);
  }
};
</script>