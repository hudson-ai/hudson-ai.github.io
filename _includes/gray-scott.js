int H = 240;
int W = 135;
PImage img = createImage(H, W, RGB);

//System parameters
double diffU;
double diffV;
double paramF;
void setParamF(float v) { paramF = v; }
double paramK;
void setParamK(float v) { paramK = v; }

boolean rndInitCondition;
void setRndInitCondition(boolean b) { rndInitCondition = b };

double[][] U = new double[H][W];
double[][] V = new double[H][W];

double[][] dU = new double[H][W];
double[][] dV = new double[H][W];

int[][] horizOffset = new int[W][2];
int[][] vertOffset = new int[H][2];


void generateInitialState() {
for (int i = 0; i < H; i++) {
for (int j = 0; j < W; j++) { 
U[i][j] = 1.0;
V[i][j] = 0.0;
}
}

if (rndInitCondition) {
for (int i = 0; i < H; i++) {
for (int j = 0; j < W; j++) {     
 if (pow(i-H/2, 2) + pow(j-W/2, 2) < 400) {  
   if (random(0, 1) > .8) {
     U[i][j] = random(0, 1);
     V[i][j] = random(0, 1);
   }
 }
}
}
} else {
for (int i = 0; i < H; i++) {
for (int j = 0; j < W; j++) {     
 if (pow(i-H/2, 2) + pow(j-W/2, 2) < 400) {
   U[i][j] = 0;
   V[i][j] = 1;
 }
}
}
}
}

void setup() {
//fullScreen(P2D);
size(960, 540, P2D);
frameRate(30);
smooth();
colorMode(HSB, 1.0);
//colorMode(RGB, 1.0);

//Set default parameters;
diffU = 0.16;
diffV = 0.08;
paramF = 0.03;
paramK = 0.059;

rndInitCondition = true;

//Populate U and V with initial data
generateInitialState();

//Set up offsets 
for (int i = 0; i < W; i++) {
horizOffset[i][0] = i-1;
horizOffset[i][1] = i+1;
}

horizOffset[0][0] = W-1;
horizOffset[0][1] = 1;

horizOffset[W-1][0] = W-2;
horizOffset[W-1][1] = 0;

for (int i = 0; i < H; i++) {
vertOffset[i][0] = i-1;
vertOffset[i][1] = i+1;
}

vertOffset[0][0] = H-1;
vertOffset[0][1] = 1;

vertOffset[H-1][0] = H-2;
vertOffset[H-1][1] = 0;
}

void timestep(double F, double K, double diffU, double diffV) {
for (int i = 0; i < H; i++) {
for (int j = 0; j < W; j++) {

double u = U[i][j];
double v = V[i][j];

int up = vertOffset[i][0];
int down = vertOffset[i][1];
int left = horizOffset[j][0];
int right = horizOffset[j][1];

double uvv = u*v*v;     
double lapU = (U[up][j] + U[down][j] + U[i][left] + U[i][right] - 4*u);
double lapV = (V[up][j] + V[down][j] + V[i][left] + V[i][right] - 4*v);

dU[i][j] = diffU*lapU  - uvv + F*(1 - u);
dV[i][j] = diffV*lapV + uvv - (K+F)*v;
}
}


for (int i= 0; i < H; i++) {
for (int j = 0; j < W; j++) {
U[i][j] += dU[i][j];
V[i][j] += dV[i][j];
}
}
}

void draw() { 
for (int k = 0; k < 10; k++) {
timestep(paramF, paramK, diffU, diffV);
}

img.loadPixels();
for (int i = 0; i < H; i++) {
for (int j = 0; j < W; j++) {

float val = (float)(1-U[i][j]);
//purple
//img.pixels[i*W + j] = color(0.74, 0.87, val); 

//blueish heatmap
img.pixels[i + j*H] = color(val, val, val);
//img.pixels[i + j*H] = color(V[i][j], 0, (V[i][j] - U[i][j] + 1)/2);

//gray  
//img.pixels[i*W + j] = color(1-val);
}
}
img.updatePixels();
image(img, 0, 0, width, height);
//make black
//filter(THRESHOLD);
//cool contrasty filter
//filter(POSTERIZE, 4);
}


void keyPressed() {
switch (key) {
case 'r':
rndInitCondition = true;
generateInitialState();
break;
case 'n':
rndInitCondition = false;
generateInitialState();
}
}

