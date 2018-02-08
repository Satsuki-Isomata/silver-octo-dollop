var gulp = require("gulp"),
    sass = require("gulp-sass"),
    svgSprite = require('gulp-svg-sprite');
    autoprefixer = require('gulp-autoprefixer');
    browser = require("browser-sync");

/*
sass
 */
gulp.task("sass", function() {
  gulp.src("./src/sass/*scss")
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest("./assets/css/"));
});


/*
svg-sprite
 */

// sprite設定
view = {
  mode: {
    // cssでsvg指定
    view: {
      render: {
        scss: {
          dest: '../src/sass/sprite/_svgSprite.scss',// gulpfileから見たsass出力ディレクトリ
        },
      },
      sprite: '../assets/img/sprite/sprite.view.svg',// gulpfileから見たsvg出力場所(指定しないと/view/ができる)
      dimensions: false, // sass上でのwidth/height指定を削除
      bust: false // キャッシュ用パラメータを削除
    }
  },
  shape : {
    transform: [
      {
        svgo: { // svgoオプション
          plugins: [
            { 'removeTitle': true }, // titleを削除
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
symbol = {
  mode: {
    // useタグでsvg指定
    symbol: {
      sprite: '../assets/img/sprite/sprite.symbol.svg',// gulpfileから見たsvg出力場所
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

gulp.task('svg-sprite', function() {

  // symbol mode
  gulp.src('assets/img/*.svg')
  .pipe(svgSprite(symbol))
  .pipe(gulp.dest('.'));

  // view mode
  gulp.src('assets/img/*.svg')
  .pipe(svgSprite(view))
  .pipe(gulp.dest('.'));
});

/*
browserSync
 */
gulp.task("browserSyncTask", function () {
    browser({
        server: {
            baseDir: "." // ルートとなるディレクトリを指定
        }
    });
 
    gulp.watch("src/**", function() {
        browser.reload();
    });
});


/*
watch
 */
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});


gulp.task('default', ['browserSyncTask','watch','sass','svg-sprite']);


