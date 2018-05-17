/* eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('lint-tests', function(){
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['src/jasmine/spec/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('copy-html', function(done){
  gulp.src('src/index.html')
      .pipe(gulp.dest('./dist'));
  done();
});

gulp.task('copy-docs', function(done){
  gulp.src('src/*.md')
      .pipe(gulp.dest('./dist'));
  done();
});

gulp.task('copy-spec', function(done){
  gulp.src('src/jasmine/spec/*.js')
      .pipe(gulp.dest('./dist/jasmine/spec'));
  done();
});

gulp.task('styles', function(done){
  gulp.src('src/sass/**/*.scss')
      .pipe(sass({
          outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
  done();
});

gulp.task('scripts', function(done){
  gulp.src('src/js/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('./dist/js'));
  done();
});

gulp.task('scripts-dist', function(done){
  gulp.src('src/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/js'));
  done();
});

gulp.task('dist', gulp.series('copy-html', 'copy-docs', 'copy-spec', 'styles', 'lint-tests', 'scripts-dist'));

gulp.task('default', gulp.series('copy-html', 'copy-docs', 'copy-spec', 'styles', 'lint-tests', function(done){
    // The way to abort a process in the console is Ctrl+C.
    // This is useful when you want to end the watching.
    gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
    gulp.watch('src/jasmine/spec/*.js', gulp.series('copy-spec'));
    gulp.watch('src/index.html', gulp.series('copy-html'));
    gulp.watch('src/*.md', gulp.series('copy-docs'));
    gulp.watch('./dist/index.html').on('change', browserSync.reload);
    gulp.watch('./dist/jasmine/spec/*.js').on('change', browserSync.reload);


    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    done();
}));
