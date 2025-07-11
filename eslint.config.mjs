// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    rules: {
      // This is needed to disable the deprecated slot attribute warning
      "vue/no-deprecated-slot-attribute": "off",
    },
  },
);
