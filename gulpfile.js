var gulp = require('gulp');
var sass = require('gulp-sass'),
cleanCss = require('gulp-clean-css'),
rename = require('gulp-rename'),
 concatreplace = require('gulp-concat-replace'),
jade = require('gulp-jade'),
imagemin = require('gulp-imagemin'),
 imageminPngcrush = require('imagemin-pngcrush'),
 htmlreplace = require('gulp-html-replace');
 



paths = {
  sass: ['./**/**/*.scss'],
  js: [ './src/js/**/*'],
  html: ['./src/index.html'],
  images: ['./src/img/**/*'],
  tmplates : ['./src/templates/**/*.jade'],
  fonts : ['./src/lib/ionic/fonts/*']
};

gulp.task('default', ['movermanifiest','sass','compile','comprimir-images','template'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['compile']);
  gulp.watch(paths.html, ['compile']);
  gulp.watch(paths.images, ['comprimir-imagenes']);
  gulp.watch(paths.tmplates, ['template']);
});

// genera los css

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./scss/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


// genera los template en html 
gulp.task('template', function() {
  
 
  gulp.src(paths.tmplates)
    .pipe(jade())
    .pipe(gulp.dest('./www/templates'));
});


// unifica los javascripts
gulp.task('ionic:build:before',['movermanifiest','compile','sass','comprimir-images','template'], function() {
    console.log("compilado");
});


gulp.task('movermanifiest',[],function(){
      gulp.src('./src/*.json')
      .pipe(gulp.dest('./www'));
});

// unifica los javascripts
gulp.task('js-build', function() {
  gulp.src(paths.html)
    .pipe(concatreplace({
      prefix:"listadecontactos",
        base:"./www/",
        output:{
            js:"./www/js"
        }
    }))
    .pipe(gulp.dest('www/'));

 

});

gulp.task('compile',['js-build','fonts'], function() {

    gulp.src(paths.html)
    .pipe(htmlreplace({
        'js': 'js/index_listadecontactos_1.js'
    }))
    .pipe(gulp.dest('www/'));

});

gulp.task('fonts', function() {

    gulp.src(paths.fonts[0]+'.{eot,svg,ttf,woff}')
    
    .pipe(gulp.dest('www/fonts'));

});

//Tarea para Comprimir Imagenes
gulp.task('comprimir-images', function(){  
        gulp.src(paths.images[0]+'.{png,jpg,jpeg,gif,svg}') 
        .pipe(
            imagemin({
              plugins:[imageminPngcrush()] 
            }))
        .pipe(gulp.dest('./www/img'));
});

/// vigila cambios
gulp.task('ionic:watch:before', ['movermanifiest','sass','compile','comprimir-images','template'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['compile']);
  gulp.watch(paths.html, ['compile']);
  gulp.watch(paths.images, ['comprimir-imagenes']);
  gulp.watch(paths.tmplates, ['template']);
});

