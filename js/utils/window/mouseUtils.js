var mouse = new THREE.Vector2(), INTERSECTED;														// La position du curseur de la souris de l'utilisateur dans la scène ThreeJS (et uniquement dans cette scène !).

$(window).mousemove(function(event) {
	/**
	 * Cette fonction permet de calculer les coordonnées du curseur de la 
	 * souris de l'utilisateur (en temps réel) dans la scène THREE.js lorsque 
	 * celui-ci bouge le curseur de sa souris sur l'écran.
	 * 
	 * ----------------------- Paramètre(s) -----------------------
	 * 		'event' : cet objet symbolise l'événement associé au déplacement du 
	 * curseur de la souris de l'utilisateur. Il permet entre autres d'accéder aux 
	 * coordonnées de ce curseur.
	 * ------------------------------------------------------------
	 * 
	 * ----------------------- Informations -----------------------
	 * 		Auteur : F_Adrien.
	 * 		Date : 16/07/2019.
	 * ------------------------------------------------------------
	 * 
	 */

	event.preventDefault();																			// On informe le navigateur Web de l'utilisateur que si cette fonction n'est pas supportée alors il ne doit pas l'exécuter.

	mouse.x = (event.clientX/container.clientWidth)*2-1;											// Calcul de la coordonnée X normalisée du curseur de la souris dans la scène ThreeJS (et uniquement cette scène !).
	mouse.y = 1-(event.clientY/container.clientHeight)*2;											// Calcul de la coordonnée Y normalisée du curseur de la souris dans la scène ThreeJS (et uniquement cette scène !).
});
