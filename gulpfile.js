var gulp = require('gulp');
var cssnano = require('gulp-cssnano'); // minifies CSS files
var sass = require('gulp-sass'); // compiles Sass files into CSS
var concat = require('gulp-concat'); // concatenates (combines) multiple JS files into one large file
var uglify = require('gulp-uglify'); // minifies JS files
var imagemin = require('gulp-imagemin'); // compress the image files
var browserSync = require('browser-sync').create(); // live reload to the page in all browsers, whenever files are changed
var del = require('del'); // unnecessary files should be deleted before running the build process

gulp.task('clean:build', function() {
   return del('./dist');
});

gulp.task('copy-index', function () {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function(){
   return gulp.src('app/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src(['app/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('image', function() {
   var img_src = 'app/**/*.+(png|jpg|gif|bmp)', img_dest = 'dist';
   return gulp.src(img_src)
      .pipe(imagemin())
      .pipe(gulp.dest(img_dest))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
   browserSync.init({
      port: 3000,
      watch: true,
      server: {
         baseDir: './dist',
         // directory: true
      },
   });
   gulp.watch('app/index.html', gulp.series('copy-index')).on('change', browserSync.reload);
   gulp.watch('app/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
   gulp.watch('app/**/*.js', gulp.series('js')).on('change', browserSync.reload);
   gulp.watch('app/images/*', gulp.series('image')).on('change', browserSync.reload);
});

gulp.task('watch', function(){
  gulp.watch('app/index.html', gulp.series('copy-index'));
  gulp.watch('app/**/*.scss', gulp.series('sass'));
  gulp.watch('app/**/*.js', gulp.series('js'));
  gulp.watch('app/images/*', gulp.series('image'));
});

// gulp.task('default', gulp.series('copy-index', 'sass', 'js', 'image', 'watch'));
gulp.task('default', gulp.series('clean:build', 'copy-index', 'sass', 'js', 'image', 'browser-sync'));
