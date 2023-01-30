import gulp from "gulp";
import gulpsass from "gulp-sass";
import dartsass from "sass";
const sass = gulpsass(dartsass);
import plumber from"gulp-plumber";
import postcss from"gulp-postcss";
import postcssCustomProperties from"postcss-custom-properties";
import autoprefixer from"autoprefixer";
import sync from "browser-sync";
const server = sync.create();
import csso from "gulp-csso";
import rename from "gulp-rename";
import { deleteSync } from "del";
import svgstore from "gulp-svgstore";
import posthtml from "gulp-posthtml";
import include from "posthtml-include";
import htmlmin from "gulp-htmlmin";
import webpack from "webpack-stream";

const webpackDevOptions = {
  mode: "development",
  output: {
    environment: {
      arrowFunction: false
    },
    filename: "bundle.js"
  },
  watch: false,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true,
                  corejs: "3.26",
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

const webpackProdOptions = {
  mode: "production",
  output: {
    environment: {
      arrowFunction: false
    },
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  corejs: "3.26",
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

export function style() {
  const plugins = [
    postcssCustomProperties(),
    autoprefixer()
  ];

  return gulp.src([
    "source/sass/style.scss",
    "source/sass/light.scss",
    "source/sass/dark.scss"
  ])
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(csso())
    .pipe(rename(function (path) {
      path.dirname = "";
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
}

export function clean(done) {
  deleteSync("build");
  done();
}

export function copy() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
}

export function sprite() {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

export function html() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

export function jsDev() {
  return gulp.src("source/js/index.js")
    .pipe(webpack(webpackDevOptions))
    .pipe(gulp.dest("build/js"));
}

export function jsProd() {
  return gulp.src("source/js/index.js")
    .pipe(webpack(webpackProdOptions))
    .pipe(gulp.dest("build/js"));
}

export function serve(done) {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

export function watch() {
  gulp.watch("source/sass/**/*.{scss,sass}", style);
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/js/**/*.js", gulp.series(jsDev, reload));
}

export const buildProd = gulp.series(
  clean,
  gulp.parallel(
    copy,
    sprite,
    style,
    jsProd
  ),
  html
);

export default gulp.series(
  clean,
  gulp.parallel(
    copy,
    sprite,
    style,
    jsDev
  ),
  html,
  gulp.parallel(
    serve,
    watch
  )
);
