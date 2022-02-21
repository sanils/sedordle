/* eslint-disable no-console */
const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

const buildDir = './build';

const esBuildOpts = {
  entryPoints: ['./src/index.jsx'],
  outfile: `${buildDir}/main.js`,
  bundle: true,
  logLevel: 'info',
  platform: 'browser',
  loader: {
    '.jpg': 'file',
    '.png': 'file',
  },
  plugins: [sassPlugin()],
};

console.log('esbuild running...');

if (process.argv.includes('watch')) {
  esbuild.build({
    ...esBuildOpts,
    sourcemap: true,
    watch: {
      onRebuild(error, result) {
        if (error) console.error('[watch] build failed:', error);
        else {
          const out = { errors: result.errors, warnings: result.warnings };
          console.log('[watch] build succeeded:', out);
        }
      },
    },
  });
} else {
  esbuild.build({
    ...esBuildOpts,
    minify: true,
  });
}
