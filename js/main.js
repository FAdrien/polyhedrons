function main() {
     /**
      * 
      * 
      * ----------------------- Informations -----------------------
      *           Auteur : F_Adrien.
      *           Date : 12/07/2019.
      * ------------------------------------------------------------
      * 
      */
     //objet à visualiser
     var objet3D = construireObjet(johnson["20"]); //solides de johnson de "1" à "92"
                 //construireObjet(dualunif["20"]); //duaux des polyèdres uniformes  de "1" à "80"
                 //construireObjet(uniform["20"]); //polyèdres uniformes  de "1" à "81"
                 //construireObjet(stcuboctaedre["10"]); //stellations du cuboctaèdre de "1" à "17"
                 //construireObjet(stdodecaedreRhb["1"]); //stellations du dodécaèdre rhombique de "1" à "3"
                 //construireObjet(sticosaedre["1"]); //stellations de l'icosaèdre de "1" à "58"
                 //construireObjet(sttriacontaedreRhb["1"]); //stellations du triacontaèdre rhombique de "1" à "226"
                 //construireObjet(zonoedre["1"]); //exemples de zonoèdres de "1" à "5"
     scene.add(objet3D);
          
     function construireObjet(objetDic) {
          /**
           * 
           * 
           * 
           * 
           * 
           */

          // On va chercher les faces, sommets et arrêtes pour la construction du solide.
          var sommets = objetDic["vertex"];
          var aretes = objetDic["edge"];
          var faces = objetDic["face"];

          var objet = new THREE.Group();
          objet.name = objetDic["name"] == undefined ? "Objet" : objetDic["name"];
          // On ajoute tous les objets dans leur catégories respectives.
          objet.add(objetSommets);
          objet.add(objetAretes);

          // Construction des objetFaces (si il y en a).
          if (faces != undefined) {
               for (var k = 0; k < faces.length; k++) { // On parcourt toutes les faces.
                    var Points = [];
                    var L = faces[k];
                    var couleur = faceColor[L.length];   // Couleur en fonction de la face.
                    if (faceOpacity[L.length] == undefined) {
                         faceOpacity[L.length] = 0.8; //0.5;
                    };
                    if (facesColor[L.length] == undefined) {
                         facesColor[L.length] = couleur;
                    };
                    if (objetFaces[L.length] == undefined) {
                         objetFaces[L.length] = new THREE.Object3D(); // On ajoute un nouveau type de face.
                         objetFaces[L.length].name = "Faces " + L.length;
                         objet.add(objetFaces[L.length]);
                    };
                    // Il faut trianguler pour des faces avec plus de trois sommets, sinon, c'est déjà un triangle.
                    if (L.length > 3) {
                         for (var j = 1; j < L.length-1; j++) {
                              Points.push(sommets[L[0]][0], sommets[L[0]][1], sommets[L[0]][2]);
                              Points.push(sommets[L[j]][0], sommets[L[j]][1], sommets[L[j]][2]);
                              Points.push(sommets[L[j+1]][0], sommets[L[j+1]][1], sommets[L[j+1]][2]);
                         };
                    } else {
                         for (var j = 0; j < 3; j++) {
                              console.log(L[j]);
                              Points.push(sommets[L[j]][0], sommets[L[j]][1], sommets[L[j]][2]);
                         };
                    };
                    var geometryFace = new THREE.BufferGeometry();
                    geometryFace.setAttribute("position", new THREE.Float32BufferAttribute(Points, 3));
                    geometryFace.computeVertexNormals();
                    //geometryFace.computeFaceNormals();
                    // Définition du matériel pour les faces.
                    var materialFace = new THREE.MeshPhongMaterial({
                         color: couleur,
                         emissive: 'black',
                         transparent: faceOpacity[L.length] != 1, 
                         opacity: faceOpacity[L.length],
                         specular: "white",
                         shininess: 95,
                         flatShading: true,
                         side: THREE.DoubleSide
                    });
                    // On crée puis on ajoute la face.
                    var face = new THREE.Mesh(geometryFace, materialFace);
                    face.name = "Face " + objetFaces[L.length].children.length;
                    objetFaces[L.length].add(face);
               };
          };
          // Construction des sommets (si il y en a).
          if (sommets != undefined) {
               for (var i = 0; i < sommets.length; i++) {
                    var materialSommet = new THREE.MeshStandardMaterial({
                         color: sommetColor,
                         emissive: 'black',
                         transparent: sommetOpacity != 1, 
                         opacity: sommetOpacity,
                         metalness: 1,
                         roughness: 0.5,
                    });
                    var sommet = new THREE.Mesh(new THREE.SphereBufferGeometry(0.02, 50, 50), materialSommet);
                    sommet.position.set(sommets[i][0], sommets[i][1], sommets[i][2]);
                    sommet.name = "Sommet " + i;
                    objetSommets.add(sommet);
               };
          };
          // Construction des arêtes (si il y en a).
          if (aretes != undefined) {
               var L = aretes;
               for (var i = 0; i < L.length; i++) {
                    var materialLine = new THREE.MeshPhongMaterial({
                         color: areteColor,
                         emissive: 'black',
                         specular : "white",
                         shininess : 10,
                         transparent: areteOpacity != 1,
                         opacity: areteOpacity,
                         flatShading : false
                    });
                    var Points = [];
                    for (var j = 0; j < 2; j++) {
                         Points.push(sommets[L[i][j]][0], sommets[L[i][j]][1], sommets[L[i][j]][2]);
                    };
                    var arete = cylindre(new THREE.Vector3(Points[0], Points[1], Points[2]), new THREE.Vector3(Points[3], Points[4], Points[5]), materialLine);
                    arete.name = "Arête " + i;
                    objetAretes.add(arete);
               };
          };
          // On crée le menu dat.GUI.
          createPanel(objetDic);
          return objet;
     };


     function supprimerObjet() {
          /**
           * Cette fonction retire un objet de la scène courante.
           * 
           * ----------------------- Informations -----------------------
           *           Auteur : F_Adrien.
           *           Date : 15/07/2019.
           * ------------------------------------------------------------
           * 
           */

          objetSommets.children = []                                                                                     // On supprime d'abord tous les sommets de l'objet de la scène.
          objetAretes.children = []                                                                                     // Puis on supprime toutes les arêtes de l'objet de la scène.
          for (const key in objetFaces) {                                                                                // Enfin, pour chaque type de face de l'objet à supprimer de la scène.
               objetFaces[key].children = [];                                                                           // On supprime toutes les faces de ce type de la scène.
          };

          containerGUI.children = []
     };


     // Création du menu avec dat.GUI.
     function createPanel(objetDic, faceType) {
          // ------------------------------- Critères communs à toutes les figures -------------------------------

          // Les sous dossiers du menu.
          // ------------------------------- Affichage général : sommets et arêtes -------------------------------.
          var affichage = menu.addFolder("Affichage général : ");
          var settingsAffichage = {"Sommets : ": 100*sommetOpacity};
          // ------------------------------- Couleur général : sommets et arêtes -------------------------------.
          var affichageCouleur = menu.addFolder("Couleur général : ");
          var settingsAffichageCouleur = {"Sommets : ": sommetColor.getStyle()};
          // ------------------------------- Rotation du solide en X, Y et Z -------------------------------.
          var rotation = menu.addFolder("Rotation : ");
          var settingsRotation = {"Vélocité X : ": xVelocity, "Vélocité Y : ": yVelocity, "Vélocité Z : ": zVelocity};

          // Ajout des paramètres et de leur fonction respectives.
          affichage.add(settingsAffichage, "Sommets : ", 0, 100, 0.001).onChange(changeSommetsOpacity);

          // Ajout des couleurs et de leur fonction respectives.
          affichageCouleur.addColor(settingsAffichageCouleur, "Sommets : ").onChange(changeSommetsColor);

          // Ajout des paramètres et de leur fonction respectives.
          rotation.add(settingsRotation, "Vélocité X : ", 0, 1, 0.0001).onChange(changeXVelocity);
          rotation.add(settingsRotation, "Vélocité Y : ", 0, 1, 0.0001).onChange(changeYVelocity);
          rotation.add(settingsRotation, "Vélocité Z : ", 0, 1, 0.0001).onChange(changeZVelocity);

          // ------------------------------- Si la figure ne nécessite pas certaines composantes -------------------------------

          // Si il y a des arrêtes.
          if (objetDic["edge"] != undefined) {
               settingsAffichage["Arêtes : "] = 100*areteOpacity;
               settingsAffichageCouleur["Arêtes : "] = areteColor.getStyle();
               
               affichage.add(settingsAffichage, 'Arêtes : ', 0, 100, 0.001).onChange(changeArretesOpacity);
               affichageCouleur.addColor(settingsAffichageCouleur, "Arêtes : ").onChange(changeArretesColor);
          };

          // Si il y a des objetFaces.
          if (objetDic["face"] != undefined) {
               // ------------------------------- Affichage des objetFaces -------------------------------.
               var affichageTypeFace = menu.addFolder("Affichage des faces : ");
               var settingsAffichageFace = {};
               // ------------------------------- Couleur des objetFaces -------------------------------.
               var affichageColorFace = menu.addFolder("Couleur des faces : ");
               var settingsColorFace = {};

               // Ajout des paramètres et couleurs et de leur fonction respectives.
               for (const j in facesColor) {
                    settingsAffichageFace["Face à " + j + " sommets : "] = 100*faceOpacity[j];
                    settingsColorFace["Face à " + j + " sommets : "] = facesColor[j].getStyle();

                    affichageTypeFace.add(settingsAffichageFace, "Face à " + j + " sommets : ", 0, 100, 0.001).onChange(changeSpecificFaceOpacity.bind({type: j}));
                    affichageColorFace.addColor(settingsColorFace, "Face à " + j + " sommets : ").onChange(changeSpecificFaceColor.bind({type: j}));
               };
          };
          menu.closed = true;
     };


     function changeXVelocity(velocity) {
          xVelocity = velocity;
     };
     function changeYVelocity(velocity) {
          yVelocity = velocity;
     };
     function changeZVelocity(velocity) {
          zVelocity = velocity;
     };


     function changeSommetsOpacity(opacity) {
          sommetOpacity = opacity/100;
          objetSommets.children.map(function(element) {element.material.transparent = (opacity != 100); element.material.opacity = opacity/100; element.visible = (opacity != 0);});
     };
     function changeArretesOpacity(opacity) {
          areteOpacity = opacity/100;
          objetAretes.children.map(function(element) {element.material.transparent = (opacity != 100); element.material.opacity = opacity/100; element.visible = (opacity != 0);});
     };
     function changeSpecificFaceOpacity(opacity) {
          var key = this.type;
          faceOpacity = opacity/100;
          objetFaces[key].children.map(function(element) {element.material.transparent = (opacity != 100); element.material.opacity = opacity/100; element.visible = (opacity != 0);});
     };
     function changeSpecificFaceColor(color) {
          var key = this.type;
          faceColor[key] = new THREE.Color(color);
          objetFaces[key].children.map(function(element) {element.material.color = new THREE.Color(color);});
     };
     function changeSommetsColor(color) {
          sommetColor = new THREE.Color(color);
          objetSommets.children.map(function(element) {element.material.color = new THREE.Color(color);});
     };
     function changeArretesColor(color) {
          areteColor = new THREE.Color(color);
          objetAretes.children.map(function(element) {element.material.color = new THREE.Color(color);});
     };


     function animate() {
          /**
           * Cette fonction est appelée à chaque rafraîchissement de la scène. Elle 
           * est capitale tant pour l'affichage graphique que pour les animations en cours.
           * Afin de réduire le nombre de calculs et d'éviter certains désagréments pour 
           * l'utilisateur, cette fonction se "met en veille" chaque fois que le curseur de 
           * l'utilisateur est en dehors de la fenêtre active (à savoir, la scène ThreeJS).
           * 
           * ----------------------- Informations -----------------------
           *           Auteur : F_Adrien.
           *           Date : 13/07/2019.
           * ------------------------------------------------------------
           * 
           */

          requestAnimationFrame(animate);                                                                                // On demande à ce que cette fonction soit appelée à chaque 'frame' : mise en place du rafraîchissement de la scène.

          if (isMouseOutsideWindow == false) {                                                                      // Si le curseur de l'utilisateur est présent dans le fenêtre active (voir le fichier 'js/utils/window/mouseUtils.js').
               {objet3D.rotation.x += xVelocity};                                                                      // On met l'objet en rotation selon l'axe des X.
               {objet3D.rotation.y += yVelocity};                                                                      // On met l'objet en rotation selon l'axe des Y.
               {objet3D.rotation.z += zVelocity};                                                                      // On met l'objet en rotation selon l'axe des Z.

               camera.lookAt(scene.position);
               camera.updateMatrixWorld();

               raycaster.setFromCamera(mouse, camera);                                                                 // On met en place un 'raycaster' issu de la caméra et qui permet d'interagir avec les objets présents dans la scène THREE.js.

               var i = [];
               for (const key in objetFaces) {
                    i = i.concat(objetFaces[key].children.filter(element => element.visible == true));
               };
               var intersects = raycaster.intersectObjects(i.concat(objetSommets.children.filter(element => element.visible == true).concat(objetAretes.children.filter(element => element.visible == true))));

               if (INTERSECTED != undefined) {                                                                           // Si l'utilisateur a déjà interagie avec un objet de la scène.
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex);                                   // Alors on lui rend sa couleur d'origine.
                    INTERSECTED = undefined;                                                                           // Et on dit que l'objet en question n'a plus été 'touché' par l'utilisateur.
               };

               if (intersects.length > 0 && INTERSECTED != intersects[0].object) {                              // Si il y a des objets de la scènes avec lesquels l'utilisateur interagie et que l'objet le plus proche n'a pas encore été 'touché.
                    INTERSECTED = intersects[0].object;                                                                 // On change d'objet 'touché'.
                    INTERSECTED.currentHex = INTERSECTED.material.color.getHex();                              // Avant de colorier l'objet, on garde en mémoire la couleur d'origine de son matériau.
                    INTERSECTED.material.color.setHex(0xfff000);                                                  // Pour montrer à l'utilisateur l'objet avec lequel il interagie, on colorie en jaune la couleur de son matériau.
               };

               renderer.render(scene, camera);
               renderer.clearDepth();

               controls.update();
          };
     };

     var grid = new THREE.GridHelper(20, 20);
     scene.add(grid);

     // On rafraîchit la scène.
     animate();
};
