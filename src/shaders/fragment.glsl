
#define PI 3.14159265359

// #pragma glslify: blend = require(glsl-blend/add)
// #pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/normal)
#pragma glslify: blend = require(glsl-blend/screen)


uniform vec2 uResolution;
uniform float uTime;

uniform sampler2D uBakedDayTexture;
uniform sampler2D uLightMapTexture;


uniform float uLightDeskStrength;
uniform vec3 uLightDeskColor;

uniform float uTvScreenStrength;
uniform vec3 uTvScreenColor;

uniform float uInverterStrength;
uniform vec3 uInverterColor;

varying vec2 vUv;

void main() {


  vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
  vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;


  vec3 bakedColor = bakedDayColor;



  float lightStrength = lightMapColor.r * uLightDeskStrength;
  bakedColor = blend(bakedColor, uLightDeskColor, lightStrength);

  float inverterLightStrength = lightMapColor.g * uInverterStrength;
  bakedColor = blend(bakedColor, uInverterColor, inverterLightStrength);

  float tvlightStrength = lightMapColor.b * uTvScreenStrength;
  bakedColor = blend(bakedColor, uTvScreenColor, tvlightStrength);

  gl_FragColor = vec4(bakedColor,1.0);
  
}
