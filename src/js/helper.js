export function calculateContrastRatio(background, foreground) {
  var backgroundLuminance = background.luminance;
  var foregroundLuminance = foreground.luminance;

  console.log(background);
  var brightest = Math.max(backgroundLuminance, foregroundLuminance);
  var darkest = Math.min(backgroundLuminance, foregroundLuminance);
  return (brightest + 0.05) / (darkest + 0.05);
}
