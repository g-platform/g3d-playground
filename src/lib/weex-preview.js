import $ from 'jquery';
import qrcode from 'qrcode';

import entryCode from './assets/entry.txt.vue';
import gcanvasCode from './assets/gcanvas.min.txt.js';
import g3dCode from './assets/g3d.min.txt.js';

function joinCodes(code){

    let appCode = entryCode;

    appCode = appCode.replace('__GCanvas_holder__', gcanvasCode);
    appCode = appCode.replace('__G3D_holder__', g3dCode);
    appCode = appCode.replace('__Main_holder__', code);

    const sourceCodes = [
        {
            filename: 'App.vue',
            language: 'vue',
            active: true,
            source: appCode
        }
    ];

    return {sourceCodes};
}


function preview(code, qrcodeCanvas, callback){

    const data = joinCodes(code);

    $.post('http://dotwe.org/api/vue/preview', data, function(e){
        const res = JSON.parse(e);

        if(res.success){
            const url = res.weex.url.replace(location.host, 'dotwe.org');
            qrcode.toCanvas(qrcodeCanvas, url, function (error) {
                if (error) { console.error(error) };
            });
            qrcodeCanvas.onclick = () => location.href = url;

            callback && callback();
        }
    })
}

export default preview;