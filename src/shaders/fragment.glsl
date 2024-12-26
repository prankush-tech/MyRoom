
#define PI 3.14159265359

#pragma glslify: blend = require(glsl-blend/add)
// #pragma glslify: blend = require(glsl-blend/average)
// #pragma glslify: blend = require(glsl-blend/color-burn)
// #pragma glslify: blend = require(glsl-blend/color-dodge)
// #pragma glslify: blend = require(glsl-blend/darken)
// #pragma glslify: blend = require(glsl-blend/difference)
// #pragma glslify: blend = require(glsl-blend/exclusion)
// #pragma glslify: blend = require(glsl-blend/glow)
// #pragma glslify: blend = require(glsl-blend/hard-light)
// #pragma glslify: blend = require(glsl-blend/hard-mix)
// #pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/linear-burn)
// #pragma glslify: blend = require(glsl-blend/linear-dodge)
// #pragma glslify: blend = require(glsl-blend/linear-light)
// #pragma glslify: blend = require(glsl-blend/multiply)
// #pragma glslify: blend = require(glsl-blend/negation)
// #pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/overlay)
// #pragma glslify: blend = require(glsl-blend/phoenix)
// #pragma glslify: blend = require(glsl-blend/pin-light)
// #pragma glslify: blend = require(glsl-blend/reflect)
// #pragma glslify: blend = require(glsl-blend/screen)
// #pragma glslify: blend = require(glsl-blend/soft-light)
// #pragma glslify: blend = require(glsl-blend/subtract)
// #pragma glslify: blend = require(glsl-blend/vivid-light)
// #pragma glslify: blend = require(glsl-blend/glow)


uniform vec2 uResolution;
uniform float uTime;

uniform sampler2D uBakedDayTexture;
uniform sampler2D uLightMapTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uTexture;


uniform float uLightDeskStrength;
uniform vec3 uLightDeskColor;

uniform float uTvScreenStrength;
uniform vec3 uTvScreenColor;

uniform float uInverterStrength;
uniform vec3 uInverterColor;

varying vec2 vUv;

uniform float uNightStrength;
uniform float uStrength;

void main() {


  vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
  vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;
  vec3 nightColor = texture2D(uNightTexture, vUv).rgb;
  vec3 uTextureWhite = texture2D(uTexture, vUv).rgb;
  vec3 bakedColor = mix(mix(nightColor,bakedDayColor, uNightStrength),uTextureWhite, uStrength);

  float lightStrength = lightMapColor.r * uLightDeskStrength;
  bakedColor = blend(bakedColor, uLightDeskColor, lightStrength);

  float inverterLightStrength = lightMapColor.g * uInverterStrength;
  bakedColor = blend(bakedColor, uInverterColor, inverterLightStrength);

  float tvlightStrength = lightMapColor.b * uTvScreenStrength;
  bakedColor = blend(bakedColor, uTvScreenColor, tvlightStrength);

  gl_FragColor = vec4(bakedColor,1.0);

    // #include <tonemapping_fragment>
    // #include <colorspace_fragment>
  
}
