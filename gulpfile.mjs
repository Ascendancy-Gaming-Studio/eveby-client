import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import prettier from 'gulp-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Caminho para o arquivo de configuração do TypeScript. (Path Resolve não funcional no Windows 11 com gulp modular)
 * @link https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tsProject = ts.createProject(__dirname + '/tsconfig.json');

/**
 * Tarefa para formatar os arquivos via prettier.
 * @link https://www.npmjs.com/package/gulp-prettier
 */
gulp.task('format', () => {
  return gulp.src(['src/**/*.ts'])
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest('src'));
});

/**
 * Tarefa para compilar os arquivos via TypeScript.
 * @link https://www.npmjs.com/package/gulp-typescript
 */
gulp.task('scripts', () => {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

/**
 * Tarefa para monitorar os arquivos e recompilar automaticamente.
 * @link https://www.npmjs.com/package/gulp
 */
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', gulp.series('scripts'));
});

/**
 * Tarefa para inicializar o servidor.
 * @link https://www.npmjs.com/package/gulp-nodemon
 */
gulp.task(
  'serve',
  gulp.series('scripts', () => {
    nodemon({
      script: 'dist/index.js',
      watch: 'dist',
      ext: 'js',
    });
  }),
);

gulp.task('default', gulp.series('format', gulp.parallel('watch', 'serve')));
