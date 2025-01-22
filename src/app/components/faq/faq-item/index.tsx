interface FAQItemProps {
  title: string;
  description: string;
}
export function FAQItem({ title, description }: FAQItemProps) {
  return (
    <div className="w-[351px] h-min flex flex-col gap-3 p-5 rounded-2xl border border-border-primary bg-background-primary">
      <p className="font-bold text-white">{title}</p>

      <p className="text-content-body">{description}</p>
    </div>
  );
}
