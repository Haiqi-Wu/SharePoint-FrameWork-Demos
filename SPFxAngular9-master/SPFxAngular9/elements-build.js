const concat = require('concat');

(async function build() {  
  const files =  [
      './dist/SPFxAngular9/runtime-es5.js',
      './dist/SPFxAngular9/runtime-es2015.js',
      './dist/SPFxAngular9/polyfills-es5.js',
      './dist/SPFxAngular9/polyfills-es2015.js',
      './dist/SPFxAngular9/main-es5.js',
      './dist/SPFxAngular9/main-es2015.js'
    ];
  

  await concat(files, './dist/SPFxAngular9/bundle.js');
})();
