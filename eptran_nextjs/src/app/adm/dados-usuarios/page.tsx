"use client";

export default function DadosUsuarios() {
  return (
    <main className="w-full min-h-screen bg-white p-4 md:pl-64 md:pt-36 lg:mr-80">
      <h1 className="text-darkBlue-500 font-bold text-2xl md:text-3xl mb-4">
        Dados Pessoais de USUÁRIO
      </h1>
      <hr className="bg-darkBlue-500 mr-32 my-4 border-1 border-darkBlue-500 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-auto">
          <h2 className="text-xl font-semibold mb-4">DADOS PESSOAIS</h2>
          <hr className="bg-darkBlue-400 mr-32 my-4 border-1 border-darkBlue-500 rounded-full" />

          <form className="space-y-4">
            {[
              "NOME",
              "E-MAIL",
              "SENHA",
              "DATA DE NASCIMENTO",
              "SEXO",
              "CEP",
              "ESTADO",
              "CIDADE",
              "BAIRRO",
            ].map((label, index) => (
              <div key={index}>
                <h3 className="font-semibold text-darkBlue-400 mb-1">
                  {label}
                </h3>
                <div className="flex items-center">
                  {label === "SEXO" ? (
                    <select
                      className="w-full md:w-2/3 border-darkBlue-300 border rounded-md h-10 px-2"
                      id="sexo"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecione o seu Gênero
                      </option>
                      <option value="Feminino">Feminino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Prefiro não Informar">
                        Prefiro não Informar
                      </option>
                    </select>
                  ) : label === "DATA DE NASCIMENTO" ? (
                    <input
                      className="w-full md:w-2/3 border-darkBlue-300 border rounded-md h-10 px-2"
                      type="date"
                      id="data-nascimento"
                    />
                  ) : (
                    <input
                      className="w-full md:w-2/3 border-darkBlue-300 border rounded-md h-10 px-2"
                      type={label === "SENHA" ? "password" : "text"}
                      id={label.toLowerCase().replace(/ /g, "-")}
                    />
                  )}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="ml-2 flex-shrink-0"
                  >
                    <path
                      d="M2.25,12.9378906 L2.25,15.75 L5.06210943,15.75 L13.3559575,7.45615192 L10.5438481,4.64404249 L2.25,12.9378906 Z M15.5306555,5.28145396 C15.8231148,4.98899458 15.8231148,4.5165602 15.5306555,4.22410082 L13.7758992,2.46934454 C13.4834398,2.17688515 13.0110054,2.17688515 12.718546,2.46934454 L11.3462366,3.84165394 L14.1583461,6.65376337 L15.5306555,5.28145396 Z"
                      fill="#003966"
                    ></path>
                  </svg>
                </div>
              </div>
            ))}
          </form>
        </div>
        <div className="w-auto">
          <h2 className="text-xl font-semibold mb-4">FOTO</h2>
          <hr className="bg-darkBlue-400 mr-32 my-4 border-1 border-darkBlue-500 rounded-full" />

          <div className="bg-gray-100 w-full md:w-2/3 h-56 flex flex-col justify-center items-center text-darkBlue-500 font-semibold mb-8">
            <svg
              className="cursor-pointer w-32 h-32 md:w-40 md:h-40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                fill="#72A4E9"
              ></path>
              <path
                d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z"
                fill="#72A4E9"
              ></path>
              <path
                d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z"
                fill="#72A4E9"
              ></path>
            </svg>
            <p className="text-center mt-2">
              Adicione ou altere a foto de perfil aqui
            </p>
          </div>
          <div className="w-auto">
            <h2 className="text-xl font-semibold mb-4">ESCOLARIDADE</h2>
            <hr className="bg-darkBlue-400 mr-32 my-4 border-1 border-darkBlue-500 rounded-full" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-darkBlue-400 mb-1">ESCOLA</h3>
                <div className="flex items-center">
                  <input
                    id="escola"
                    className="w-full md:w-2/3 border-darkBlue-300 border rounded-md h-10 px-2"
                    type="text"
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="ml-2 flex-shrink-0"
                  >
                    <path
                      d="M2.25,12.9378906 L2.25,15.75 L5.06210943,15.75 L13.3559575,7.45615192 L10.5438481,4.64404249 L2.25,12.9378906 Z M15.5306555,5.28145396 C15.8231148,4.98899458 15.8231148,4.5165602 15.5306555,4.22410082 L13.7758992,2.46934454 C13.4834398,2.17688515 13.0110054,2.17688515 12.718546,2.46934454 L11.3462366,3.84165394 L14.1583461,6.65376337 L15.5306555,5.28145396 Z"
                      fill="#003966"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-darkBlue-400 mb-1">SÉRIE</h3>
                <div className="flex items-center">
                  <input
                    id="serie"
                    className="w-full md:w-2/3 border-darkBlue-300 border rounded-md h-10 px-2"
                    type="text"
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="ml-2 flex-shrink-0"
                  >
                    <path
                      d="M2.25,12.9378906 L2.25,15.75 L5.06210943,15.75 L13.3559575,7.45615192 L10.5438481,4.64404249 L2.25,12.9378906 Z M15.5306555,5.28145396 C15.8231148,4.98899458 15.8231148,4.5165602 15.5306555,4.22410082 L13.7758992,2.46934454 C13.4834398,2.17688515 13.0110054,2.17688515 12.718546,2.46934454 L11.3462366,3.84165394 L14.1583461,6.65376337 L15.5306555,5.28145396 Z"
                      fill="#003966"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
