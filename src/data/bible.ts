export interface BibleBook {
  name: string;
  abbrev: string;
  chapters: number;
  testament: 'AT' | 'NT';
}

export const bibleBooks: BibleBook[] = [
  { name: "Gênesis", abbrev: "Gn", chapters: 50, testament: "AT" },
  { name: "Êxodo", abbrev: "Ex", chapters: 40, testament: "AT" },
  { name: "Levítico", abbrev: "Lv", chapters: 27, testament: "AT" },
  { name: "Números", abbrev: "Nm", chapters: 36, testament: "AT" },
  { name: "Deuteronômio", abbrev: "Dt", chapters: 34, testament: "AT" },
  { name: "Josué", abbrev: "Js", chapters: 24, testament: "AT" },
  { name: "Juízes", abbrev: "Jz", chapters: 21, testament: "AT" },
  { name: "Rute", abbrev: "Rt", chapters: 4, testament: "AT" },
  { name: "1 Samuel", abbrev: "1Sm", chapters: 31, testament: "AT" },
  { name: "2 Samuel", abbrev: "2Sm", chapters: 24, testament: "AT" },
  { name: "1 Reis", abbrev: "1Rs", chapters: 22, testament: "AT" },
  { name: "2 Reis", abbrev: "2Rs", chapters: 25, testament: "AT" },
  { name: "1 Crônicas", abbrev: "1Cr", chapters: 29, testament: "AT" },
  { name: "2 Crônicas", abbrev: "2Cr", chapters: 36, testament: "AT" },
  { name: "Esdras", abbrev: "Ed", chapters: 10, testament: "AT" },
  { name: "Neemias", abbrev: "Ne", chapters: 13, testament: "AT" },
  { name: "Tobias", abbrev: "Tb", chapters: 14, testament: "AT" },
  { name: "Judite", abbrev: "Jdt", chapters: 16, testament: "AT" },
  { name: "Ester", abbrev: "Et", chapters: 10, testament: "AT" },
  { name: "1 Macabeus", abbrev: "1Mc", chapters: 16, testament: "AT" },
  { name: "2 Macabeus", abbrev: "2Mc", chapters: 15, testament: "AT" },
  { name: "Jó", abbrev: "Jó", chapters: 42, testament: "AT" },
  { name: "Salmos", abbrev: "Sl", chapters: 150, testament: "AT" },
  { name: "Provérbios", abbrev: "Pr", chapters: 31, testament: "AT" },
  { name: "Eclesiastes", abbrev: "Ecl", chapters: 12, testament: "AT" },
  { name: "Cântico dos Cânticos", abbrev: "Ct", chapters: 8, testament: "AT" },
  { name: "Sabedoria", abbrev: "Sb", chapters: 19, testament: "AT" },
  { name: "Eclesiástico", abbrev: "Eclo", chapters: 51, testament: "AT" },
  { name: "Isaías", abbrev: "Is", chapters: 66, testament: "AT" },
  { name: "Jeremias", abbrev: "Jr", chapters: 52, testament: "AT" },
  { name: "Lamentações", abbrev: "Lm", chapters: 5, testament: "AT" },
  { name: "Baruc", abbrev: "Br", chapters: 6, testament: "AT" },
  { name: "Ezequiel", abbrev: "Ez", chapters: 48, testament: "AT" },
  { name: "Daniel", abbrev: "Dn", chapters: 14, testament: "AT" },
  { name: "Oseias", abbrev: "Os", chapters: 14, testament: "AT" },
  { name: "Joel", abbrev: "Jl", chapters: 4, testament: "AT" },
  { name: "Amós", abbrev: "Am", chapters: 9, testament: "AT" },
  { name: "Abdias", abbrev: "Ab", chapters: 1, testament: "AT" },
  { name: "Jonas", abbrev: "Jn", chapters: 4, testament: "AT" },
  { name: "Miqueias", abbrev: "Mq", chapters: 7, testament: "AT" },
  { name: "Naum", abbrev: "Na", chapters: 3, testament: "AT" },
  { name: "Habacuque", abbrev: "Hab", chapters: 3, testament: "AT" },
  { name: "Sofonias", abbrev: "Sf", chapters: 3, testament: "AT" },
  { name: "Ageu", abbrev: "Ag", chapters: 2, testament: "AT" },
  { name: "Zacarias", abbrev: "Zc", chapters: 14, testament: "AT" },
  { name: "Malaquias", abbrev: "Ml", chapters: 3, testament: "AT" },
  { name: "Mateus", abbrev: "Mt", chapters: 28, testament: "NT" },
  { name: "Marcos", abbrev: "Mc", chapters: 16, testament: "NT" },
  { name: "Lucas", abbrev: "Lc", chapters: 24, testament: "NT" },
  { name: "João", abbrev: "Jo", chapters: 21, testament: "NT" },
  { name: "Atos dos Apóstolos", abbrev: "At", chapters: 28, testament: "NT" },
  { name: "Romanos", abbrev: "Rm", chapters: 16, testament: "NT" },
  { name: "1 Coríntios", abbrev: "1Cor", chapters: 16, testament: "NT" },
  { name: "2 Coríntios", abbrev: "2Cor", chapters: 13, testament: "NT" },
  { name: "Gálatas", abbrev: "Gl", chapters: 6, testament: "NT" },
  { name: "Efésios", abbrev: "Ef", chapters: 6, testament: "NT" },
  { name: "Filipenses", abbrev: "Fl", chapters: 4, testament: "NT" },
  { name: "Colossenses", abbrev: "Cl", chapters: 4, testament: "NT" },
  { name: "1 Tessalonicenses", abbrev: "1Ts", chapters: 5, testament: "NT" },
  { name: "2 Tessalonicenses", abbrev: "2Ts", chapters: 3, testament: "NT" },
  { name: "1 Timóteo", abbrev: "1Tm", chapters: 6, testament: "NT" },
  { name: "2 Timóteo", abbrev: "2Tm", chapters: 4, testament: "NT" },
  { name: "Tito", abbrev: "Tt", chapters: 3, testament: "NT" },
  { name: "Filemon", abbrev: "Fm", chapters: 1, testament: "NT" },
  { name: "Hebreus", abbrev: "Hb", chapters: 13, testament: "NT" },
  { name: "Tiago", abbrev: "Tg", chapters: 5, testament: "NT" },
  { name: "1 Pedro", abbrev: "1Pd", chapters: 5, testament: "NT" },
  { name: "2 Pedro", abbrev: "2Pd", chapters: 3, testament: "NT" },
  { name: "1 João", abbrev: "1Jo", chapters: 5, testament: "NT" },
  { name: "2 João", abbrev: "2Jo", chapters: 1, testament: "NT" },
  { name: "3 João", abbrev: "3Jo", chapters: 1, testament: "NT" },
  { name: "Judas", abbrev: "Jd", chapters: 1, testament: "NT" },
  { name: "Apocalipse", abbrev: "Ap", chapters: 22, testament: "NT" },
];

// Bible API - using ABP (API Bíblia Portuguesa)
export const BIBLE_API_URL = "https://bible-api.com";

export interface BibleChapterContent {
  book: string;
  chapter: number;
  verses: { verse: number; text: string }[];
}

// Generate sample content for offline use
export function generateChapterContent(bookName: string, chapter: number): BibleChapterContent {
  const sampleVerses: Record<string, Record<number, { verse: number; text: string }[]>> = {
    "Gênesis": {
      1: [
        { verse: 1, text: "No princípio, Deus criou os céus e a terra." },
        { verse: 2, text: "A terra era sem forma e vazia; e havia trevas sobre a face do abismo, e o Espírito de Deus pairava sobre as águas." },
        { verse: 3, text: "Disse Deus: Haja luz. E houve luz." },
        { verse: 4, text: "Viu Deus que a luz era boa; e fez separação entre a luz e as trevas." },
        { verse: 5, text: "E Deus chamou à luz Dia, e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro." },
        { verse: 6, text: "E disse Deus: Haja um firmamento no meio das águas, e haja separação entre águas e águas." },
        { verse: 7, text: "Fez, pois, Deus o firmamento, e separou as águas que estavam debaixo do firmamento das que estavam por cima do firmamento. E assim foi." },
        { verse: 8, text: "E chamou Deus ao firmamento Céu. E foi a tarde e a manhã, o dia segundo." },
        { verse: 9, text: "E disse Deus: Ajuntem-se num só lugar as águas que estão debaixo do céu, e apareça o elemento seco. E assim foi." },
        { verse: 10, text: "Chamou Deus ao elemento seco Terra, e ao ajuntamento das águas Mares. E viu Deus que isso era bom." },
        { verse: 11, text: "E disse Deus: Produza a terra relva, ervas que dêem semente, e árvores frutíferas que dêem fruto segundo as suas espécies, cuja semente esteja nele, sobre a terra. E assim foi." },
        { verse: 12, text: "A terra, pois, produziu relva, ervas que davam semente segundo as suas espécies, e árvores que davam fruto, cuja semente estava nele, segundo as suas espécies. E viu Deus que isso era bom." },
        { verse: 13, text: "E foi a tarde e a manhã, o dia terceiro." },
        { verse: 14, text: "E disse Deus: Haja luminares no firmamento do céu, para fazerem separação entre o dia e a noite; sejam eles para sinais e para estações, e para dias e anos;" },
        { verse: 15, text: "e sirvam de luminares no firmamento do céu, para alumiar a terra. E assim foi." },
        { verse: 16, text: "Deus, pois, fez os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; fez também as estrelas." },
        { verse: 17, text: "E Deus os pôs no firmamento do céu para alumiar a terra," },
        { verse: 18, text: "para governar o dia e a noite, e para fazer separação entre a luz e as trevas. E viu Deus que isso era bom." },
        { verse: 19, text: "E foi a tarde e a manhã, o dia quarto." },
        { verse: 20, text: "E disse Deus: Produzam as águas cardumes de seres viventes; e voem as aves acima da terra, no firmamento do céu." },
        { verse: 21, text: "Criou, pois, Deus os grandes animais marinhos, e todos os seres viventes que se arrastam, os quais as águas produziram abundantemente segundo as suas espécies; e toda ave que voa, segundo a sua espécie. E viu Deus que isso era bom." },
        { verse: 22, text: "Então Deus os abençoou, dizendo: Frutificai e multiplicai-vos, e enchei as águas dos mares; e multipliquem-se as aves sobre a terra." },
        { verse: 23, text: "E foi a tarde e a manhã, o dia quinto." },
        { verse: 24, text: "E disse Deus: Produza a terra seres viventes segundo as suas espécies: animais domésticos, répteis, e animais selvagens segundo as suas espécies. E assim foi." },
        { verse: 25, text: "Deus, pois, fez os animais selvagens segundo as suas espécies, e os animais domésticos segundo as suas espécies, e todos os répteis da terra segundo as suas espécies. E viu Deus que isso era bom." },
        { verse: 26, text: "E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; domine ele sobre os peixes do mar, sobre as aves do céu, sobre os animais domésticos, e sobre toda a terra, e sobre todo réptil que se arrasta sobre a terra." },
        { verse: 27, text: "Criou, pois, Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou." },
        { verse: 28, text: "Então Deus os abençoou e lhes disse: Frutificai e multiplicai-vos; enchei a terra e sujeitai-a; dominai sobre os peixes do mar, sobre as aves do céu e sobre todos os animais que se arrastam sobre a terra." },
        { verse: 29, text: "Disse-lhes mais: Eis que vos tenho dado todas as ervas que produzem semente, as quais se acham sobre a face de toda a terra, bem como todas as árvores em que há fruto que dê semente; ser-vos-ão para mantimento." },
        { verse: 30, text: "E a todos os animais da terra, a todas as aves do céu e a todo ser vivente que se arrasta sobre a terra, tenho dado todas as ervas verdes como mantimento. E assim foi." },
        { verse: 31, text: "E viu Deus tudo quanto fizera, e eis que era muito bom. E foi a tarde e a manhã, o dia sexto." },
      ],
      2: [
        { verse: 1, text: "Assim foram acabados os céus e a terra, com todo o seu exército." },
        { verse: 2, text: "Ora, havendo Deus completado no dia sétimo a obra que tinha feito, descansou nesse dia de toda a obra que fizera." },
        { verse: 3, text: "Abençoou Deus o sétimo dia e o santificou; porque nele descansou de toda a sua obra que criara e fizera." },
        { verse: 4, text: "Estas são as origens dos céus e da terra, quando foram criados. No dia em que o Senhor Deus fez a terra e os céus," },
        { verse: 5, text: "não havia ainda nenhuma planta do campo na terra, pois nenhuma erva do campo tinha ainda brotado; porque o Senhor Deus não tinha feito chover sobre a terra, e não havia homem para lavrar a terra." },
        { verse: 6, text: "Um vapor, porém, subia da terra, e regava toda a face da terra." },
        { verse: 7, text: "E formou o Senhor Deus o homem do pó da terra, e soprou-lhe nas narinas o fôlego da vida; e o homem tornou-se alma vivente." },
        { verse: 8, text: "Então plantou o Senhor Deus um jardim, da banda do oriente, no Éden; e pôs ali o homem que tinha formado." },
        { verse: 9, text: "E o Senhor Deus fez brotar da terra toda sorte de árvores agradáveis à vista e boas para comida, bem como a árvore da vida no meio do jardim, e a árvore do conhecimento do bem e do mal." },
        { verse: 10, text: "E saía um rio do Éden para regar o jardim; e dali se dividia e se tornava em quatro braços." },
        { verse: 11, text: "O nome do primeiro é Pisom; este é o que rodeia toda a terra de Havilá, onde há ouro." },
        { verse: 12, text: "E o ouro dessa terra é bom; ali há o bdélio e a pedra de ônix." },
        { verse: 13, text: "O nome do segundo rio é Giom; este é o que rodeia toda a terra de Cuxe." },
        { verse: 14, text: "O nome do terceiro rio é Tigre; este é o que corre pelo oriente da Assíria. E o quarto rio é o Eufrates." },
        { verse: 15, text: "Tomou, pois, o Senhor Deus o homem, e o pôs no jardim do Éden para o lavrar e guardar." },
        { verse: 16, text: "Ordenou o Senhor Deus ao homem, dizendo: De toda árvore do jardim podes comer livremente;" },
        { verse: 17, text: "mas da árvore do conhecimento do bem e do mal, dessa não comerás; porque no dia em que dela comeres, certamente morrerás." },
        { verse: 18, text: "Disse mais o Senhor Deus: Não é bom que o homem esteja só; far-lhe-ei uma ajudadora que lhe seja idônea." },
        { verse: 19, text: "Da terra formou, pois, o Senhor Deus todos os animais do campo e todas as aves do céu, e os trouxe ao homem, para ver como lhes chamaria." },
        { verse: 20, text: "O homem pôs nomes a todos os animais domésticos, às aves do céu e a todos os animais do campo; mas para o homem não se achava ajudadora idônea." },
        { verse: 21, text: "Então o Senhor Deus fez cair um sono pesado sobre o homem, e este adormeceu; tomou-lhe, então, uma das costelas, e fechou a carne em seu lugar;" },
        { verse: 22, text: "e da costela que o Senhor Deus lhe tomara, formou a mulher e a trouxe ao homem." },
        { verse: 23, text: "Então disse o homem: Esta é agora osso dos meus ossos, e carne da minha carne; ela será chamada varoa, porquanto do varão foi tomada." },
        { verse: 24, text: "Portanto deixará o homem a seu pai e a sua mãe, e unir-se-á à sua mulher, e serão uma só carne." },
        { verse: 25, text: "E ambos estavam nus, o homem e sua mulher, e não se envergonhavam." },
      ],
      3: [
        { verse: 1, text: "Ora, a serpente era mais astuta que todos os animais do campo que o Senhor Deus tinha feito. E esta disse à mulher: É assim que Deus disse: Não comereis de toda a árvore do jardim?" },
        { verse: 2, text: "Respondeu a mulher à serpente: Do fruto das árvores do jardim podemos comer;" },
        { verse: 3, text: "mas do fruto da árvore que está no meio do jardim, disse Deus: Não comereis dele, nem nele tocareis, para que não morrais." },
        { verse: 4, text: "Disse a serpente à mulher: Certamente não morrereis." },
        { verse: 5, text: "Porque Deus sabe que no dia em que comerdes desse fruto, os vossos olhos se abrirão, e sereis como Deus, conhecendo o bem e o mal." },
        { verse: 6, text: "Então, vendo a mulher que aquela árvore era boa para se comer, e agradável aos olhos, e árvore desejável para dar entendimento, tomou do seu fruto, comeu, e deu também a seu marido, e ele também comeu." },
        { verse: 7, text: "Então foram abertos os olhos de ambos, e conheceram que estavam nus; pelo que coseram folhas de figueira, e fizeram para si aventais." },
        { verse: 8, text: "E ouviram a voz do Senhor Deus, que passeava no jardim à tardinha; e escondeu-se o homem e sua mulher da presença do Senhor Deus, entre as árvores do jardim." },
        { verse: 9, text: "Mas chamou o Senhor Deus ao homem, e perguntou-lhe: Onde estás?" },
        { verse: 10, text: "Respondeu-lhe o homem: Ouvi a tua voz no jardim e tive medo, porque estava nu; e escondi-me." },
        { verse: 11, text: "Deus perguntou-lhe: Quem te mostrou que estavas nu? Comeste da árvore de que te ordenei que não comesses?" },
        { verse: 12, text: "Ao que respondeu o homem: A mulher que me deste por companheira deu-me a árvore, e eu comi." },
        { verse: 13, text: "Perguntou o Senhor Deus à mulher: Que é isso que fizeste? Respondeu a mulher: A serpente me enganou, e eu comi." },
        { verse: 14, text: "Então o Senhor Deus disse à serpente: Porquanto fizeste isso, maldita serás mais que toda besta, e mais que todos os animais do campo." },
        { verse: 15, text: "Porei inimizade entre ti e a mulher, e entre a tua descendência e o seu descendente; este te ferirá a cabeça, e tu lhe ferirás o calcanhar." },
        { verse: 16, text: "E à mulher disse: Multiplicarei grandemente a dor da tua conceição; em dor darás à luz filhos; e o teu desejo será para o teu marido, e ele te dominará." },
        { verse: 17, text: "E ao homem disse: Porquanto deste ouvidos à voz de tua mulher, e comeste da árvore de que te ordenei dizendo: Não comerás dela; maldita é a terra por tua causa." },
        { verse: 18, text: "Ela te produzirá espinhos e cardos, e comerás das ervas do campo." },
        { verse: 19, text: "Do suor do teu rosto comerás o teu pão, até que tornes à terra, porque dela foste tomado; porquanto és pó, e ao pó tornarás." },
        { verse: 20, text: "Chamou o homem à sua mulher Eva, porque ela era a mãe de todos os viventes." },
        { verse: 21, text: "E o Senhor Deus fez para Adão e sua mulher túnicas de peles, e os vestiu." },
        { verse: 22, text: "Então disse o Senhor Deus: Eis que o homem se tornou como um de nós, conhecendo o bem e o mal. Ora, não suceda que estenda a sua mão, e tome também da árvore da vida, e coma e viva eternamente." },
        { verse: 23, text: "O Senhor Deus, pois, o lançou fora do jardim do Éden para lavrar a terra, de que fora tomado." },
        { verse: 24, text: "E havendo lançado fora o homem, pôs ao oriente do jardim do Éden querubins, e uma espada flamejante que se volvia por todos os lados, para guardar o caminho da árvore da vida." },
      ],
    },
    "João": {
      1: [
        { verse: 1, text: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." },
        { verse: 2, text: "Ele estava no princípio com Deus." },
        { verse: 3, text: "Todas as coisas foram feitas por intermédio dele, e sem ele nada do que foi feito se fez." },
        { verse: 4, text: "Nele estava a vida, e a vida era a luz dos homens." },
        { verse: 5, text: "A luz resplandece nas trevas, e as trevas não prevaleceram contra ela." },
        { verse: 6, text: "Houve um homem enviado de Deus, cujo nome era João." },
        { verse: 7, text: "Este veio como testemunha, a fim de dar testemunho da luz, para que todos cressem por meio dele." },
        { verse: 8, text: "Ele não era a luz, mas veio para dar testemunho da luz." },
        { verse: 9, text: "Ali estava a luz verdadeira, que alumia a todo homem que vem ao mundo." },
        { verse: 10, text: "Estava no mundo, e o mundo foi feito por intermédio dele, e o mundo não o conheceu." },
        { verse: 11, text: "Veio para o que era seu, e os seus não o receberam." },
        { verse: 12, text: "Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus: aos que crêem no seu nome." },
        { verse: 13, text: "Os quais não nasceram do sangue, nem da vontade da carne, nem da vontade do varão, mas de Deus." },
        { verse: 14, text: "E o Verbo se fez carne, e habitou entre nós, cheio de graça e de verdade; e vimos a sua glória, como a glória do unigênito do Pai." },
      ],
    },
    "Salmos": {
      23: [
        { verse: 1, text: "O Senhor é o meu pastor; nada me faltará." },
        { verse: 2, text: "Deitar-me faz em pastos verdejantes; guia-me mansamente a águas tranquilas." },
        { verse: 3, text: "Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome." },
        { verse: 4, text: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam." },
        { verse: 5, text: "Preparas uma mesa perante mim na presença dos meus inimigos; unges a minha cabeça com óleo; o meu cálice transborda." },
        { verse: 6, text: "Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias." },
      ],
      91: [
        { verse: 1, text: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará." },
        { verse: 2, text: "Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei." },
        { verse: 3, text: "Porque ele te livrará do laço do passarinheiro, e da peste perniciosa." },
        { verse: 4, text: "Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás; a sua verdade será o teu escudo e broquel." },
        { verse: 5, text: "Não terás medo do terror de noite, nem da seta que voa de dia," },
        { verse: 6, text: "nem da peste que anda na escuridão, nem da mortandade que assola ao meio-dia." },
        { verse: 7, text: "Mil cairão ao teu lado, e dez mil à tua direita, mas não chegará a ti." },
        { verse: 8, text: "Somente com os teus olhos contemplarás, e verás a recompensa dos ímpios." },
        { verse: 9, text: "Porque tu, ó Senhor, és o meu refúgio. No Altíssimo fizeste a tua habitação." },
        { verse: 10, text: "Nenhum mal te sucederá, nem praga alguma chegará à tua tenda." },
        { verse: 11, text: "Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos." },
        { verse: 12, text: "Eles te sustentarão nas suas mãos, para que não tropeces em alguma pedra." },
        { verse: 13, text: "Pisarás o leão e a áspide; calcarás aos pés o filho do leão e a serpente." },
        { verse: 14, text: "Porquanto tão encarecidamente me amou, eu o livrarei; pô-lo-ei num alto retiro, porque conheceu o meu nome." },
        { verse: 15, text: "Ele me invocará, e eu lhe responderei; estarei com ele na angústia; dele me rodeará de honra." },
        { verse: 16, text: "Fartá-lo-ei com longura de dias, e lhe mostrarei a minha salvação." },
      ],
      1: [
        { verse: 1, text: "Bem-aventurado o homem que não anda segundo o conselho dos ímpios, nem se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores." },
        { verse: 2, text: "Antes tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite." },
        { verse: 3, text: "Pois será como a árvore plantada junto a ribeiros de águas, a qual dá o seu fruto na estação própria, e cujas folhas não caem; e tudo quanto fizer prosperará." },
        { verse: 4, text: "Não são assim os ímpios; mas são como a moinha que o vento espalha." },
        { verse: 5, text: "Pelo que os ímpios não subsistirão no juízo, nem os pecadores na congregação dos justos." },
        { verse: 6, text: "Porque o Senhor conhece o caminho dos justos; porém o caminho dos ímpios perecerá." },
      ],
    },
    "Mateus": {
      5: [
        { verse: 1, text: "Jesus, vendo as multidões, subiu ao monte; e, tendo se assentado, aproximaram-se os seus discípulos." },
        { verse: 2, text: "E ele abriu a boca e os ensinava, dizendo:" },
        { verse: 3, text: "Bem-aventurados os pobres de espírito, porque deles é o reino dos céus." },
        { verse: 4, text: "Bem-aventurados os que choram, porque eles serão consolados." },
        { verse: 5, text: "Bem-aventurados os mansos, porque eles herdarão a terra." },
        { verse: 6, text: "Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos." },
        { verse: 7, text: "Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia." },
        { verse: 8, text: "Bem-aventurados os puros de coração, porque eles verão a Deus." },
        { verse: 9, text: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus." },
        { verse: 10, text: "Bem-aventurados os que são perseguidos por causa da justiça, porque deles é o reino dos céus." },
        { verse: 11, text: "Bem-aventurados sois vós, quando vos injuriarem e perseguirem e, mentindo, disserem todo mal contra vós por minha causa." },
        { verse: 12, text: "Alegrai-vos e exultai, porque é grande o vosso galardão nos céus." },
        { verse: 13, text: "Vós sois o sal da terra; e se o sal for insípido, com que se há de salgar?" },
        { verse: 14, text: "Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte." },
        { verse: 15, text: "Nem se acende a candeia e se coloca debaixo do alqueire, mas no velador, e dá luz a todos que estão na casa." },
        { verse: 16, text: "Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus." },
      ],
    },
  };

  const bookVerses = sampleVerses[bookName];
  if (bookVerses && bookVerses[chapter]) {
    return { book: bookName, chapter, verses: bookVerses[chapter] };
  }

  // Generate placeholder for chapters we don't have full content for
  const verseCount = Math.floor(Math.random() * 15) + 10;
  const verses = [];
  for (let i = 1; i <= verseCount; i++) {
    verses.push({
      verse: i,
      text: `[${bookName} ${chapter}:${i}] — Para ler o texto completo deste versículo, acesse uma Bíblia Católica oficial. Este é um espaço dedicado à meditação e oração.`
    });
  }
  return { book: bookName, chapter, verses };
}

export const biblicalStories = [
  {
    title: "A Criação do Mundo",
    book: "Gênesis 1-2",
    summary: "Deus criou os céus e a terra em seis dias e descansou no sétimo. Criou o homem à Sua imagem e semelhança, e lhe deu domínio sobre toda a criação.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
  },
  {
    title: "O Nascimento de Jesus",
    book: "Lucas 2:1-20",
    summary: "Maria deu à luz seu filho primogênito em Belém, envolveu-o em panos e deitou-o numa manjedoura. Anjos anunciaram aos pastores a boa nova do nascimento do Salvador.",
    image: "https://images.unsplash.com/photo-1545041462-1f2bed329e8f?w=600"
  },
  {
    title: "A Última Ceia",
    book: "Mateus 26:17-30",
    summary: "Jesus celebrou a Páscoa com seus discípulos, instituindo a Eucaristia: 'Isto é o meu corpo... Este é o meu sangue da aliança, derramado em favor de muitos.'",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
  },
  {
    title: "A Ressurreição",
    book: "Mateus 28:1-10",
    summary: "No primeiro dia da semana, as mulheres foram ao sepulcro e encontraram-no vazio. Um anjo lhes disse: 'Não está aqui, pois ressuscitou como havia dito.'",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600"
  },
  {
    title: "Moisés e o Mar Vermelho",
    book: "Êxodo 14",
    summary: "Deus abriu o Mar Vermelho para que o povo de Israel passasse a pé enxuto, libertando-os da escravidão do Egito numa demonstração de poder divino.",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600"
  },
  {
    title: "O Bom Samaritano",
    book: "Lucas 10:25-37",
    summary: "Jesus contou a parábola de um samaritano que, ao contrário de um sacerdote e um levita, socorreu um homem ferido à beira do caminho, ensinando sobre o amor ao próximo.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600"
  },
];
