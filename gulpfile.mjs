import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint-new';
import prettier from 'gulp-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tsProject = ts.createProject('tsconfig.json');

// Tarefa para linting
// gulp.task('lint', () => {
//   return gulp.src(['src/**/*.ts'])
//     .pipe(eslint({ configFile: `${__dirname}/.eslintrc.json` }))
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// });

// Tarefa para formatação
gulp.task('format', () => {
  return gulp.src(['src/**/*.ts'])
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest('src'));
});

// Tarefa para compilar TypeScript
gulp.task('scripts', () => {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// Tarefa para monitorar mudanças nos arquivos e reiniciar o servidor
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', gulp.series('scripts'));
});

// Tarefa para iniciar o servidor com nodemon
gulp.task(
  'serve',
  gulp.series('scripts', () => {
    nodemon({
      script: 'dist/index.js',
      watch: 'dist',
      ext: 'js',
      env: { NODE_ENV: 'development' },
    });
  }),
);

gulp.task('default', gulp.series('format', gulp.parallel('watch', 'serve')));
