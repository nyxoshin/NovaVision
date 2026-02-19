export const BUILTIN_MODELS = [
  { id: "cat", label: "CAT" },
  { id: "monitor", label: "Monitor" },
  { id: "table", label: "Table" },
  { id: "tower", label: "Tower" },
  { id: "nastya", label: "Nastya" },
] as const;

export const DEFAULT_MODEL_ID = "cat";

const BUILTIN_MODEL_ID_SET = new Set(BUILTIN_MODELS.map((model) => model.id));

export function isBuiltInModelId(value: string | null | undefined): value is (typeof BUILTIN_MODELS)[number]["id"] {
  if (!value) {
    return false;
  }
  return BUILTIN_MODEL_ID_SET.has(value);
}

export function resolveModelId(value: string | null | undefined): (typeof BUILTIN_MODELS)[number]["id"] {
  return isBuiltInModelId(value) ? value : DEFAULT_MODEL_ID;
}
