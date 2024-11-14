import { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface CustomCheckboxProps {
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isForLogin?: boolean;
}

const CustomCheckbox = ({
  label,
  onChange,
  className,
  isForLogin = false,
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  const handleAccept = () => {
    setIsChecked(true);
    onClose();
  };

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="appearance-none w-5 h-5 border-2 border-[#003966] rounded-md cursor-pointer peer"
        />
        <div
          className={`absolute top-0 left-0 w-5 h-5 flex rounded-md items-center justify-center pointer-events-none ${
            isChecked ? "bg-[#003966] border-[#003966]" : "border-[#003966]"
          }`}
        >
          <svg
            className={`w-3 h-3 ${isChecked ? "text-white" : "hidden"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      {isForLogin ? (
        <span className="text-[#003966] text-sm md:text-base">{label}</span>
      ) : (
        <span className="text-[#003966] text-sm md:text-base">
          Concordo com os
          <a
            onClick={onOpen}
            className="text-[#003966] ml-1 underline cursor-pointer"
          >
            termos de serviço
          </a>
        </span>
      )}

      {!isForLogin && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          scrollBehavior="inside"
          size="2xl"
          placement="center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Termos de Serviço
                </ModalHeader>
                <ModalBody>
                  APLICATIVO PARA EDUCAÇÃO DO TRÂNSITO - EPTRAN ESCOLA SESI DE
                  REFERÊNCIA Termos de uso e política de privacidade
                  Joinville/SC 06/11/2024 Atualizado e revisado por Graziella
                  Zavatini e Maria Gasparin Sumário INTRODUÇÃO 3 1. OBJETIVO 3
                  2. QUAIS INFORMAÇÕES ESTÃO PRESENTES NESTE DOCUMENTO? 3 3.
                  ACEITAÇÃO DO TERMO DE USO E DA POLÍTICA DE PRIVACIDADE 3 4.
                  DESCRIÇÃO DO SERVIÇO 4 5. AGENTES DE TRATAMENTO 5 6. QUEM É O
                  RESPONSÁVEL POR ATUAR COMO CANAL DE COMUNICAÇÃO ENTRE O
                  CONTROLADOR, OS TITULARES DOS DADOS E A AUTORIDADE NACIONAL DE
                  PROTEÇÃO DE DADOS (ENCARREGADO)? 5 7. QUAIS SÃO AS LEIS E
                  NORMATIVAS APLICÁVEIS A ESSE SERVIÇO? 5 8. QUAIS SÃO OS
                  DIREITOS DO USUÁRIO DO SERVIÇO? 6 9. QUAIS SÃO AS OBRIGAÇÕES
                  DOS USUÁRIOS QUE UTILIZAM O SERVIÇO? 7 10. QUAIS SÃO AS
                  RESPONSABILIDADES DOS ÓRGÃOS DE TRÂNSITO COM OS DADOS
                  PESSOAIS? 9 11. QUAL O CONTATO PELO QUAL O USUÁRIO DO SERVIÇO
                  PODE TIRAR SUAS DÚVIDAS? 9 12. POLÍTICA DE PRIVACIDADE 9 13.
                  COMO OS DADOS SÃO COLETADOS? 11 14. PARA QUE FIM UTILIZAMOS
                  ESSES DADOS PESSOAIS? 11 15. QUAIS OS TRATAMENTOS REALIZADOS
                  COM OS DADOS PESSOAIS? 11 16. QUAIS SÃO AS BASES LEGAIS QUE
                  FUNDAMENTAM O TRATAMENTO DOS DADOS PESSOAIS? 11 17. SÃO
                  TRATADOS DADOS PESSOAIS DE CRIANÇAS E ADOLESCENTES? PARA QUAIS
                  FINALIDADES? 12 18. SEGURANÇA NO TRATAMENTO DOS DADOS
                  PESSOAIS: O SITE DO EPTRAN, OS SISTEMAS RELACIONADOS E O
                  APLICATIVO DE JOGO UTILIZAM COOKIES? 12 19. ESTE TERMO DE USO
                  E POLÍTICA DE PRIVACIDADE PODE SER ALTERADO? 13 20. QUAL O
                  FORO APLICÁVEL CASO O USUÁRIO QUEIRA REALIZAR ALGUMA
                  RECLAMAÇÃO? 13 INTRODUÇÃO Este documento estabelece os Termos
                  de Uso e a Política de Privacidade aplicáveis ao uso do site
                  Eptran, sistemas relacionados e do aplicativo desenvolvido
                  pela Prefeitura Municipal de Joinville, com o objetivo de
                  fornecer transparência sobre como os dados dos usuários são
                  tratados e protegidos. Ao acessar e utilizar os serviços
                  disponibilizados por meio do Eptran, o usuário concorda com os
                  termos aqui descritos, comprometendo-se a seguir as regras
                  estabelecidas. OBJETIVO O objetivo deste documento é
                  estabelecer os Termos de Uso e a Política de Privacidade
                  aplicáveis ao uso do site Eptran, seus sistemas relacionados e
                  o aplicativo desenvolvido pela Prefeitura Municipal de
                  Joinville. O intuito é fornecer transparência sobre as
                  práticas de tratamento e proteção de dados pessoais dos
                  usuários, garantindo que estes compreendam como seus dados são
                  coletados, processados, compartilhados e protegidos. Ao
                  acessar e utilizar os serviços, o usuário concorda com as
                  regras e condições estabelecidas, visando o cumprimento das
                  disposições da Lei Geral de Proteção de Dados Pessoais (LGPD)
                  e outras legislações pertinentes. QUAIS INFORMAÇÕES ESTÃO
                  PRESENTES NESTE DOCUMENTO? Neste Termo de Uso, o usuário do
                  site do Eptran encontrará informações sobre: o funcionamento
                  do aplicativo e as regras aplicáveis a ele. Além disso, na
                  Política de Privacidade, o usuário do site do que utilizar o
                  Site Eptran, bem como os sistemas relacionados e do jogos
                  relacionados encontrará informações sobre: qual o tratamento
                  dos dados pessoais realizado, de forma automatizada ou não, e
                  a sua finalidade; os dados pessoais dos usuários necessários
                  para a prestação do serviço; a forma como os dados são
                  coletados; se há o compartilhamento de dados com terceiros; e
                  quais as medidas de segurança implementadas para proteger os
                  dados. ACEITAÇÃO DO TERMO DE USO E DA POLÍTICA DE PRIVACIDADE
                  Ao utilizar os serviços, o usuário confirma que leu e
                  compreendeu o Termo e a Política aplicáveis ao site do Eptran
                  e aos sistemas relacionados e concorda em ficar vinculado a
                  eles. 3.1 DEFINIÇÕES Para melhor compreensão deste documento,
                  neste Termo de Uso e Política de Privacidade, consideram-se:
                  Dado pessoal: informação relacionada a pessoa natural
                  identificada ou identificável. Tratamento: toda operação
                  realizada com dados pessoais, como as que se referem a coleta,
                  produção, recepção, classificação, utilização, acesso,
                  reprodução, transmissão, distribuição, processamento,
                  arquivamento, armazenamento, eliminação, avaliação ou controle
                  da informação, modificação, comunicação, transferência,
                  difusão ou extração. Sites e aplicativos: portais e sistemas
                  em ambiente WEB do Município e/ou de Entes Conveniados ao
                  Município de Joinville, por meio dos quais o usuário acessa os
                  serviços e conteúdos disponibilizados pelo Município de
                  Joinville ou por Entes Conveniados. Terceiro: pessoa ou
                  entidade que não participa diretamente em um contrato, ato
                  jurídico ou negócio, ou que, para além das partes envolvidas,
                  pode ter interesse em um processo jurídico. Usuário(s): todas
                  as pessoas naturais que utilizarem o serviço de site Eptran
                  Terminal Pessoal: computadores, notebooks, smartphones,
                  tablets e dispositivos similares utilizados para acessar os
                  sistemas e aplicativos do Eptran. DESCRIÇÃO DO SERVIÇO A
                  seguir estão descritas as regras aplicáveis à utilização do
                  site do projeto Eptran, de sistemas relacionados e do
                  aplicativo desenvolvido pela turma da Unidade de Tecnologia de
                  Informação da Secretaria de Administração e Planejamento, de
                  acordo com a Lei nº 13.709, de 14 de agosto de 2018 – Lei
                  Geral de Proteção de Dados Pessoais (LGPD), bem como o Decreto
                  nº 44.844, de 25 de novembro de 2021, que regulamenta a
                  aplicação da Lei Federal no âmbito da Administração Direta de
                  Joinville. AGENTES DE TRATAMENTO A quem compete as decisões
                  referentes ao tratamento de dados pessoais realizado no site
                  do Eptran, em sistemas relacionados​ e no aplicativo? A Lei
                  Geral de Proteção de Dados define como controlador, em seu
                  artigo 5º: “Art. 5º, VI – controlador: pessoa natural ou
                  jurídica, de direito público ou privado, a quem competem as
                  decisões referentes ao tratamento de dados pessoais;”. Para o
                  projeto do Eptran, todas as decisões referentes ao tratamento
                  de dados pessoais são de responsabilidade dos órgãos
                  municipais, incluindo o DETRAN e o EPTRAN, vinculados à
                  Prefeitura Municipal de Joinville, que encontra-se localizada
                  na Avenida Hermann August Lepper, nº 10, Saguaçu, CEP
                  89221-005, Joinville/SC. Telefone: (47) 3431-3233. QUEM É O
                  RESPONSÁVEL POR ATUAR COMO CANAL DE COMUNICAÇÃO ENTRE O
                  CONTROLADOR, OS TITULARES DOS DADOS E A AUTORIDADE NACIONAL DE
                  PROTEÇÃO DE DADOS (ENCARREGADO)? A Lei Geral de Proteção de
                  Dados define como Encarregado, em seu artigo 5º, VIII, pessoa
                  indicada pelo controlador e operador para atuar como canal de
                  comunicação entre o controlador, os titulares dos dados e a
                  Autoridade Nacional de Proteção de Dados. No âmbito do Eptran,
                  sua direção é responsável pelos: Titular: Melissa Portes QUAIS
                  SÃO AS LEIS E NORMATIVAS APLICÁVEIS A ESSE SERVIÇO? Lei nº
                  12.965, de 23 de abril de 2014 – Marco Civil da Internet:
                  estabelece princípios, garantias, direitos e deveres para o
                  uso da Internet no Brasil; Lei nº 12.527, de 18 de novembro de
                  2011 – Lei de Acesso à Informação: regula o acesso a
                  informações previsto na Constituição Federal; Lei nº 13.460,
                  de 26 de junho de 2017: dispõe sobre participação, proteção e
                  defesa dos direitos do usuário dos serviços públicos da
                  administração pública; Lei nº 13.709, de 14 de agosto de 2018:
                  dispõe sobre o tratamento de dados pessoais, inclusive nos
                  meios digitais, por pessoa natural ou por pessoa jurídica de
                  direito público ou privado, com o objetivo de proteger os
                  direitos fundamentais de liberdade e de privacidade e o livre
                  desenvolvimento da personalidade da pessoa natural; Decreto nº
                  7.724, de 16 de maio de 2012: regulamenta a Lei nº
                  12.527/2011, que dispõe sobre o acesso a informações previsto
                  na Constituição; Lei nº 12.737, de 30 de novembro de 2012:
                  dispõe sobre a tipificação criminal de delitos informáticos;
                  altera o Decreto-Lei nº 2.848, de 7 de dezembro de 1940 –
                  Código Penal; e dá outras providências; Decreto nº 44.844, de
                  25 de novembro de 2021: regulamenta a aplicação da Lei nº
                  13.709/2018 no âmbito da Administração Municipal de Joinville.
                  QUAIS SÃO OS DIREITOS DO USUÁRIO DO SERVIÇO? O usuário do
                  serviço possui os seguintes direitos, conferidos pela Lei
                  Geral de Proteção de Dados Pessoais: Direito de confirmação e
                  acesso (Art. 18, I e II): é o direito do usuário de obter do
                  serviço a confirmação de que os dados pessoais que lhe digam
                  respeito são ou não objeto de tratamento e, se for esse o
                  caso, o direito de acessar os seus dados pessoais; Direito de
                  retificação (Art. 18, III): é o direito de solicitar a
                  correção de dados incompletos, inexatos ou desatualizados;
                  Direito à limitação do tratamento dos dados (Art. 18, IV): é o
                  direito do usuário de limitar o tratamento de seus dados
                  pessoais, podendo exigir a eliminação de dados desnecessários,
                  excessivos ou tratados em desconformidade com o disposto na
                  Lei Geral de Proteção de Dados; Direito de oposição (Art. 18,
                  § 2º): é o direito do usuário de, a qualquer momento, se opor
                  ao tratamento de dados por motivos relacionados com a sua
                  situação particular, com fundamento em uma das hipóteses de
                  dispensa de consentimento ou em caso de descumprimento ao
                  disposto na Lei Geral de Proteção de Dados; Direito de
                  portabilidade dos dados (Art. 18, V): é o direito do usuário
                  de realizar a portabilidade dos dados a outro fornecedor de
                  serviço ou produto, mediante requisição expressa, de acordo
                  com a regulamentação da autoridade nacional, observados os
                  segredos comercial e industrial; Direito de não ser submetido
                  a decisões automatizadas (Art. 20, LGPD): o titular dos dados
                  tem direito a solicitar a revisão de decisões tomadas
                  unicamente com base em tratamento automatizado de dados
                  pessoais que afetem seus interesses, incluídas as decisões
                  destinadas a definir o seu perfil pessoal, profissional, de
                  consumo e de crédito ou os aspectos de sua personalidade.
                  QUAIS SÃO AS OBRIGAÇÕES DOS USUÁRIOS QUE UTILIZAM O SERVIÇO? O
                  usuário se responsabiliza pela precisão e veracidade dos dados
                  informados e reconhece que a inconsistência destes poderá
                  implicar a impossibilidade de se utilizar o site, bem como as
                  ferramentas disponibilizadas e os sistemas relacionados ao
                  aplicativo do Eptran. Durante a utilização do serviço, a fim
                  de resguardar e proteger os direitos de terceiros, o usuário
                  se compromete a fornecer somente seus dados pessoais, e não os
                  de terceiros. O login e a senha só poderão ser utilizados pelo
                  usuário cadastrado. Ele se compromete em manter o sigilo da
                  senha, que é pessoal e intransferível, não sendo possível, em
                  qualquer hipótese, a alegação de uso indevido após o ato de
                  compartilhamento. O usuário do serviço é responsável pela
                  atualização das suas informações pessoais e pelas
                  consequências por omissão ou erros nas informações pessoais
                  cadastradas. O usuário é responsável pela reparação de todos e
                  quaisquer danos, diretos ou indiretos (inclusive decorrentes
                  de violação de quaisquer direitos de outros usuários, de
                  terceiros e inclusive direitos de propriedade intelectual, de
                  sigilo e de personalidade), que sejam causados aos órgãos
                  envolvidos e a qualquer outro usuário, ou, ainda, a qualquer
                  terceiro, inclusive em virtude do descumprimento do disposto
                  neste Termo de Uso e Política de Privacidade ou de qualquer
                  ato praticado a partir de seu acesso ao serviço. O EPTRAN não
                  poderá ser responsabilizado pelos seguintes fatos: Equipamento
                  infectado ou invadido por atacantes; Equipamento avariado no
                  momento do consumo de serviços; Proteção do computador;
                  Proteção das informações baseadas nos computadores dos
                  usuários; Abuso de uso dos computadores dos usuários;
                  Monitoração clandestina do computador dos usuários;
                  Vulnerabilidades ou instabilidades existentes nos sistemas dos
                  usuários; Em nenhuma hipótese, a Prefeitura de Joinville e os
                  órgãos de trânsito DETRAN E EPTRAN serão responsabilizados
                  pela instalação no equipamento do usuário ou de terceiros de
                  códigos maliciosos (vírus, trojans, malware, worm, bot,
                  backdoor, spyware, rootkit ou quaisquer outros que venham a
                  ser criados), em decorrência da navegação na Internet pelo
                  usuário. QUAIS SÃO AS RESPONSABILIDADES DOS ÓRGÃOS DE TRÂNSITO
                  COM OS DADOS PESSOAIS? A Prefeitura de Joinville, bem como os
                  órgãos de trânsito DETRAN E EPTRAN se comprometem a cumprir
                  todas as legislações inerentes ao uso correto dos dados
                  pessoais do cidadão, de forma a preservar a privacidade dos
                  dados utilizados no serviço, bem como a garantir todos os
                  direitos e todas as garantias legais dos titulares dos dados.
                  Ela também se obriga a proteger e usar com viés consultivo os
                  dados do usuário vinculados à nome, zoneamento, documentos
                  como CPF e RG, escolaridade, responsáveis legais, telefone e
                  e-mail ou quaisquer informações de interesse geral
                  custodiadas. QUAL O CONTATO O USUÁRIO DO SERVIÇO PODE TIRAR
                  SUAS DÚVIDAS? Caso o usuário tenha alguma dúvida sobre este
                  Termo de Uso, ele poderá entrar em contato com a Ouvidoria do
                  Município, via site (Registrar manifestação à Ouvidoria) ou
                  suporte para atendimento disponibilizado via site do EPTRAN.
                  POLÍTICA DE PRIVACIDADE Esta Política de Privacidade foi
                  elaborada em conformidade com a Lei nº 12.965/2014 (Marco
                  Civil da Internet) e com a Lei nº 13.709/2018 (Lei de Proteção
                  de Dados Pessoais). Esta Política de Privacidade poderá ser
                  atualizada em decorrência de eventual atualização normativa,
                  razão pela qual se convida o usuário a consultar
                  periodicamente esta seção. O site do EPTRAN, bem como os jogos
                  homologados se comprometem a cumprir as normas previstas na
                  Lei Geral de Proteção de Dados (LGPD) e respeitar os
                  princípios dispostos no seu Art. 6º: “I – finalidade:
                  realização do tratamento para propósitos legítimos,
                  específicos, explícitos e informados ao titular, sem
                  possibilidade de tratamento posterior de forma incompatível
                  com essas finalidades; II – adequação: compatibilidade do
                  tratamento com as finalidades informadas ao titular, de acordo
                  com o contexto do tratamento; III – necessidade: limitação do
                  tratamento ao mínimo necessário para a realização de suas
                  finalidades, com abrangência dos dados pertinentes,
                  proporcionais e não excessivos em relação às finalidades do
                  tratamento de dados; IV – livre acesso: garantia, aos
                  titulares, de consulta facilitada e gratuita sobre a forma e a
                  duração do tratamento, bem como sobre a integralidade de seus
                  dados pessoais; V – qualidade dos dados: garantia, aos
                  titulares, de exatidão, clareza, relevância e atualização dos
                  dados, de acordo com a necessidade e para o cumprimento da
                  finalidade de seu tratamento; VI – transparência: garantia,
                  aos titulares, de informações claras, precisas e facilmente
                  acessíveis sobre a realização do tratamento e os respectivos
                  agentes de tratamento, observados os segredos comercial e
                  industrial; VII – segurança: utilização de medidas técnicas e
                  administrativas aptas a proteger os dados pessoais de acessos
                  não autorizados e de situações acidentais ou ilícitas de
                  destruição, perda, alteração, comunicação ou difusão; VIII –
                  prevenção: adoção de medidas para prevenir a ocorrência de
                  danos em virtude do tratamento de dados pessoais; IX – não
                  discriminação: impossibilidade de realização do tratamento
                  para fins discriminatórios ilícitos ou abusivos; X –
                  responsabilização e prestação de contas: demonstração, pelo
                  agente, da adoção de medidas eficazes e capazes de comprovar a
                  observância e o cumprimento das normas de proteção de dados
                  pessoais e, inclusive, da eficácia dessas medidas” (Lei
                  Federal n.º 13.709/2018). COMO OS DADOS SÃO COLETADOS? Os
                  dados pessoais são informados pelo usuário em seu
                  cadastramento e uso do sistema, ou automaticamente, pela
                  utilização de cookies ou tecnologia similar. PARA QUE FIM
                  UTILIZAMOS ESSES DADOS PESSOAIS? Os dados pessoais acima
                  dispostos são necessários e utilizados para a identificação
                  dos usuários dentro do serviço. Desta forma, o usuário possui
                  acesso ao rol de serviços disponibilizados eletronicamente
                  pelo EPTRAN. QUAIS OS TRATAMENTOS REALIZADOS COM OS DADOS
                  PESSOAIS? Os tipos de tratamentos predominantes no site e nos
                  jogos disponibilizados via site são: Acesso: ato de ingressar,
                  transitar, conhecer ou consultar a informação, bem como
                  possibilidade de usar os ativos de informação de um órgão ou
                  entidade, observada eventual restrição que se aplique; Coleta:
                  recolhimento de dados com finalidade específica;
                  Processamento: utilização, classificação, reprodução,
                  controle, avaliação, modificação e extração; Retenção:
                  armazenamento e arquivamento. QUAIS SÃO AS BASES LEGAIS QUE
                  FUNDAMENTAM O TRATAMENTO DOS DADOS PESSOAIS? As bases legais
                  predominantes são cumprimento de obrigação legal ou
                  regulatória pelo controlador, conforme Art. 7º, II e Art. 11º,
                  II, a; execução de políticas públicas, conforme Art. 7º, III e
                  Art. 11º, II, b; e exercício regular de direitos em processo
                  judicial, administrativo ou arbitral, conforme Art. 7º, VI e
                  Art. 11º, II, d (Lei Geral de Proteção de Dados Pessoais). SÃO
                  TRATADOS DADOS PESSOAIS DE CRIANÇAS E ADOLESCENTES? PARA QUAIS
                  FINALIDADES? Sim, são tratados dados de crianças e
                  adolescentes para efetivar matrícula vinculado ao EPTRAN,
                  sendo que os formulários são preenchidos pelos pais ou pelo
                  responsável legal, bem como para efetivar matrículas
                  escolares. SEGURANÇA NO TRATAMENTO DOS DADOS PESSOAIS: O SITE
                  DO EPTRAN, OS SISTEMAS RELACIONADOS E O APLICATIVO DE JOGO
                  UTILIZAM COOKIES? Cookies são pequenos arquivos de texto
                  enviados pelo site ao computador do usuário e que nele ficam
                  armazenados, com informações relacionadas à navegação no
                  mesmo. Por meio dos cookies, pequenas quantidades de
                  informação são armazenadas pelo navegador do usuário para que
                  nosso servidor possa lê-las posteriormente. Podem ser
                  armazenados, por exemplo, dados sobre o dispositivo utilizado
                  pelo usuário, bem como seu local e horário de acesso ao site.
                  É importante ressaltar que nem todo cookie contém dados
                  pessoais do usuário, já que determinados tipos de cookies
                  podem ser utilizados somente para que o serviço funcione
                  corretamente. As informações eventualmente armazenadas em
                  cookies também são consideradas dados pessoais e todas as
                  regras previstas nesta Política de Privacidade também são
                  aplicáveis a eles. ESTE TERMO DE USO E POLÍTICA DE PRIVACIDADE
                  PODE SER ALTERADO? A presente versão deste Termo de Uso e
                  Política de Privacidade foi atualizada pela última vez em
                  08/11/2024. Qualquer alteração e/ou atualização deste Termo de
                  Uso e Política de Privacidade passará a vigorar a partir da
                  data de sua publicação no site do serviço e deverá ser
                  integralmente observada pelos usuários. QUAL O FORO APLICÁVEL
                  CASO O USUÁRIO QUEIRA REALIZAR ALGUMA RECLAMAÇÃO? Este Termo
                  será regido pela legislação brasileira. Qualquer reclamação ou
                  controvérsia com base neste Termo será dirimida exclusivamente
                  pela comarca do Município de Joinville, Santa Catarina. Sem
                  prejuízo de qualquer outra via de recurso administrativo ou
                  judicial, todos os titulares de dados têm direito a apresentar
                  reclamação à Autoridade Nacional de Proteção de Dados.
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" onPress={handleAccept}>
                    Aceitar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default CustomCheckbox;
