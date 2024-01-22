// Création de la 'div' contenant la scène THREE.js.
var container = document.createElement("div");
container.id = "canvas";
container.className = "canvas";
document.body.appendChild(container);


// La 'div' du menu.
var containerGUI = document.createElement("div");
containerGUI.id = "menu";
containerGUI.className = "menu";
document.body.appendChild(containerGUI);


var manager = new THREE.LoadingManager();

// Le renderer.
var renderer = new THREE.WebGLRenderer({antialias: true, depth: true});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);															// Ajout du renderer au container.


// Définition de la scène
var scene = new THREE.Scene();
scene.name = "Scène";
scene.background = new THREE.Color("rgb(80, 80, 80)");


// Définition de la caméra et positionnement dans la scène THREE.js.
var camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 1000);
camera.name = "Caméra";
camera.position.x = 1.5;
camera.position.y = 0;
camera.position.z = 0;
scene.add(camera);


// Contrôle de la caméra et ajout de paramètres.
var controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.name = "Contrôle caméra";
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


// Utilisé pour la sélection des composantes de la scène.
var raycaster = new THREE.Raycaster();


// Définition des lumières : 1 lumière ambiante et 2 lumières sources.
var lumiereAmbiante = new THREE.AmbientLight("white");
var pointLumineux1 = new THREE.PointLight("rgb(120, 120, 120)", 0.45);
var pointLumineux2 = new THREE.PointLight("rgb(120, 120, 120)", 0.45);
var pointLumineux3 = new THREE.PointLight("rgb(120, 120, 120)", 0.45);
pointLumineux1.position.set(0, 0, 20);
pointLumineux2.position.set(0, -20, 0);
pointLumineux3.position.set(20, 0, 0);

scene.add(lumiereAmbiante);
scene.add(pointLumineux1);
scene.add(pointLumineux2);
scene.add(pointLumineux3);


// Définition des groupes d'objets : groupe objetFaces + groupe sommets + groupe arrêtes.
// Pour les objetFaces, voir leur création.
var objetFaces = {};
var objetSommets = new THREE.Object3D();
objetSommets.name = "Sommets";
var objetAretes = new THREE.Object3D();
objetAretes.name = "Arêtes";


// Tableau de couleurs des objetFaces, 4 types de objetFaces maximum.
var faceColor = {
	3: new THREE.Color(0.8627, 0.0784, 0.2353),	// Couleur 'Crimson'.
	4: new THREE.Color(1, 0.8431, 0),			// Couleur 'Gold'.
	5: new THREE.Color(0, 0, 0.502),			// Couleur 'Navy'.
	6: new THREE.Color(0.1961, 0.8039, 0.1961),	// Couleur 'Limegreen'.
	7: new THREE.Color(0.8235, 0.4118, 0.1176),	// Couleur 'Chocolate'.
	8: new THREE.Color("rgb(208, 2, 211)"),		// Couleur 'Violette'.
	9: new THREE.Color("rgb(19, 242, 130)"),
	10: new THREE.Color("rgb(140, 44, 0)")
};


// Les différentes opacité des objets : sommet et arrête (pour les objetFaces voir la construction des objetFaces).
var faceOpacity = {};
var sommetOpacity = 0.9;
var areteOpacity = 0.9;

var facesColor = {};
var sommetColor = new THREE.Color("rgb(0, 0, 0)");
var areteColor = new THREE.Color("rgb(255, 255, 255)");


// Vitesse en X, Y, Z de l'objet.
var xVelocity = 0;
var yVelocity = 0;
var zVelocity = 0;


// Le menu dat.GUI.
// Les textes affichés par le menu dat.GUI.
dat.GUI.TEXT_CLOSED = "Enlever les contrôles";
dat.GUI.TEXT_OPEN = "Contrôles de la scène";
var menu = new dat.GUI({autoplace: false, width: 400});
containerGUI.appendChild(menu.domElement); // On ajoute le menu à un container spécial (celui à une position 'absolute' -- CSS --, donc il 'flotte' sur l'écran).
