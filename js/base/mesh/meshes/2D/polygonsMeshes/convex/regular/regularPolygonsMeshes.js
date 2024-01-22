// On définit de nouvelles meshes : les 8 premiers polygones réguliers (triangle équialtéral -> dodécagone régulier).
const regularPolygonsMeshes = {
    "1": {
        "name": "Triangle équilatéral",
        "description": "",
        "vertex": test(3),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 0]
                ],
        "face": [
                  [0, 1, 2]
                ]
    },
    "2": {
        "name": "Carré",
        "description": "",
        "vertex": test(4),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 0]
                ],
        "face": [
                  [0, 1, 2, 3]
                ]
    },
    "3": {
        "name": "Pentagone régulier",
        "description": "",
        "vertex": test(5),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 4],
                 [4, 0]
                ],
        "face": [
                  [0, 1, 2, 3, 4]
                ]
    },
    "4": {
        "name": "Hexagone régulier",
        "description": "",
        "vertex": test(6),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 4],
                 [4, 5],
                 [5, 0]
                ],
        "face": [
                  [0, 1, 2, 3, 4, 5]
                ]
    },
    "5": {
        "name": "Heptagone régulier",
        "description": "",
        "vertex": test(7),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 4],
                 [4, 5],
                 [5, 6],
                 [6, 0]
                ],
        "face": [
                  [0, 1, 2, 3, 4, 5, 6]
                ]
    },
    "6": {
        "name": "Octogone régulier",
        "description": "",
        "vertex": test(8),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 4],
                 [4, 5],
                 [5, 6],
                 [6, 7],
                 [7, 0]
                ],
        "face": [
                  [0, 1, 2, 3, 4, 5, 6, 7]
                ]
    },
    "7": {
        "name": "Ennéagone régulier",
        "description": "",
        "vertex": test(9),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 4],
                 [4, 5],
                 [5, 6],
                 [6, 7],
                 [7, 8],
                 [8, 0]
                ],
        "face": [
                  [0, 1, 2, 3, 4, 5, 6, 7, 8]
                ]
    },
    "8": {
        "name": "Décagone régulier",
        "description": "",
        "vertex": test(10),
        "edge": [
                 [0, 1],
                 [1, 2],
                 [2, 3],
                 [3, 4],
                 [4, 5],
                 [5, 6],
                 [6, 7],
                 [7, 8],
                 [8, 9],
                 [9, 0]
                ],
        "face": [
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                ]
    }
};

// Cette fonction renvoie les meshes des polygones réguliers.
function getRegularPolygonsMeshes() {
    return regularPolygonsMeshes;
};
