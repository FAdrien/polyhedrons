// Le dictionnaire contenant tous les noms des fichiers JavaScript et leur chemin respectif.
/*
 * Le format du dictionnaire contenant l'ensemble des fichiers JavaScript à charger est le suivant :
 *      * clé : le nombre du fichier JavaScript sans son extension.
 *      * valeur : le chemin relatif (depuis la racine du site) vers le fichier script.
 * 
 * Il est aussi important de tenir compte de l'ordre de disposition des couples (clé, valeur) dans 
 * le dictionnaire étant donné que les scripts seront chargés de manière synchrone selon l'ordre indiqué 
 * par le programmeur. C'est pourquoi il faut faire attention aux dépendance entre fichiers JavaScript (i.e. 
 * par exemple, un fichier qui utilise une variable déclarée dans un autre fichier devra être placé après ce 
 * dernier dans le dictionnaire).
 */
var fileToImport = {"init": "js/",

				"mathConstants": "js/utils/math/",
				"polygonsUtils": "js/utils/math/",

				"mouseUtils": "js/utils/window/",
				"windowUtils": "js/utils/window/",

				"pointMesh": "js/base/mesh/meshes/0D/",
				"segmentMesh": "js/base/mesh/meshes/1D/",
				"regularPolygonsMeshes": "js/base/mesh/meshes/2D/polygonsMeshes/convex/regular/",

				"baseMesh": "js/base/mesh/",
				"uniform": "js/base/mesh/meshes/",
				"johnson": "js/base/mesh/meshes/",
				"dualunif": "js/base/mesh/meshes/",
				"stcuboctaedre": "js/base/mesh/meshes/",
				"stdodecaedreRhb": "js/base/mesh/meshes/",
				"sticosaedre": "js/base/mesh/meshes/",
				"sttriacontaedreRhb": "js/base/mesh/meshes/",
				"zonoedre": "js/base/mesh/meshes/",

				"main": "js/"
				};


function importJSScript(fileDic) {																	// Fonction pour importer des fichiers JavaScript.
	/**
	 * Cette fonction se charge d'importer, dans l'ordre, un ensemble de fichiers 
	 * JavaScript. Pour plus de renseignement concernant l'écriture du dictionnaire chargé 
	 * de contenir l'ensemble des fichiers JavaScript à charger, voir la variable 'fileToImport' 
	 * ci-dessus.
	 * 
	 * ----------------------- Paramètre(s) -----------------------
	 * 		'fileDic' : le dictionnaire qui contient l'ensemble des fichiers JavaScript
	 * à importer.
	 * ------------------------------------------------------------
	 * 
	 * ----------------------- Informations -----------------------
	 * 		Auteur : F_Adrien.
	 * 		Date : 12/07/2019.
	 * ------------------------------------------------------------
	 * 
	 */

	return new Promise((resolve, reject) => {														// Création d'une nouvelle 'promesse' : à la fin du chargement des fichiers JavaScript (dans 'fileDic') elle exécute 'then'.
		for (var fileName in fileDic) {																// Pour chaque fichiers JavaScript à importer.
			if ($('script[src="' + fileDic[fileName] + fileName + '.js"]').length == 0) {			// On teste si le fichier JavaScript n'est pas déjà importer.
				var script = document.createElement("script");										// On crée un nouvel élément 'script'.
				script.src = fileDic[fileName] + fileName + ".js";									// On insère la source du fichier JavaScript.
				script.async = false;																// On pose un ordre de lecture sur les fichiers JavaScript (ils sont lus de manière synchrone).
				document.head.insertBefore(script, document.head.firstChild);						// On ajoute l'élément 'script' tout en haut de la tête de 'index.html'.
			};
		};
		document.head.children[0].addEventListener("load", function() {resolve(true);});			// Lorsque le dernier fichier JavaScript du dictionnaire 'fileDic' sera chargé, on autorise le navigateur Web a poursuivre.
	});
};


// On importe tous les fichiers JavaScript (dans un ordre particulier selon les dépendances -- voir le dictionnaire ci-dessus --).
importJSScript(fileToImport).then(function() {
	main();																							// On exécute la fonction principale 'main'.
});
