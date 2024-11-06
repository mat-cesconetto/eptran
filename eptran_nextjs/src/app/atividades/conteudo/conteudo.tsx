interface ConteudoProps {
  title: string;
  text: string;
}

const ConteudoCard: React.FC<ConteudoProps> = ({ title, text }) => {
  return (
      <div className="w-80 border rounded-xl">
          <div className="bg-gray-200 w-80 h-96 rounded-t-xl"></div>
          <div className="bg-white h-24 rounded-b-xl">
              <h3 className="text-darkBlue-500 font-semibold pl-2">
                  {title}
              </h3>
              <p className="text-darkBlue-300 font-semibold text-xs pl-2 pt-1">
                  {text}
              </p>
          </div>
      </div>
  );
};

export default ConteudoCard;
