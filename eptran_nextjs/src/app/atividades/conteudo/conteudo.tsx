interface ConteudoProps {
  title: string;
  text: string;
  link: string; // Prop para o link do material
}

const ConteudoCard: React.FC<ConteudoProps> = ({ title, text, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-80 border rounded-xl hover:shadow-lg transition-shadow duration-200" // Adicione efeitos de hover, se desejar
    >
      <div className="bg-[url('/Image/mat1.svg')] bg-cover w-full h-96 rounded-t-xl"></div>
      <div className="bg-[#023859] h-36 rounded-b-xl">
        <h3 className="text-white font-semibold pl-2 p-4 rounded-b-xl">{title}</h3>
        <p className="text-neutral-200 font-semibold text-xs pl-2 pt-1 rounded-b-xl">
          {text}
        </p>
      </div>
    </a>
  );
};

export default ConteudoCard;