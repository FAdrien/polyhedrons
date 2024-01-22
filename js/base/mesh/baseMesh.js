function cylindre(vector1, vector2, material) {
	/**
	 * Cette fonction simplifie la construction d'un cylindre.
	 * 
	 * ----------------------- Paramètres -----------------------
	 * 		'vecteur_1' : un point de l'espace (l'une des deux extrémités du cylindre).
	 * 		'vecteur_2' : un point de l'espace (l'autre extrémité du cylindre).
	 * 		'material' : un matériau à conférer au cylindre à créer.
	 * ----------------------------------------------------------
	 * 
	 * ----------------------- Informations -----------------------
	 * 		Auteur : F_Adrien.
	 * 		Date : 14/07/2019.
	 * ------------------------------------------------------------
	 * 
	 */

	var direction = new THREE.Vector3().subVectors(vector2, vector1);
	var mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, direction.length(), 50, 1), material);
	var position = new THREE.Vector3().addVectors(vector1, direction.multiplyScalar(0.5));

	mesh.applyQuaternion(new THREE.ArrowHelper(direction.clone().normalize(), vector1).quaternion);// On met le cylindre dans la bonne direction.
	mesh.position.set(position.x, position.y, position.z);

	return mesh;
};
