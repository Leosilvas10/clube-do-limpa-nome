/**
 * CÓDIGO PARA GOOGLE APPS SCRIPT
 * Cole este código completo no Apps Script do Google
 * 
 * 1. Acesse: https://script.google.com
 * 2. Crie novo projeto ou abra o existente
 * 3. Cole todo este código
 * 4. Salve o projeto
 * 5. Publique como Web App
 */

// Nome da planilha (aba) - ajustado para SUA planilha específica
const SHEET_NAME = "LP - Clube"; // Vejo na imagem que é esta aba

// FUNÇÃO DE DEBUG - adicione esta linha para ver logs
console.log = function(...args) { Logger.log(args.join(' ')); };

/**
 * Função principal que recebe os dados via POST
 */
function doPost(e) {
  // Cria lock para evitar conflitos de escrita
  var lock = LockService.getPublicLock();
  lock.waitLock(30000); // Aguarda até 30 segundos
  
  try {
    // Abre a planilha atual
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    
    // Tenta pegar a aba pelo nome, senão pega a primeira aba
    var sheet = doc.getSheetByName(SHEET_NAME);
    if (!sheet) {
      // Se não encontrar a aba pelo nome, usa a primeira aba disponível
      sheet = doc.getSheets()[0];
      console.log("Usando a primeira aba disponível:", sheet.getName());
    }
    
    // Verifica se tem cabeçalhos, se não tiver, adiciona
    var headers = sheet.getRange(1, 1, 1, 5).getValues()[0];
    if (!headers[0] || headers[0] !== "NOME") {
      // Se não tem cabeçalhos ou estão errados, adiciona na primeira linha vazia
      var lastRow = sheet.getLastRow();
      var headerRow = lastRow + 1;
      
      sheet.getRange(headerRow, 1, 1, 5).setValues([
        ["NOME", "TELEFONE", "E-MAIL", "TIMESTAMP", "SOURCE"]
      ]);
      
      // Formata os cabeçalhos
      sheet.getRange(headerRow, 1, 1, 5).setFontWeight("bold");
      sheet.getRange(headerRow, 1, 1, 5).setBackground("#4285f4");
      sheet.getRange(headerRow, 1, 1, 5).setFontColor("white");
    }
    
    // Pega os dados do formulário
    var nome = "";
    var telefone = "";
    var email = "";
    var timestamp = new Date().toISOString();
    var source = "website";
    
    // Verifica se os dados vieram via parâmetros POST
    if (e && e.parameter) {
      nome = e.parameter.NOME || "";
      telefone = e.parameter.TELEFONE || "";
      email = e.parameter["E-MAIL"] || e.parameter.EMAIL || "";
      timestamp = e.parameter.timestamp || timestamp;
      source = e.parameter.source || source;
    }
    
    // Se não vieram via parameter, tenta via postData
    if (!nome && e && e.postData) {
      try {
        var data = JSON.parse(e.postData.contents);
        nome = data.NOME || "";
        telefone = data.TELEFONE || "";
        email = data["E-MAIL"] || data.EMAIL || "";
        timestamp = data.timestamp || timestamp;
        source = data.source || source;
      } catch (jsonError) {
        // Se não conseguir fazer parse do JSON, tenta como form data
        var formData = e.postData.contents;
        var params = formData.split('&');
        var parsedData = {};
        
        params.forEach(function(param) {
          var pair = param.split('=');
          if (pair.length === 2) {
            parsedData[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
        });
        
        nome = parsedData.NOME || "";
        telefone = parsedData.TELEFONE || "";
        email = parsedData["E-MAIL"] || parsedData.EMAIL || "";
        timestamp = parsedData.timestamp || timestamp;
        source = parsedData.source || source;
      }
    }
    
    // Log dos dados recebidos (para debug)
    console.log("Dados recebidos:", {
      nome: nome,
      telefone: telefone,
      email: email,
      timestamp: timestamp,
      source: source
    });
    
    // Verifica se pelo menos o nome foi informado
    if (nome && nome.length > 0) {
      // Encontra a próxima linha vazia
      var lastRow = sheet.getLastRow();
      var nextRow = lastRow + 1;
      
      // Insere os dados na planilha
      sheet.getRange(nextRow, 1, 1, 5).setValues([[
        nome,
        telefone,
        email,
        timestamp,
        source
      ]]);
      
      console.log("Dados inseridos na linha:", nextRow);
      
      // Retorna sucesso
      return ContentService
        .createTextOutput(JSON.stringify({
          "result": "success",
          "row": nextRow,
          "data": {
            nome: nome,
            telefone: telefone,
            email: email
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else {
      // Retorna erro se não houver nome
      return ContentService
        .createTextOutput(JSON.stringify({
          "result": "error",
          "error": "Nome é obrigatório"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error("Erro ao processar:", error);
    
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({
        "result": "error",
        "error": error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    // Libera o lock
    lock.releaseLock();
  }
}

/**
 * Função de teste para verificar se está funcionando
 */
function testar() {
  // Dados de teste
  var dadosTeste = {
    parameter: {
      NOME: "João Silva Teste",
      TELEFONE: "(11) 99999-9999",
      "E-MAIL": "joao.teste@email.com",
      timestamp: new Date().toISOString(),
      source: "teste_apps_script"
    }
  };
  
  // Executa a função doPost com dados de teste
  var resultado = doPost(dadosTeste);
  
  console.log("Resultado do teste:", resultado.getContent());
  
  return resultado.getContent();
}

/**
 * Função para limpar dados de teste (opcional)
 */
function limparDadosTeste() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName(SHEET_NAME);
  
  if (sheet) {
    var data = sheet.getDataRange().getValues();
    
    for (var i = data.length - 1; i >= 1; i--) {
      if (data[i][0] && data[i][0].toString().includes("Teste")) {
        sheet.deleteRow(i + 1);
      }
    }
    
    console.log("Dados de teste removidos");
  }
}

/**
 * Função para configurar cabeçalhos (se necessário)
 */
function configurarCabecalhos() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = doc.insertSheet(SHEET_NAME);
  }
  
  // Define cabeçalhos
  sheet.getRange(1, 1, 1, 5).setValues([
    ["NOME", "TELEFONE", "E-MAIL", "TIMESTAMP", "SOURCE"]
  ]);
  
  // Formata cabeçalhos
  sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
  sheet.getRange(1, 1, 1, 5).setBackground("#4285f4");
  sheet.getRange(1, 1, 1, 5).setFontColor("white");
  
  console.log("Cabeçalhos configurados");
}
