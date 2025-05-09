export interface FormSectionProps {
  // Define form embed props as needed, e.g. formId or embedSnippet
  formEmbed?: React.ReactNode;
}

export default function FormSection({ formEmbed }: FormSectionProps) {
  return (
    <section className="form-section py-8">
      <div className="container mx-auto">
        {formEmbed ?? <div id="resource-form-placeholder">Form embed placeholder</div>}
      </div>
    </section>
  );
} 