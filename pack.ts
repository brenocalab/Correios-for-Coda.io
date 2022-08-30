
import * as coda from "@codahq/packs-sdk";
export const pack = coda.newPack();
const frete = require('frete');
const Frete = coda.makeObjectSchema({
  properties: {
    Codigo: { type: coda.ValueType.Number },
    Valor: { type: coda.ValueType.Number },
    ValorMaoPropria: { type: coda.ValueType.Number },
    ValorAvisoRecebimento: { type: coda.ValueType.Number },
    ValorValorDeclarado: { type: coda.ValueType.Number },    
    Erro: { type: coda.ValueType.Number },
    MsgErro: { type: coda.ValueType.String },
    ValorSemAdicionais: { type: coda.ValueType.Number },
  },  
  displayProperty: "Valor", // Which property above to display by default.  
});

// This tells Coda which domain the pack make requests to. Any fetcher
// requests to other domains won't be allowed.
pack.addNetworkDomain("correios.com.br");


// This line adds a new formula to this Pack.
pack.addFormula({
  name: "ValorFrete",  
  description: "Retorna o valor do frete pelo Correios.",
    parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "Comprimento",
      description: "Comprimento da embalagem",      
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "Largura",
      description: "Largura da embalagem",      
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "Altura",
      description: "Altura da embalagem",    
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "Peso",
      description: "Peso da embalagem",      
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "ValorDeclarado",
      description: "Valor declarado para seguro",      
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "CepRemetente",
      description: "Cep do Remetente",      
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "CepDestinatario",
      description: "Cep do destinatário",      
    }),     
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "Servico",
      description: "Código do Serviço",      
    }),       
  ], 

 resultType: coda.ValueType.Object,
  schema: Frete,
 
  // This function is declared async to that is can wait for the fetcher to
  // complete. The context parameter provides access to the fetcher.
  execute: async function ([Comprimento,Largura,Altura,Peso,ValorDeclarado,CepRemetente,CepDestinatario,Servico], context) {

    let dados = frete()
    dados.CepRemetente = CepRemetente 
    dados.CepDestinatario = CepDestinatario
    dados.formato = 1
    dados.maoPropria = "N"
    dados.avisoRecebimento =  "N"
    dados.peso = Peso
    dados.comprimento = Comprimento
    dados.Altura = Altura
    dados.Largura = Largura
    dados.ValorDeclarado= ValorDeclarado
    dados.Servico = Servico
    
    return  {
    Codigo: frete.Codigo,  
    Valor:  frete.preco,
    ValorMaoPropria: frete.ValorMaoPropria,
    ValorAvisoRecebimento: frete.ValorAvisoRecebimento,
    ValorValorDeclarado: frete.ValorDeclarado,    
    Erro: frete.Erro,
    MsgErro: frete.MsgErro,
    ValorSemAdicionais: frete.ValorSemAdicionais
  } ;
  },
});

