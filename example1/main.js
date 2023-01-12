const canvasWidth = 960;
const canvasHeight = 540;
let img;
let spheres = [];
const max_spheres = 100;
const dt = 1.0;

class Sphere{
    p = [];
    v = [];
    r = 0.0;
    constructor(p1,v1,r1){
        this.p = [...p1];
        this.v = [...v1];
        this.r = r1;
    }
}

function setup() {
    createCanvas(canvasWidth, canvasHeight, WEBGL);
    background(230);
    ortho(width/2, -width/2, height/2, -height/2, 0, 500);
    
    img = loadImage('thomas.png');

    for(let i=0; i<max_spheres; ++i){
        let p1=[], v1=[], r1;
        p1[0] = random(-width/2, width/2);
        p1[1] = random(-width/2, width/2);
        v1[0] = random(-4.0,4.0);
        v1[1] = random(-4.0,4.0);
        r1 = random(10.0,50.0);

        spheres.push(new Sphere(p1,v1,r1));
    }
}

function drawSphere(sphere_i){
    push();
    noStroke();
    texture(img);
    rotateY(Math.PI);
    rotateZ(Math.PI);
    translate(sphere_i.p[0],sphere_i.p[1]); 
    sphere(sphere_i.r);
    pop();
}


function collisionWalls(sphere_i){
    const r = sphere_i.r;
    const left_positionLimit = -width/2 + r;
    const right_positionLimit = width/2 - r;
    const top_positionLimit = height/2 - r;
    const bottom_positionLimit = -height/2 + r;

    if(sphere_i.p[0] <= left_positionLimit){
        sphere_i.p[0] = left_positionLimit;
        sphere_i.v[0] *= -1.0;
    }
    else if(sphere_i.p[0] >= right_positionLimit){
        sphere_i.p[0] = right_positionLimit;
        sphere_i.v[0] *= -1.0;
    }
    
    if(sphere_i.p[1] <= bottom_positionLimit){
        sphere_i.p[1] = bottom_positionLimit;
        sphere_i.v[1] *= -1.0;
    }
    else if(sphere_i.p[1] >= top_positionLimit){
        sphere_i.p[1] = top_positionLimit;
        sphere_i.v[1] *= -1.0;
    }
}

function draw() {

    background(230);

    for(let i=0; i<spheres.length; ++i){
        let sphere_i = spheres[i];
        drawSphere(sphere_i);

        sphere_i.p[0] += sphere_i.v[0]*dt;
        sphere_i.p[1] += sphere_i.v[1]*dt;

        collisionWalls(sphere_i);
    }
}