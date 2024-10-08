export default function Suporte() {
  return (
    <main className="w-screen h-screen pl-72 pt-36">
      <h1 className="flex text-darkBlue-500 font-bold justify-start text-3xl pl-10 pt-10">
        Ticket de USUARIO
      </h1>
      <hr className="bg-darkBlue-500 w-auto my-4 border-1 border-darkBlue-500 rounded-full ml-10 mr-28" />

      <div className="px-10 grid grid-cols-2 pt-10 gap-28">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold">DETALHES</h2>
          <hr className="bg-darkBlue-400 w-auto my-2 border-1 border-darkBlue-500 rounded-full mr-20" />
          <br />
          <h3 className="font-semibold text-darkBlue-500 text-md ">Nome</h3>
          <form action="">
            <input
              type="text"
              value="Henrique Ataide"
              className="text-gray-400 h-10 w-full mt-2  "
            />
          </form>
          <h3 className="pt-10 font-semibold text-darkBlue-500 text-md ">
            Email
          </h3>
          <div className="w-auto mr-20">
            <form action="">
              <input
                type="email"
                value="Henrique45Ataide@gmail.com"
                className="text-gray-400 h-10 w-full mt-2 "
              />
            </form>
          </div>
          <h3 className="font-semibold text-darkBlue-500 text-md pt-10">
            ASSUNTO
          </h3>
          <div className="w-auto mr-20">
            <form action="">
              <input
                type="text"
                className="text-gray-400 h-10 w-full mt-2"
                value="Estou com problema ao entrar no jogo"
                id="Assunto"
                disabled
              />
            </form>
          </div>
          <h3 className="pt-10 font-semibold text-darkBlue-500 text-md">
            DESCRIÇÃO
          </h3>
          <div className="w-auto mr-64">
            <form action="">
              <input
                className="text-gray-400 h-10 w-full mt-2 "
                name="descricao"
                id="Descricao"
                value="Não consigo acessar o jogo por algum motivo"
                disabled
              />
            </form>
          </div>
          <h3 className="mt-5 font-semibold text-darkBlue-500 text-md">
            ANEXOS
          </h3>
          <div className="mt-2 w-auto mr-64">
            <form action="">
              <input type="image" name="" id="" value="imagem" />
              <input type="image" name="" id="" value="imagem" />
            </form>
          </div>
          <table className="justify-center align-middle">
            <thead>
              <tr>
                <th>
                  <h3 className="col-span-1 mt-5 font-semibold text-darkBlue-500 text-md">
                    CRIAÇÃO DO TITCKET
                  </h3>
                </th>
                <th>
                  <h3 className="col-span-1 mt-5 font-semibold text-darkBlue-500 text-md -ml-16">
                    STATUS
                  </h3>
                </th>
                <th>
                  <h3 className="col-span-1 mt-5 font-semibold text-darkBlue-500 text-md">
                    PRIORIDADE
                  </h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="gap-x-12">
                <td>
                  <form action="">
                    <input type="date" name="data" id="data" />
                  </form>
                </td>
                <td>
                  <form action="">
                    <input
                      type="text"
                      name="status"
                      id="status"
                      value="Em Andamento"
                      className="text-black font-semibold pl-20"
                    />
                  </form>
                </td>
                <td>
                  <form action="">
                    <select name="" id="" className="font-semibold">
                      <option value="alta">Alta</option>
                      <option value="media">Média</option>
                      <option value="baixa">Baixa</option>
                    </select>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-semibold">RESPOSTA</h2>
          <hr className="bg-darkBlue-400 w-auto my-2 border-1 border-darkBlue-500 rounded-full mr-20" />
          <br />
          <h3 className=" font-semibold text-darkBlue-500 text-md">
            RESPOSTA AO TICKET
          </h3>
          <div className="w-80">
            <form action="">
              <textarea
                className="border-2 border-darkBlue-300 rounded-md mt-2 resize-none pl-3 pt-3"
                name="descricao"
                id="Descricao"
                rows={6}
                cols={84}
                placeholder="Insira sua resposta"
              ></textarea>
            </form>
          </div>
          <div className="mt-6 flex justify-end mr-20 gap-9">
            <form action="">
              <input
                type="button"
                className="bg-white border-darkBlue-500 border-2 rounded-md px-10 h-12 text-darkBlue-500 font-bold hover:bg-gray-200"
                value="CANCELAR"
              />
            </form>
            <form action="">
              <input
                type="button"
                className="bg-darkBlue-500 border-darkBlue-500 border-2 rounded-md px-14 h-12 text-white font-bold hover:bg-slate-400"
                value="ENVIAR"
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
