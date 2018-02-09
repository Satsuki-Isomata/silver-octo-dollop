const gulp = require('gulp'),
      sass = require('gulp-sass'),
      svgSprite = require('gulp-svg-sprite'),
      autoprefixer = require('gulp-autoprefixer'),
      browser = require('browser-sync');

/*
sass
 */
gulp.task('sass', () => {
  gulp.src('./src/sass/*scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dest/css/'));
});


/*
svg-sprite
 */

 // path
const imgDir = './src/img/*.svg';
const spriteDir = '../dest/img/';

// mode config
const view = {// view mode
  // cssでsvg指定
  mode: {
    view: {
      render: {
        scss: {
          dest: '../src/sass/sprite/_svgSprite.scss',// sass出力先
        },
      },
      sprite: `${spriteDir}sprite.view.svg`,// svg出力先
      dimensions: false, // sass上でのサイズ用classを生成しない
      bust: false // キャッシュ用パラメータを削除
    }
  },
  shape : {
    transform: [
      {
        svgo: {
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
const symbol = {// view mode
  mode: {
    symbol: {
      sprite: `${spriteDir}sprite.symbol.svg`,
    }
  },
  shape : {
    transform: [
      {
        svgo: {
          plugins: [
            { 'removeTitle': true },
            { 'removeStyleElement': true }, // styleを削除
            { 'removeAttrs': { 'attrs': 'fill' } }, // fillを削除
            { 'removeXMLNS': true },
            { 'removeDimensions': true }
          ]
        }
      }
    ]
  },
  svg : {
    xmlDeclaration: false
  }
};

gulp.task('svg-sprite', () => {
  gulp.src(imgDir)
    .pipe(svgSprite(symbol))
    .pipe(gulp.dest('.'));// sprite.symbol.svgを生成
  gulp.src(imgDir)
    .pipe(svgSprite(view))
    .pipe(gulp.dest('.'));// sprite.view.svgと_svgSprite.scssを生成
});


/*
browserSync
 */
gulp.task("browserSync", () => {
  browser({
    server: {
      baseDir: "." // ルートとなるディレクトリを指定
    }
  });
  gulp.watch("src/**", () => {
    browser.reload();
  });
});


/*
watch
 */
gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});


gulp.task('default', ['browserSync','watch','sass','svg-sprite']);


