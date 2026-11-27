const JIRA_KEY_SUFFIX = /\(HM-\d+\)$/;

export default {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "jira-key-in-header": ({ header }) => [
          JIRA_KEY_SUFFIX.test(header ?? ""),
          "Le titre du commit doit se terminer par la clé du ticket Jira, par exemple : (HM-12)",
        ],
      },
    },
  ],
  rules: {
    "header-max-length": [2, "always", 100],
    "jira-key-in-header": [2, "always"],
  },
};