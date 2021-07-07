let mix = require("laravel-mix");

mix.browserSync({
  proxy: "http://contrast-checker.local",
  files: ["**/*.html", "dist/css/**/*.css", "dist/js/**/*.js"],
});

mix
  .js("src/js/app.js", "dist/js")
  .react()
  .sass("src/sass/style.scss", "dist/css");
