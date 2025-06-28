# 🧪 Guia de Testes - Integração Completa

## 📋 Checklist de Testes

### 1. Teste do Formulário Principal
- [ ] Acesse a página inicial do site
- [ ] Preencha o formulário com dados de teste:
  - Nome: João Silva
  - Telefone: (11) 99999-9999  
  - Email: teste@teste.com
- [ ] Clique em "Registrar"
- [ ] Verifique se aparece: "Cadastro realizado com sucesso!"
- [ ] Aguarde 1.8 segundos
- [ ] Confirme se abre nova aba do WhatsApp com a mensagem

### 2. Teste do Modal Exit Intent
- [ ] Acesse qualquer página do site
- [ ] Mova o mouse para fora da área do navegador (topo da tela)
- [ ] Verifique se o modal aparece
- [ ] Preencha o formulário do modal
- [ ] Teste o envio e redirecionamento para WhatsApp

### 3. Teste da Integração Make.com
- [ ] Abra o console do navegador (F12)
- [ ] Preencha e envie um formulário
- [ ] Verifique os logs: "Enviando dados para Make.com:"
- [ ] Confirme se aparece: "Resposta do Make.com:"
- [ ] Acesse sua planilha Google Sheets
- [ ] Verifique se os dados foram inseridos corretamente

### 4. Teste do Sistema de Fallback
**Para testar o fallback, temporariamente altere a URL do webhook:**

1. Edite `.env.local` e altere temporariamente:
```bash
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://url-inexistente-para-teste.com
```

2. Reinicie o servidor: `npm run dev`
3. Teste o formulário
4. Verifique nos logs:
   - "Make.com falhou, tentando Google Script..."
   - "Dados enviados com sucesso para Google Script (fallback)"
5. Restaure a URL correta e reinicie

### 5. Teste da Página de Administração
- [ ] Acesse `/admin` no seu site
- [ ] Verifique se a página carrega sem erros
- [ ] Teste adicionar um novo link:
  - Nome: "Teste Link"
  - URL: "https://wa.me/5511999999999"
  - Descrição: "Link de teste"
- [ ] Teste editar o link criado
- [ ] Teste ativar/desativar o link
- [ ] Teste excluir o link
- [ ] Teste exportar configurações (baixa arquivo JSON)

### 6. Teste de Notificações (Admin)
**Para testar notificações de erro:**

1. Configure email inválido temporariamente em `.env.local`
2. Force uma falha (use URL inválida no webhook)
3. Envie um formulário
4. Verifique se recebe email de notificação
5. Restaure configurações corretas

### 7. Teste de Dados Locais
- [ ] Abra o console do navegador (F12)
- [ ] Execute: `localStorage.getItem('failed_leads')`
- [ ] Force falhas nas integrações
- [ ] Verifique se dados são salvos localmente
- [ ] Execute novamente o comando para ver dados salvos

## 🔍 Logs para Monitorar

### Console do Navegador
```javascript
// Logs esperados em caso de sucesso:
"Enviando dados para Make.com: {NOME: 'João', ...}"
"Resposta do Make.com: {}"
"Redirecionando para WhatsApp: https://wa.me/..."

// Logs esperados em caso de fallback:
"Make.com falhou, tentando Google Script..."
"Enviando para Google Script (fallback): {NOME: 'João', ...}"
"Dados salvos localmente como fallback"
```

### Network Tab (F12 > Network)
- Requisição POST para Make.com webhook
- Status 200 (sucesso) ou erro
- Requisição POST para Google Script (se fallback)
- Requisição POST para `/api/notify-admin` (se erro)

## 📊 URLs de Teste

### Produção (Vercel)
- Site principal: `https://seu-site.vercel.app`
- Admin: `https://seu-site.vercel.app/admin`

### Local (Desenvolvimento)
- Site principal: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## 🛠️ Comandos Úteis

### Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Verificar tipos TypeScript
npx tsc --noEmit
```

### Debug no Vercel
- Acesse Vercel Dashboard
- Vá em "Functions" > "View Function Logs"
- Monitore logs das APIs `/api/lead` e `/api/notify-admin`

## 🔧 Resolução de Problemas

### Webhook Make.com não funciona
1. Verifique se a URL está correta em `.env.local`
2. Teste a URL manualmente com Postman ou similar
3. Confirme se o cenário está ativo no Make.com
4. Verifique logs do Make.com para erros

### Redirecionamento WhatsApp não funciona
1. Verifique se o número está correto em `.env.local`
2. Teste a URL diretamente no navegador
3. Confirme se pop-ups estão permitidos no navegador

### Emails de notificação não chegam
1. Verifique credenciais em `.env.local`
2. Use senha de app do Gmail (não senha normal)
3. Confirme se 2FA está ativado na conta Gmail

### Página Admin não carrega
1. Verifique se o arquivo `/app/admin/page.tsx` existe
2. Confirme se não há erros no console
3. Teste em modo incógnito

## ✅ Resultados Esperados

Após todos os testes, você deve ter:

1. **✅ Formulários funcionando** - Envio para Make.com + WhatsApp
2. **✅ Fallback ativo** - Google Script + dados locais + notificações
3. **✅ Admin funcional** - Gerenciamento de links de IA
4. **✅ Monitoramento** - Logs detalhados e alertas
5. **✅ Integração completa** - Dados fluindo para Google Sheets

---

**🎉 Se todos os testes passaram, sua integração está completa e funcionando perfeitamente!**
