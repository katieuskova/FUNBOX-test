const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const babel = require('gulp-babel');


function styles() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./build/css/'))
		.pipe(browserSync.stream());
}


function scripts() {
	return gulp.src('./src/js/**/*.js')
	    .pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify({
			toplevel: true,
		}))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}



function watch() {

	browserSync.init({
		server: {
			baseDir: "./"
		},
	});

	gulp.watch('./src/scss/**/*.scss', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./*.html', browserSync.reload);
}

function clean() {
	return del(['build/*'])
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('default', gulp.series(clean, gulp.parallel(styles, scripts), 'watch'))
