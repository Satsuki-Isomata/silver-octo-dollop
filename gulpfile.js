var gulp = require("gulp"),
    sass = require("gulp-sass"),
    svgSprite = require('gulp-svg-sprite');


gulp.task("sass", function() {
    gulp.src("./src/sass/*scss")
        .pipe(sass())
        .pipe(gulp.dest("./assets/css/"));
});


// svgスプライト
gulp.task('svg-sprite', function () {

  config = {
    mode: {
      // cssでsvgを指定
      view: {
        render: {
          scss: {
            dest: '/src/sass/_svgSprite.scss',// gulpfileから見たsass出力ディレクトリ
          },
        },
        sprite: '../../assets/img/sprite.view.svg',// sassから見たsvg出力場所(指定しないと/view/ができる)
        dimensions: false, // sass上でのwidth/height指定を削除
        bust: false // キャッシュ用パラメータを削除
      },

      // useタグで指定
      symbol: {
        sprite: '../../assets/img/sprite.symbol.svg',// sassから見たsvg出力場所
      }
    },
    shape : {
      transform: [
        {
          svgo: { // svgoオプション
            plugins: [
              { 'removeTitle': true }, // titleを削除
              { 'removeStyleElement': true }, // styleを削除
              { 'removeAttrs': { 'attrs': 'fill' } }, // fillを削除
              { 'removeXMLNS': true }, // xmlnを削除
              { 'removeDimensions': true } // width/heightを削除
            ]
          }
        }
      ]
    },
    svg : {
      xmlDeclaration: false // xml宣言を削除
    }
  };

  gulp.src('/assets/img/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['sass','svg-sprite']);


