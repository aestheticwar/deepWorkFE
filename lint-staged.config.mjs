export default {
  '*.{js,jsx,mjs,cjs,ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{json,jsonc,md,mdx,yml,yaml,css,scss,less,html}': 'prettier --write',
};
