# Gulp Project   ![Version][version-image]

![Linux Build][linuxbuild-image]
![Windows Build][windowsbuild-image]
![NSP Status][nspstatus-image]
![Test Coverage][coverage-image]
![Dependency Status][dependency-image]
![devDependencies Status][devdependency-image]

The quickest way to get started with Gulp - The Streaming Build System (Task Runner), just clone the project:

```bash
$ git clone https://github.com/arjunkhetia/Gulp-Project.git
```

First we have to install the gulp command line utility:

```bash
$ npm install --global gulp-cli
```

Install dependencies:

```bash
$ npm install
```

To execute the application run:

```bash
$ gulp
```

The app will automatically start on `http://localhost:3000/`:

# Gulp

Gulp is a toolkit for automating painful or time-consuming tasks in development workflow, so we can stop messing around and build something.

```js
var gulp = require('gulp');
```

## Gulp-SASS

Gulp SASS compiles Sass files into CSS files and also minifies CSS files.

```js
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

gulp.task('sass', function(){
   return gulp.src('app/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}))
});
```

## Gulp-JS

Gulp used for concatenates (combines) multiple JS files into one large file and also minifies JS files.

```js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', function(){
    return gulp.src(['app/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});
```

## Gulp-Image

Gulp used for compressing the image files.

```js
var imagemin = require('gulp-imagemin');

gulp.task('image', function() {
   var img_src = 'app/**/*.+(png|jpg|gif|bmp)', img_dest = 'dist';
   return gulp.src(img_src)
      .pipe(imagemin())
      .pipe(gulp.dest(img_dest))
      .pipe(browserSync.reload({stream: true}))
});
```

## Gulp-Browser-Sync (LiveReload)

Gulp used for live reloading the page in all browsers, whenever files are changed.

```js
var browserSync = require('browser-sync').create();

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
```

## Gulp-Delete

Unnecessary files should be deleted before running the gulp build process.

```js
var del = require('del');

gulp.task('clean:build', function() {
   return del('./dist');
});
```

[version-image]: https://img.shields.io/badge/Version-1.0.0-orange.svg
[linuxbuild-image]: https://img.shields.io/badge/Linux-passing-brightgreen.svg
[windowsbuild-image]: https://img.shields.io/badge/Windows-passing-brightgreen.svg
[nspstatus-image]: https://img.shields.io/badge/nsp-no_known_vulns-blue.svg
[coverage-image]: https://img.shields.io/coveralls/expressjs/express/master.svg
[dependency-image]: https://img.shields.io/badge/dependencies-up_to_date-brightgreen.svg
[devdependency-image]: https://img.shields.io/badge/devdependencies-up_to_date-yellow.svg
