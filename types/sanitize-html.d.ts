declare module "sanitize-html" {
  type SanitizeOptions = Record<string, unknown>;

  export default function sanitizeHtml(dirty: string, options?: SanitizeOptions): string;
}
