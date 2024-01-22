// On définit une nouvelle mesh : le point.
const segmentMesh = {
    "1": {
        "name": "Segment",
        "description": "Un segment est une portion de droite bornée par deux points. Un segment est caractérisé par l'ensemble des points appartenant à cette droite et compris entre les deux extrémités.",
        "vertex": [
                   [-1, 0, 0],
                   [1, 0, 0]
                  ],
        "edge": [
                 [0, 1]
                ]
    }
};

// Cette fonction renvoie la mesh segment.
function getSegmentMesh() {
    return segmentMesh;
};
