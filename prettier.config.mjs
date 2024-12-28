/** @typedef  {import("@trivago/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrder: [
    "^server-only$",
    "",
    "^react",
    "^next/*",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/db/(.*)$",
    "^@/data/(.*)$",
    "^@/lib/(.*)$",
    "^@/utils/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/hooks/(.*)$",
    "^@/features/(.*)$",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
};

export default config;
