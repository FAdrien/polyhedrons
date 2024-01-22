function unitRoot(n, k) {
    var theta = 2*k*Math.PI/n;
    return [Math.cos(theta), Math.sin(theta)];
};

function test(n) {
    var vertices = [];
    for (var k = 0; k < n; k++) {
        var root = unitRoot(n, k);
        vertices.push([root[0], 0, root[1]]);
    };
    return vertices;
}
