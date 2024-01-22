var isMouseOutsideWindow = true;																	// Cette variable permet de savoir si le curseur de la souris de l'utilisateur est en dehors ou non de la scène THREE.js.
$(window).mouseout(function() {isMouseOutsideWindow = true;});										// Lorsque le curseur de la souris de l'utilisateur quitte la scène THREE.js, on met à 'true' cette variable.
$(window).mouseenter(function() {isMouseOutsideWindow = false;});									// Lorsque le curseur de la souris de l'utilisateur rentre dans la scène THREE.js, on met à 'false' cette variable.


$(window).resize(function() {
	/**
	 * Cette fonction permet de calculer les coordonnées du curseur de la 
	 * souris de l'utilisateur (en temps réel) dans la scène THREE.js lorsque 
	 * celui-ci retaille l'écran de la scène.
	 * 
	 * ----------------------- Informations -----------------------
	 * 		Auteur : F_Adrien.
	 * 		Date : 16/07/2019.
	 * ------------------------------------------------------------
	 * 
	 */
	camera.aspect = container.clientWidth/container.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.render(scene, camera);

	controls.handleResize();
});


$(window).bind('beforeunload', function() {renderer.forceContextLoss();});							// Lors du rafraîchissement de la page, il est nécessaire de forcer la fermeture de l'instance WebGL courante.
