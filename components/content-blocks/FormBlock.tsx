// biome-disable

import type { FC } from 'react';

interface FormBlockProps {
  config: {
    provider?: 'hubspot' | 'mailchimp' | 'custom';
    portalId?: string;
    formId?: string;
    embedCode?: string;
    fields?: {
      name: string;
      type: string;
      label: string;
      placeholder: string;
      required: boolean;
    }[];
    submitButtonText?: string;
  };
  title?: string;
  description?: string;
}

const FormBlock: FC<FormBlockProps> = ({ config, title, description }) => {
  return (
    <section className="form-block py-8">
      <div className="container mx-auto text-center">
        {title && <h2 className="text-3xl font-bold mb-4 text-foreground">{title}</h2>}
        {description && (
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">{description}</p>
        )}
        {config.embedCode ? (
          <div
            className="form-embed max-w-md mx-auto"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Form embed code is trusted and sanitized by the CMS
            dangerouslySetInnerHTML={{ __html: config.embedCode }}
          />
        ) : (
          <div className="max-w-md mx-auto p-6 bg-neutral-50 rounded-xl">
            <p className="text-foreground/70">
              Form configuration pending. This will display the download form once configured.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormBlock;
