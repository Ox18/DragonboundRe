var Vector = require('./vect');

function Box(position, width, height, ori) {
    this.position = position || new Vector();
    this.width = Number(width) || 1;
    this.height = Number(height) || 1;

    this.axes = new Array(2);
    this.axes[0] = new Vector(1, 0);
    this.axes[1] = new Vector(0, -1);

    if (Number(ori))
        this.rotate(ori);
}

Box.prototype.setp = function (vec) {
    this.position = vec;
};

Box.prototype.move = function (vec) {
    if (vec instanceof Vector) {
        this.position.add(vec);
    }
};

Box.prototype.rotate = function (ang) {
    this.axes[0].rotate(ang);
    this.axes[1].rotate(ang);
};

Box.prototype.setAngle = function (ang) {
    this.axes[0].setAngle(ang);
    this.axes[1].setAngle(ang);
};

Box.prototype.isColliding = function (b) {
    var t = new Vector(b.position.x, b.position.y);
    t.subtract(this.position);
    var s1 = new Vector(t.dot(this.axes[0]), t.dot(this.axes[1]));
    t.set(this.position);
    t.subtract(b.position);
    var s2 = new Vector(t.dot(b.axes[0]), t.dot(b.axes[1]));

    var d = new Array(4);
    d[0] = this.axes[0].dot(b.axes[0]);
    d[1] = this.axes[0].dot(b.axes[1]);
    d[2] = this.axes[1].dot(b.axes[0]);
    d[3] = this.axes[1].dot(b.axes[1]);

    var ra = 0,
        rb = 0;

    ra = this.width * 0.5;
    rb = Math.abs(d[0]) * b.width * 0.5 + Math.abs(d[1]) * b.height * 0.5;
    if (Math.abs(s1.x) > ra + rb) {
        //delete t;
        //delete s1;
        //delete s2;
        //delete d;
        return 1;
    }

    ra = this.height * 0.5;
    rb = Math.abs(d[2]) * b.width * 0.5 + Math.abs(d[3]) * b.height * 0.5;
    if (Math.abs(s1.y) > ra + rb) {
        //delete t;
        //delete s1;
        //delete s2;
        //delete d;
        return 2;
    }

    ra = Math.abs(d[0]) * this.width * 0.5 + Math.abs(d[2]) * this.height * 0.5;
    rb = b.width * 0.5;
    if (Math.abs(s2.x) > ra + rb) {
        //delete t;
        //delete s1;
        //delete s2;
        //delete d;
        return 3;
    }

    ra = Math.abs(d[1]) * this.width * 0.5 + Math.abs(d[3]) * this.height * 0.5;
    rb = b.height * 0.5;
    if (Math.abs(s2.y) > ra + rb) {
        //delete t;
        //delete s1;
        //delete s2;
        //delete d;
        return 4;
    }

    //delete t;
    //delete s1;
    //delete s2;
    //delete d;
    return 0;
};

Box.prototype.updateCorners = function () {
    this.p1 = this.p1 ? this.p1.set(this.position) : new Vector(this.position.x, this.position.y);
    this.p2 = this.p2 ? this.p2.set(this.position) : new Vector(this.position.x, this.position.y);
    this.p3 = this.p3 ? this.p3.set(this.position) : new Vector(this.position.x, this.position.y);
    this.p4 = this.p4 ? this.p4.set(this.position) : new Vector(this.position.x, this.position.y);

    this.p1.subtract(this.axes[0], this.width * 0.5);
    this.p1.add(this.axes[1], this.height * 0.5);

    this.p2.add(this.axes[0], this.width * 0.5);
    this.p2.add(this.axes[1], this.height * 0.5);

    this.p3.add(this.axes[0], this.width * 0.5);
    this.p3.subtract(this.axes[1], this.height * 0.5);

    this.p4.subtract(this.axes[0], this.width * 0.5);
    this.p4.subtract(this.axes[1], this.height * 0.5);
};

Box.prototype.render = function () {
    this.updateCorners();
};

Box.prototype.renderAxes = function () {
    Vector.arrow(this.position, this.axes[0], this.width * 0.5);
    Vector.arrow(this.position, this.axes[1], this.height * 0.5);
};

Box.prototype.renderWithRespect = function (b) {
    this.s1 = this.s1 ? this.s1.set(this.position) : new Vector(this.position.x, this.position.y);
    this.s2 = this.s2 ? this.s2.set(this.position) : new Vector(this.position.x, this.position.y);
    this.s3 = this.s3 ? this.s3.set(this.position) : new Vector(this.position.x, this.position.y);
    this.s4 = this.s4 ? this.s4.set(this.position) : new Vector(this.position.x, this.position.y);

    var wf = b.axes[0].dot(this.axes[0]) * this.width * 0.5 + b.axes[0].dot(this.axes[1]) * this.height * 0.5;
    var hf = b.axes[1].dot(this.axes[0]) * this.width * 0.5 + b.axes[1].dot(this.axes[1]) * this.height * 0.5;

    this.s1.subtract(b.axes[0], wf);
    this.s1.add(b.axes[1], hf);

    this.s2.add(b.axes[0], wf);
    this.s2.add(b.axes[1], hf);

    this.s3.add(b.axes[0], wf);
    this.s3.subtract(b.axes[1], hf);

    this.s4.subtract(b.axes[0], wf);
    this.s4.subtract(b.axes[1], hf);
};

module.exports = Box;