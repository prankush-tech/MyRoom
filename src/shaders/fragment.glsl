
#define PI 3.14159265359
#pragma glslify: blend = require(glsl-blend/lighten)


uniform vec2 uResolution;
uniform sampler2D uBakedDayTexture;
uniform sampler2D uLightMapTexture;
uniform float uTime;
uniform float uLightDeskStrength;

varying vec2 vUv;

void main() {

  vec3 uLightColor = vec3(1.0, 0.0, 0.0); 

  vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
  vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;


  vec4 testTesxture = texture2D(uBakedDayTexture, vUv);


  float lightStrength = lightMapColor.r * uLightDeskStrength;
  vec3 bakedColor = blend(bakedDayColor, uLightColor, lightStrength);

  gl_FragColor = vec4(bakedColor,1.0);
  
}
