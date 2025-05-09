export interface TextSectionProps {
  content: string;
}

export default function TextSection({ content }: TextSectionProps) {
  return (
    <section className="text-section py-8">
      <div className="container mx-auto">
        <p>{content}</p>
      </div>
    </section>
  );
} 