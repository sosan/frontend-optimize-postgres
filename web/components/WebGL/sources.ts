export const sourcesRender: Record<string, string> = {
  "header": `vec2 p=(FC.xy*2.-r)/r.y,x,d;for(float i=1.-fract(t);i<25.;i+=.5)x=p+(cos(i*vec2(.8,.5)+t)+vec2(0,4.-i))/i,d=vec2(4,sin(i)*.4)/i,o+=(cos(i+vec4(0,2,4,0))+1.)/(length(x-d*clamp(dot(x,d)/dot(d,d),-1.,1.))+i/1e3)/max(i*i,5.)*.1;`,
  "explition-two": `float i,j,d=.1,D,e;vec3 p;for(i=0.;i++<64.&&d>1e-4;){p=vec3((FC.xy-.5*r)/r.y,e);p=vec3(log(D=length(p.xy)*2.),p.y,atan(p.x,p.z));p.xy*=rotate2D(t*.5);for(j=0.;j++<5.;)p=abs(abs(p)-.05)-.04,d=max(max(p.z,p.x),p.y),d-=D/2e4;e+=d;}o+=vec4(exp(p*p),1)*5./i;`,
  "explition-three": `for(float i,g,e,s;++i<60.;o.rgb+=hsv(.1,e*.4,s/2e3)){vec3 p=vec3((FC.xy-.5*r)/r.y*1.5*(cos(t*.5)*.5+1.5),g-.6);p.zy*=rotate2D(t*.5);s=1.;for(int i;i++<15;p=vec3(3,5,1)-abs(abs(p)*e-vec3(4,2,2)))s*=e=max(1.005,8./dot(p,p));g+=mod(length(p.zx),p.y)/s;s=log(s)/g;}`,
  "explition-four": `for(float i,g,e,s;++i<60.;o.rgb+=hsv(e-g,.6,s/8e3)){vec3 p=vec3((FC.xy-.5*r)/r.y*3.,g-.5)*rotate3D(t,vec3(2,2,sin(t)));;s=2.;for(int i;i++<9;p=vec3(3,6,1)-abs(abs(p)*e-vec3(4,1,2)))s*=e=max(1.05,6./dot(p,p));g+=mod(length(p.zx),p.y)/s;s=log(s)/g;}`,
  "explition-five": `float i,j,d=.1,e;vec3 p,q=vec3(-1,0,1.5);for(i=0.;i++<64.&&d>1e-4;){p=vec3((FC.xy-.5*r)/r.y,e);for(j=0.;j++<6.;)p=abs(p*rotate3D(t,q)*mix(q,p*p,1.64)),d=min(max(p.z,p.y),p.x),e-=d;}o+=vec4(exp(p-q),1)*3./i;`,
  "explition-one": `float i,j,d=.1,D,e;vec3 p;for(i=0.;i++<64.&&d>1e-4;){p=vec3((FC.xy-.5*r)/r.y,e)*2.;p=vec3(log(D=length(p)),exp(p.y*i),atan(p.x,p.z));p.yx*=rotate2D(-t);for(j=0.;j++<7.;)p=abs(abs(p)-.05)-.04,d=min(min(p.x,p.z),p.y),d-=D/1e4;e+=d;}o+=vec4(exp(p*vec3(-1)),1)*5./i;`,
  "loadingAnimationResult": "vec2 c=FC.xy,q,p=(c+c-r)/r.x*1.5,n;float S=7.,a,i,d=dot(p,p),e=2e1;p/=.7-d;for(;i++<e;)p*=rotate2D(5.),n*=rotate2D(5.),a+=dot(sin(q=p*e-n)/S*rotate2D(t*2.),r/r),n+=cos(q),S*=1.2;a=max(s,1.-a*.8-d);o+=(a*a*a*.1*vec4(4));",
  "loadingAnimationResult2": `float i,j,d=.1,e,h;vec3 p,q=vec3(-1.5);for(i=0.;i++<64.&&d>1e-4;){p=vec3((FC.xy-.5*r)/r.y,e);p.z-=.5;p.xy-=.4;p*=rotate3D(t,q);for(j=0.;j++<2.;)p=abs(abs(p*mix(p,q,vec3(-.8)))-.05)-.05,h=clamp(dot(p,q)/dot(q,q),-1.,2.);d=length(p-q*h)-.005;e+=d;}o+=3./i;`,
  "vector": `vec2 p=(FC.xy*2.-r)/r.y,v;for(float i=.2,l;i<1.;o+=(cos(i*5.+vec4(0,1,2,3))+1.)*(1.+v.y/(l=length(v)+.003))/l/1e2)v=vec2(mod(atan(p.x,p.y)+i+i*t,PI2)-PI,1)*length(p)-i,v.x-=clamp(v.x+=i,-i,i),i+=.05;o=tanh(o);`,
  "new": "for(float i,g,e,s;++i<99.;o.rgb+=hsv(.28*i,g*9./s-s*.1-i*.1,s/1e4)){vec3 p=vec3((FC.xy-.5*r)/r.y*.6,g-sin(t*.5)*.2);s=3.;for(int i;i++<9;p=vec3(4,4,5)-abs(p*e-g))s*=e=max(1.,g+9./dot(p,p*s));g+=distance(p.yz,p.zx*rotate2D(cos(t*.5)*1.5))/s;s=log(s)/g*.1;}",
  "new3": "vec2 uv=FC.xy/r.y*8.;if(mod(t+.5,2.)<1.)uv=uv.yx,o--;uv.y+=t*sign(mod(floor(uv.x+.5),2.)-.5);uv=(fract(uv-.5)-.5)*rotate2D(t*1.57);uv-=clamp(uv,-0.354,0.354);o+=step(length(uv),1e-5);o=abs(o);",
  "new4": "vec2 p=(FC.xy*2.-r)/r.y/.7,d=vec2(-1,1),c=p*mat2(1,1,d/(.1+5./dot(5.*p-d,5.*p-d))),v=c;v*=mat2(cos(log(length(v))+t*.2+vec4(0,33,11,0)))*5.;for(float i;i++<9.;o+=sin(v.xyyx)+1.)v+=.7*sin(v.yx*i+t)/i+.5;o=1.-exp(-exp(c.x*vec4(.6,-.4,-1,0))/o/(.1+.1*pow(length(sin(v/.3)*.2+c*vec2(1,2))-1.,2.))/(1.+7.*exp(.3*c.y-dot(c,c)))/(.03+abs(length(p)-.7))*.2);",
  "column": `precision mediump float;
uniform float time;
uniform vec2 resolution;
#define GLOW_CONTROL 0.8   // Reducido de 0.8 a 0.6
#define FINAL_WIDTH_CONTROL 0.1
#define BASE_WIDTH 1.0
#define BRIGHTNESS_INTENSITY 0.1  // Reducido de 0.5 a 0.3
#define MIN_BRIGHTNESS 0.2

float rand(vec2 st) { return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123); }
float noise(vec2 st) {
    vec2 i = floor(st), f = fract(st), u = f * f * (3.0 - 2.0 * f);
    return mix(mix(rand(i), rand(i + vec2(1.0, 0.0)), u.x), mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec3 getColor(float t) {
    vec3 c1 = vec3(1.0), c2 = vec3(0.0, 0.0, 1.0), c3 = vec3(0.0, 1.0, 1.0);
    return t < 1.0 ? mix(c1, c2, t) : t < 2.0 ? mix(c2, c3, t - 1.0) : mix(c3, c1, t - 2.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    uv.y = -uv.y;

    float tb = (sin(time * 3.0) * 0.3 + 1.1) * (BRIGHTNESS_INTENSITY - MIN_BRIGHTNESS) + MIN_BRIGHTNESS;
    float d = length(vec2(uv.x, max(0.0, uv.x))), b = 0.2 / d, aw = BASE_WIDTH * GLOW_CONTROL;
    b += pow(max(0.3, 1.9 - abs(uv.x) * (0.9 / aw)) * max(0.1, uv.y * -1.0 + sin(time * 3.0) * 0.05), 7.0) * 0.3; // Reducido de 0.5 a 0.3
    float fw = BASE_WIDTH * FINAL_WIDTH_CONTROL;
    b += pow(max(0.2, 1.0 - abs(uv.x) * (3.0 / fw)) * max(0.4, -uv.y + 0.001 + sin(time * 3.0) * 0.05), 3.0) * 1.0; // Reducido de 1.5 a 1.0
    float sb = pow(max(0.2, 1.0 - abs(uv.x) * (3.0 / fw)) * max(0.4, -uv.y + 0.001 + sin(time * 1.5) * 0.2), 3.0) * 1.0; // Reducido de 1.5 a 1.0
    b += sb;
    b *= tb;

    vec3 glowCol = 1.0 - exp(-vec3(0.2, 0.3, 0.8) * b); // Valores RGB reducidos
    glowCol += vec3(sin(time * 2.0) * 0.3 + 0.5, 1.0 - (sin(time * 2.0) * 0.3 + 0.5), 0.3) * sb * 0.3; vec2 suv = uv * vec2(10.0, 4.0);
    float angle = time * 0.5, s = sin(angle), c = cos(angle);
    suv = mat2(c, -s, s, c) * suv;
    suv.x += sin(suv.y * 10.0 + time * 5.0) * 0.1;
    suv.y += cos(suv.x * 10.0 + time * 5.0) * 0.1;
    float smoke = pow(noise(suv + vec2(0.0, time * 0.5)) * 0.5 + noise(suv + vec2(time * 0.5, 0.0)) * 0.5, 2.0);
    smoke *= 1.0 - smoothstep(0.0, 0.1, abs(uv.x));
    smoke *= smoothstep(0.5, 0.1, uv.y);

    vec3 smokeCol = getColor(time * 0.5) * smoke * 0.8;
    vec3 finalCol = mix(glowCol, smokeCol, smoke * 0.8);
    gl_FragColor = vec4(finalCol, 1.0);
}`,
  "column2": `precision mediump float;
uniform float time;
uniform vec2 resolution;

// Nuevas definiciones con valores fijos
#define COLUMN_WIDTH 1.0     // Ancho de la columna principal
#define COLUMN_BRIGHTNESS 0.2 // Brillo de la columna
#define HEAD_WIDTH 0.1       // Ancho de la "cabeza"
#define HEAD_BRIGHTNESS 0.001  // Brillo de la cabeza
#define HEAD_GLOW_WIDTH 0.001  // Ancho del glow de la cabeza

#define MIN_BRIGHTNESS 0.2

float rand(vec2 st) { return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123); }
float noise(vec2 st) {
    vec2 i = floor(st), f = fract(st), u = f * f * (3.0 - 2.0 * f);
    return mix(mix(rand(i), rand(i + vec2(1.0, 0.0)), u.x), mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec3 getColor(float t) {
    vec3 c1 = vec3(1.0), c2 = vec3(0.0, 0.0, 1.0), c3 = vec3(0.0, 1.0, 1.0);
    return t < 1.0 ? mix(c1, c2, t) : t < 2.0 ? mix(c2, c3, t - 1.0) : mix(c3, c1, t - 2.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    uv.y = -uv.y;

    float tb = (sin(time * 3.0) * 0.3 + 1.1) * (COLUMN_BRIGHTNESS - MIN_BRIGHTNESS) + MIN_BRIGHTNESS;
    float d = length(vec2(uv.x, max(0.0, uv.x))), b = 0.2 / d;

    // Columna principal
    float aw = COLUMN_WIDTH;
    b += pow(max(0.3, 1.9 - abs(uv.x) * (0.9 / aw)) * max(0.1, uv.y * -1.0 + sin(time * 3.0) * 0.05), 7.0) * 0.3;

    // Cabeza y glow
    float fw = HEAD_WIDTH;
    float headGlow = pow(max(0.1, (HEAD_GLOW_WIDTH * fw)) * max(0.1,sin(time * 1.0) ), 10.0);
    //float headGlow = 0.03;
    b += headGlow * HEAD_BRIGHTNESS;

    // Glow secundario
    float sb = pow(max(0.2, 1.0 - abs(uv.x) * (HEAD_GLOW_WIDTH / fw)) * max(0.4, -uv.y + 0.001 + sin(time * 1.5) * 0.2), 3.0) * 1.0;
    b += sb * HEAD_BRIGHTNESS - 10.01;

    b *= tb;

    // Degradado a negro
    float intensity = 0.1;
    vec3 glowCol = 1.0 - exp(-vec3(intensity) * b);
    float sinVal = sin(time * 2.0) * 0.3 + 0.5;
    glowCol += vec3(sinVal * 0.5) * sb * 0.3;

    // Efecto de humo
    vec2 suv = uv * vec2(10.0, 4.0);
    float angle = time * 0.5, s = sin(angle), c = cos(angle);
    suv = mat2(c, -s, s, c) * suv;
    suv.x += sin(suv.y * 10.0 + time * 5.0) * 0.1;
    suv.y += cos(suv.x * 10.0 + time * 5.0) * 0.1;
    float smoke = pow(noise(suv + vec2(0.0, time * 0.5)) * 0.5 + noise(suv + vec2(time * 0.5, 0.0)) * 0.5, 2.0);
    smoke *= 1.0 - smoothstep(0.0, 0.1, abs(uv.x));
    smoke *= smoothstep(0.5, 0.1, uv.y);

    vec3 smokeCol = getColor(time * 0.5) * smoke * 0.8;
    vec3 finalCol = mix(glowCol, smokeCol, smoke * 1.0);
    gl_FragColor = vec4(finalCol, 1.0);
}`,
  "column3": `precision mediump float;
uniform float time;
uniform vec2 resolution;

// Parámetros ajustables
#define TRUNK_WIDTH 0.5      // Ancho del tronco de la columna
#define COLUMN_BRIGHTNESS 4.2 // Brillo general
#define HEAD_WIDTH 0.1        // Ancho de la cabeza
#define HEAD_BRIGHTNESS 0.03  // Brillo de la cabeza
#define HEAD_GLOW_WIDTH 0.5   // Ancho del glow superior

#define COLUMN_SHARPNESS 10.0 // Nitidez de los bordes
#define COLUMN_FALLOFF 1.1    // Degradado en los bordes
#define COLUMN_OFFSET 0.05    // Movimiento oscilante vertical

#define MIN_BRIGHTNESS 0.2

float rand(vec2 st) { return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123); }
float noise(vec2 st) {
    vec2 i = floor(st), f = fract(st), u = f * f * (3.0 - 2.0 * f);
    return mix(mix(rand(i), rand(i + vec2(1.0, 0.0)), u.x), mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec3 getColor(float t) {
    vec3 c1 = vec3(1.0), c2 = vec3(0.0, 0.0, 1.0), c3 = vec3(0.0, 1.0, 1.0);
    return t < 1.0 ? mix(c1, c2, t) : t < 2.0 ? mix(c2, c3, t - 1.0) : mix(c3, c1, t - 2.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    uv.y = -uv.y;

    float tb = (sin(time * 3.0) * 0.3 + 1.1) * (COLUMN_BRIGHTNESS - MIN_BRIGHTNESS) + MIN_BRIGHTNESS;
    float d = length(vec2(uv.x, max(0.0, uv.x))), b = 0.2 / d;

    // Tronco de la columna con ancho ajustable
    float trunkWidth = TRUNK_WIDTH;
    b += pow(max(0.3, 1.9 - abs(uv.x) * (COLUMN_FALLOFF / trunkWidth)) *
             max(0.1, uv.y * -1.0 + sin(time * 3.0) * COLUMN_OFFSET), COLUMN_SHARPNESS) * 0.3;

    // Cabeza y glow
    float headGlow = pow(max(0.1, (HEAD_GLOW_WIDTH * HEAD_WIDTH)) * max(0.1, sin(time * 1.0)), 10.0);
    b += headGlow * HEAD_BRIGHTNESS;

    // Glow secundario en la parte superior
    float sb = pow(max(0.2, 1.0 - abs(uv.x) * (HEAD_GLOW_WIDTH / HEAD_WIDTH)) *
                   max(0.4, -uv.y + 0.001 + sin(time * 1.5) * 0.2), 3.0) * 1.0;
    b += sb * HEAD_BRIGHTNESS;

    b *= tb;

    // Degradado a negro con efecto glow
    float intensity = 0.1;
    vec3 baseColor = vec3(0.0, 0.5 + sin(time) * 0.3, 0.7 + cos(time) * 0.2);
    vec3 glowCol = baseColor - exp(-vec3(intensity) * b);
    float sinVal = sin(time * 2.0) * 0.3 + 0.5;
    glowCol += vec3(sinVal * 0.5) * sb * 0.3;

    // Efecto de humo
    vec2 suv = uv * vec2(10.0, 4.0);
    float angle = time * 1.5, s = sin(angle), c = cos(angle);
    suv = mat2(c, -s, s, c) * suv;
    suv.x += sin(suv.y * 10.0 + time * 5.0) * 0.1;
    suv.y += cos(suv.x * 10.0 + time * 5.0) * 0.1;
    float smoke = pow(noise(suv + vec2(0.0, time * 0.5)) * 0.5 + noise(suv + vec2(time * 0.5, 0.0)) * 0.5, 2.0);
    smoke *= 1.0 - smoothstep(0.0, 0.1, abs(uv.x));
    smoke *= smoothstep(1.5, 0.1, uv.y);

    vec3 smokeCol = getColor(time * 0.5) * smoke * 0.8;
    vec3 finalCol = mix(glowCol, smokeCol, smoke * 1.0);

    gl_FragColor = vec4(finalCol, 1.0);
}`,
  "column4": `precision mediump float;
uniform float time;
uniform vec2 resolution;

// Parámetros ajustables
#define TRUNK_WIDTH 0.5
#define COLUMN_BRIGHTNESS 4.2
#define HEAD_WIDTH 0.1
#define HEAD_BRIGHTNESS 0.03
#define HEAD_GLOW_WIDTH 0.5
#define COLUMN_SHARPNESS 10.0
#define COLUMN_FALLOFF 1.1
#define COLUMN_OFFSET 0.05
#define MIN_BRIGHTNESS 0.2

float rand(vec2 st) { return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123); }
float noise(vec2 st) {
    vec2 i = floor(st), f = fract(st), u = f * f * (3.0 - 2.0 * f);
    return mix(mix(rand(i), rand(i + vec2(1.0, 0.0)), u.x), mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Nueva función de color con transiciones más suaves
vec3 getColor(float t) {
    vec3 c1 = vec3(0.2, 0.4, 1.0);  // Azul eléctrico
    vec3 c2 = vec3(1.0, 0.0, 0.5);  // Magenta neón
    vec3 c3 = vec3(0.8, 0.5, 0.1);  // Ámbar cálido
    return mix(mix(c1, c2, sin(t * 0.3) * 0.5 + 0.5), c3, cos(t * 0.2) * 0.5 + 0.5);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    uv.y = -uv.y;

    float tb = (sin(time * 3.0) * 0.3 + 1.1) * (COLUMN_BRIGHTNESS - MIN_BRIGHTNESS) + MIN_BRIGHTNESS;
    float d = length(vec2(uv.x, max(0.0, uv.x))), b = 0.2 / d;

    // Tronco de la columna
    float trunkWidth = TRUNK_WIDTH;
    b += pow(max(0.3, 1.9 - abs(uv.x) * (COLUMN_FALLOFF / trunkWidth)) *
             max(0.1, uv.y * -1.0 + sin(time * 3.0) * COLUMN_OFFSET), COLUMN_SHARPNESS) * 0.3;

    // Cabeza y glow
    float headGlow = pow(max(0.1, (HEAD_GLOW_WIDTH * HEAD_WIDTH)) * max(0.1, sin(time * 1.0)), 10.0);
    b += headGlow * HEAD_BRIGHTNESS;

    // Glow superior
    float sb = pow(max(0.2, 1.0 - abs(uv.x) * (HEAD_GLOW_WIDTH / HEAD_WIDTH)) *
                   max(0.4, -uv.y + 0.001 + sin(time * 1.5) * 0.2), 3.0) * 7.0;
    b += sb * HEAD_BRIGHTNESS;

    b *= tb;

    // Glow base con nuevos colores
    float intensity = 0.1;
    vec3 baseColor = vec3(0.1, 0.3 + sin(time * 0.8) * 0.3, 0.7 + cos(time * 0.5) * 0.2);
    vec3 glowCol = baseColor - exp(-vec3(intensity) * b);
    glowCol += vec3(sin(time * 2.0) * 0.5 + 0.5) * sb * 0.3;

    // Efecto de humo con más variabilidad
    vec2 suv = uv * vec2(10.0, 4.0);
    float angle = time * 1.2, s = sin(angle), c = cos(angle);
    suv = mat2(c, -s, s, c) * suv;
    suv.x += sin(suv.y * 10.0 + time * 4.0) * 0.1;
    suv.y += cos(suv.x * 10.0 + time * 4.0) * 0.1;
    float smoke = pow(noise(suv + vec2(0.0, time * 0.5)) * 0.5 + noise(suv + vec2(time * 0.5, 0.0)) * 0.5, 2.0);
    smoke *= 1.0 - smoothstep(0.0, 0.2, abs(uv.x));
    smoke *= smoothstep(1.5, 0.1, uv.y);

    // Nuevo color de humo con transiciones dinámicas
    vec3 smokeCol = getColor(time * 0.5) * smoke * 1.2;
    vec3 finalCol = mix(glowCol, smokeCol, smoke * 0.8);

    gl_FragColor = vec4(finalCol, 1.0);
}
`,
  "planet": `vec2 p=(FC.xy*2.-r)/r.y,l,v=p*(1.-(l+=abs(.7-dot(p,p))))/.2;for(float i;i++<8.;o+=(sin(v.xyyx)+1.)*abs(v.x-v.y)*.2)v+=cos(v.yx*i+vec2(0,i)+t)/i+.7;o=tanh(exp(p.y*vec4(1,-1,-2,0))*exp(-4.*l.x)/o);`,
  "planet2": `vec2 p=(FC.xy*2.-r)/r.y;for(float i=-1.,N=4e2;i<1.;i+=2./N){vec3 v=vec3(cos(N*i*2.4+sin(i*N+t)+t+vec2(0,11))*sqrt(1.-i*i),i);o+=(sin(i*4.+vec4(6,1,2,3))+1.)*(v.y+1.)/N/length(p-v.xz/(1.6-v.y));}o=tanh(.2*o*o);`
  // "vector": `vec2 p=(FC.xy*2.-r)/r.y,v;for(float i=.2,l;i<1.;o+=(cos(i*5.+vec4(0,1,2,3))+1.)*(1.+v.y/(l=length(v)+.003))/l/1e2)v=vec2(mod(atan(p.y,p.x)+i+i*t,PI2)-PI,1)*length(p)-i,v.x-=clamp(v.x+=i,-i,i),i+=.05;o=tanh(o);`
}
