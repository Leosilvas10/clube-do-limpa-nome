# 🧪 GUIA DE TESTE DO VSL - CLUBE LIMPA NOME

## 🎯 COMO TESTAR O VSL AUTOMÁTICO

### ⚡ MÉTODO RÁPIDO (Console)
1. Abra o site: `http://localhost:3000`
2. Pressione `F12` (abrir console)
3. Na aba "Console", cole este código:
```javascript
localStorage.removeItem('vsl_completed');
location.reload();
```
4. ✅ **Resultado**: VSL abrirá automaticamente em 2 segundos

### 🕵️ MÉTODO ANÔNIMO
1. Abra nova aba anônima/privada (`Ctrl+Shift+N`)
2. Acesse: `http://localhost:3000`
3. ✅ **Resultado**: VSL abrirá automaticamente em 2 segundos

### 🔄 MÉTODO COMPLETO (Limpar Cache)
1. Pressione `F12`
2. Clique direito no botão "Recarregar"
3. Escolha "Esvaziamento rígido e recarga"
4. ✅ **Resultado**: VSL abrirá automaticamente em 2 segundos

## ⏱️ CRONOMETRAGEM ESPERADA
- **0s**: Página carrega
- **2s**: VSL modal abre automaticamente
- **Durante**: Botão de som sempre acessível
- **Final**: Usuário pode prosseguir

## 🎬 FLUXO COMPLETO DO VSL
1. **Página carrega** → Contador de 2 segundos inicia
2. **2 segundos** → VSL modal abre automaticamente
3. **Vídeo inicia** → Muted por padrão (exigência dos navegadores)
4. **Usuário ativa som** → Clica no botão azul superior direito
5. **Assiste vídeo** → Controles bloqueados, deve assistir até o fim
6. **Vídeo termina** → Botão "Continuar para Oferta" aparece
7. **Usuário continua** → Modal fecha, rola para seção de formulário

## 🔍 VERIFICAÇÕES IMPORTANTES
- [ ] VSL abre em 2 segundos exatos?
- [ ] Botão de som está visível e funcional?
- [ ] Vídeo está sendo reproduzido?
- [ ] Controles estão realmente bloqueados?
- [ ] Pixels do Facebook estão disparando?
- [ ] Modal fecha ao terminar vídeo?
