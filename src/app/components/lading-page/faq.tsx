import { FAQItem } from "../faq/faq-item";

export function FAQ() {
  const faqItems = [
    {
      title: "O que é o nosso serviço?",
      description:
        "Nosso serviço oferece soluções personalizadas para gerenciar suas necessidades diárias com eficiência e simplicidade.",
    },
    {
      title: "Como posso criar uma conta?",
      description:
        "Você pode criar uma conta clicando no botão 'Registrar' na página inicial e preenchendo as informações solicitadas.",
    },
    {
      title: "Quais são os métodos de pagamento aceitos?",
      description:
        "Aceitamos pagamentos via cartão de crédito, débito e transferências bancárias. Em breve, adicionaremos outras opções como PIX.",
    },
    {
      title: "O suporte está disponível 24/7?",
      description:
        "Sim, nosso suporte ao cliente está disponível 24 horas por dia, 7 dias por semana, para ajudá-lo com qualquer dúvida ou problema.",
    },
    {
      title: "Como posso recuperar minha senha?",
      description:
        "Clique no link 'Esqueci minha senha' na página de login, insira seu e-mail e siga as instruções enviadas para redefinir sua senha.",
    },
    {
      title: "Posso cancelar minha assinatura a qualquer momento?",
      description:
        "Sim, você pode cancelar sua assinatura a qualquer momento acessando as configurações da sua conta.",
    },
  ];

  return (
    <div className="my-20 flex flex-col items-center gap-16">
      <h3 className="text-4xl text-white font-bold">Dúvidas frequentes</h3>

      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item) => (
            <FAQItem
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {faqItems.slice(faqItems.length / 2, faqItems.length).map((item) => (
            <FAQItem
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
