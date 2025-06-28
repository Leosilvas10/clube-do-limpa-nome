# 📝 GUIA COMPLETO: CONFIGURAR GOOGLE APPS SCRIPT

## 🎯 PASSO A PASSO COMPLETO

### 1. ACESSAR O GOOGLE APPS SCRIPT
1. Vá para: https://script.google.com
2. Faça login com sua conta Google
3. Clique em "Novo projeto"

### 2. COLAR O CÓDIGO
1. Apague todo o código que está no editor
2. Cole o código completo do arquivo `google-apps-script-code.js`
3. Salve o projeto (Ctrl+S)
4. Dê um nome ao projeto: "Clube Limpa Nome - Formulário"

### 3. CONFIGURAR A PLANILHA
1. **Abra sua planilha do Google Sheets:**
   https://docs.google.com/spreadsheets/d/1BQOstmp15usMlksWeTPEwB3boGV9YfhNoGMvduySDjs/edit

2. **Verifique o nome da aba:**
   - Se a aba se chama "Página1" ou "Sheet1", está OK
   - Se tem outro nome, anote para alterar no código

3. **Se necessário, altere o nome da aba no código:**
   ```javascript
   const SHEET_NAME = "Pagina1"; // Altere aqui se necessário
   ```

### 4. TESTAR O CÓDIGO
1. No Apps Script, clique em "Executar" (botão play)
2. Escolha a função `testar`
3. Autorize as permissões quando solicitado
4. Verifique se apareceu uma linha de teste na planilha

### 5. PUBLICAR COMO WEB APP
1. No Apps Script, clique em "Implantar" (botão azul no canto superior direito)
2. Escolha "Nova implantação"
3. **Configurações importantes:**
   - **Tipo:** Aplicativo da Web
   - **Executar como:** Eu (seu email)
   - **Quem tem acesso:** Qualquer pessoa
4. Clique em "Implantar"
5. **COPIE A URL** que aparece (é a URL do webhook)

### 6. ATUALIZAR A URL NO PROJETO
Substitua a URL atual no arquivo `.env.local`:

```bash
# Altere esta linha com a nova URL:
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=SUA_NOVA_URL_AQUI
```

### 7. VERIFICAR FUNCIONAMENTO

#### Teste 1: Função de Teste
```javascript
// No Apps Script, execute a função 'testar'
// Deve aparecer uma linha com dados de teste na planilha
```

#### Teste 2: Teste Real
1. Execute o projeto Next.js: `npm run dev`
2. Abra http://localhost:3000
3. Preencha qualquer formulário
4. Verifique se os dados aparecem na planilha

## 🔧 CÓDIGO PARA APPS SCRIPT

```javascript
/**
 * CÓDIGO COMPLETO - COLE TUDO NO APPS SCRIPT
 */

// Nome da planilha (aba)
const SHEET_NAME = "Pagina1"; // ← ALTERE SE NECESSÁRIO

function doPost(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, 5).setValues([
        ["NOME", "TELEFONE", "E-MAIL", "TIMESTAMP", "SOURCE"]
      ]);
    }
    
    var nome = "";
    var telefone = "";
    var email = "";
    var timestamp = new Date().toISOString();
    var source = "website";
    
    // Processa dados do POST
    if (e && e.parameter) {
      nome = e.parameter.NOME || "";
      telefone = e.parameter.TELEFONE || "";
      email = e.parameter["E-MAIL"] || e.parameter.EMAIL || "";
      timestamp = e.parameter.timestamp || timestamp;
      source = e.parameter.source || source;
    }
    
    if (!nome && e && e.postData) {
      try {
        var data = JSON.parse(e.postData.contents);
        nome = data.NOME || "";
        telefone = data.TELEFONE || "";
        email = data["E-MAIL"] || data.EMAIL || "";
        timestamp = data.timestamp || timestamp;
        source = data.source || source;
      } catch (jsonError) {
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
    
    if (nome && nome.length > 0) {
      var lastRow = sheet.getLastRow();
      var nextRow = lastRow + 1;
      
      sheet.getRange(nextRow, 1, 1, 5).setValues([[
        nome, telefone, email, timestamp, source
      ]]);
      
      return ContentService
        .createTextOutput(JSON.stringify({
          "result": "success",
          "row": nextRow
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({
          "result": "error",
          "error": "Nome é obrigatório"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        "result": "error",
        "error": error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    lock.releaseLock();
  }
}

// Função de teste
function testar() {
  var dadosTeste = {
    parameter: {
      NOME: "João Silva Teste",
      TELEFONE: "(11) 99999-9999",
      "E-MAIL": "joao.teste@email.com",
      timestamp: new Date().toISOString(),
      source: "teste_apps_script"
    }
  };
  
  var resultado = doPost(dadosTeste);
  console.log("Resultado:", resultado.getContent());
  return resultado.getContent();
}
```

## ⚠️ PONTOS IMPORTANTES

### ✅ CHECKLIST:
- [ ] Código colado no Apps Script
- [ ] Nome da aba correto no código
- [ ] Função `testar` executada com sucesso
- [ ] Web App publicado com acesso "Qualquer pessoa"
- [ ] URL atualizada no `.env.local`
- [ ] Teste real funcionando

### 🔧 SOLUÇÃO DE PROBLEMAS:

#### Se não aparecer dados na planilha:
1. **Verifique o nome da aba** - deve estar igual no código
2. **Execute a função `testar`** - deve criar uma linha de teste
3. **Verifique as permissões** - Web App deve estar público
4. **Olhe os logs** - Menu "Execuções" no Apps Script

#### Se der erro de permissão:
1. **Reautorize** - Execute qualquer função no Apps Script
2. **Aceite todas as permissões** - Google Sheets, Drive, etc.
3. **Republique o Web App** se necessário

#### Se a URL não funcionar:
1. **Copie a URL exata** da implantação
2. **Teste a URL** diretamente no navegador
3. **Verifique se termina com `/exec`**

## 🚀 APÓS CONFIGURAR:

1. **Teste completo:**
   - Execute `npm run dev` 
   - Acesse http://localhost:3000
   - Preencha qualquer formulário
   - Verifique dados na planilha

2. **Monitore os logs:**
   - Console do navegador
   - Logs do Apps Script

---

**💡 DICA:** Mantenha o Apps Script e a planilha abertos durante os testes para monitorar em tempo real!
