function run(G3D, canvas){

    // create 3d engine
    const engine = new G3D.Engine(canvas);

    // create a scene
    const scene = new G3D.Scene(engine);
    
    // create camera
    const camera = new G3D.ArcRotateCamera(scene);
    camera.alpha = 45;
    camera.beta = 0;
    camera.radius = 10;
    
    // create 3 lights
    const light1 = new G3D.DirectionalLight(scene);
    light1.direction.x = -1;
    light1.direction.y = 0;
    light1.direction.z = 1;
    light1.intensity = 0.5;
    
    const light2 = new G3D.HemisphereLight(scene);
    light2.intensity = 0.5;
    
    const light3 = new G3D.AmbientLight(scene);
    light3.intensity = 0.2;
    
    // create plane
    const groundMesh = G3D.MeshBuilder.createGround(scene, 6, 4);
    groundMesh.position.z = -1;
    decorateMaterial(groundMesh.materials.default);
    
    const sphereMesh = G3D.MeshBuilder.createSphere(scene, 1);
    sphereMesh.position.z = 1;
    decorateMaterial(sphereMesh.materials.default);
    
    function decorateMaterial(material) {
        material.ambientColor.r = 200;
        material.ambientColor.g = 100;
        material.ambientColor.b = 100;
        material.diffuseColor.r = 200;
        material.diffuseColor.g = 100;
        material.diffuseColor.b = 100;
        material.specularColor.r = 200;
        material.specularColor.g = 100;
        material.specularColor.b = 100;
        material.glossiness = 10;
    }
    
    return function () {
        scene.render();
    }
}