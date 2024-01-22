// On définit une nouvelle mesh : le point.
const pointMesh = {
    "1": {
        "name": "Point",
        "description": "Un point est une notion primitive sur laquelle se base la géométrie. Il n'a ni longueur, ni aire, ni volume ni de vraie dimension. Un point peut s'interpréter comme une unique position dans un espace Euclidien.",
        "vertex": [
                   [0, 0, 0]
                  ]
    }
};

// Cette fonction renvoie la mesh point.
function getPointMesh() {
    return pointMesh;
};
