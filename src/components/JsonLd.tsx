type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

function serializeJsonLd(
  data: Record<string, unknown> | Record<string, unknown>[]
) {
  return JSON.stringify(data)
    .replace(/</g, '\u003c')
    .replace(/>/g, '\u003e')
    .replace(/&/g, '\u0026');
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
