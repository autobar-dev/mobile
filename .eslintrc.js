module.exports = {
  rules: {
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"],
    "indent": ["error", 2, { "MemberExpression": 1 }],
  },
};
