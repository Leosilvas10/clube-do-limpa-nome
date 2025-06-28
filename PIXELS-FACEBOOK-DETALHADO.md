# 📊 PIXELS DO FACEBOOK - GUIA COMPLETO PARA O CLIENTE

## 🎯 VISÃO GERAL DOS PIXELS

O sistema possui **4 pixels estratégicos** que rastreiam toda a jornada do usuário no VSL (Video Sales Letter). Cada pixel é disparado em momentos específicos para otimizar as campanhas do Facebook.

---

## 📈 PIXEL 1: VIEWCONTENT (Início do VSL)

### **Quando dispara:**
- ✅ **Momento**: Assim que o VSL modal abre (2 segundos após carregar a página)
- ✅ **Ação**: Usuário vê o vídeo iniciar

### **Código do pixel:**
```javascript
fbq("track", "ViewContent", {
  content_name: "VSL - Clube Limpa Nome",
  content_category: "Video"
});
```

### **Para que serve:**
- 📊 **Otimização**: Criar público de pessoas interessadas em vídeos
- 🎯 **Remarketing**: Reatingir quem viu o vídeo mas não converteu
- 💰 **Bid**: Ensinar algoritmo sobre engajamento de vídeo

### **Valor para campanhas:**
- Cria audiência de "visualizadores de vídeo"
- Base para lookalike de pessoas engajadas
- Otimiza entrega para pessoas que assistem vídeos

---

## 🚀 PIXEL 2: INITIATECHECKOUT (Engajamento Inicial)

### **Quando dispara:**
- ✅ **Momento**: Junto com ViewContent (início do VSL)
- ✅ **Ação**: Usuário demonstrou interesse inicial

### **Código do pixel:**
```javascript
fbq("track", "InitiateCheckout", {
  content_name: "VSL Started"
});
```

### **Para que serve:**
- 🎯 **Intenção**: Marca pessoas com intenção de compra
- 📊 **Funil**: Primeira etapa do funil de conversão
- 💡 **Otimização**: Ensina Facebook sobre pessoas que iniciam processo

### **Valor para campanhas:**
- Público de alta intenção para remarketing
- Otimização para "início de checkout"
- Base para campanhas de conversão

---

## 🎬 PIXEL 3: ADDTOCART (50% do Vídeo)

### **Quando dispara:**
- ✅ **Momento**: Quando usuário assiste 50% do vídeo
- ✅ **Ação**: Demonstra engajamento significativo

### **Código do pixel:**
```javascript
fbq("track", "AddToCart", {
  content_name: "VSL 50% Watched",
  value: 50,
  currency: "BRL"
});
```

### **Para que serve:**
- 🎯 **Qualificação**: Filtra pessoas realmente interessadas
- 💰 **Valor**: Atribui valor monetário ao engajamento
- 📊 **Otimização**: Busca pessoas que assistem vídeos completos

### **Valor para campanhas:**
- **Público premium**: Pessoas que se engajam com conteúdo
- **Lookalike qualificado**: Baseado em quem assiste 50%+
- **Otimização de bid**: Para engajamento de qualidade

---

## 🏆 PIXEL 4: LEAD (Vídeo Completo)

### **Quando dispara:**
- ✅ **Momento**: Quando vídeo termina completamente
- ✅ **Ação**: Usuário assistiu 100% do VSL

### **Código do pixel:**
```javascript
fbq("track", "Lead", {
  content_name: "VSL Completed"
});
```

### **Para que serve:**
- 🎯 **Lead qualificado**: Pessoa altamente engajada
- 📊 **Conversão**: Primeira conversão real no funil
- 💡 **Otimização**: Para pessoas que completam ações

### **Valor para campanhas:**
- **Público hot**: Assistiu vídeo completo = interesse real
- **Conversão de lead**: Otimização para geração de leads
- **Remarketing premium**: Para quem já converteu

---

## 💎 PIXEL 5: COMPLETEREGISTRATION (Pronto para Converter)

### **Quando dispara:**
- ✅ **Momento**: Junto com Lead (fim do vídeo)
- ✅ **Ação**: Usuário está pronto para próxima etapa

### **Código do pixel:**
```javascript
fbq("track", "CompleteRegistration", {
  content_name: "Ready to Convert"
});
```

### **Para que serve:**
- 🏆 **Conversão máxima**: Maior evento de conversão
- 💰 **Otimização final**: Para pessoas prontas para comprar
- 🎯 **Remarketing hot**: Audiência mais valiosa

### **Valor para campanhas:**
- **Otimização de compra**: Ensina algoritmo sobre conversões
- **Público mais valioso**: Para campanhas de alta conversão
- **Lookalike premium**: Baseado em quem realmente converte

---

## 📊 FUNIL COMPLETO DE PIXELS

```
Usuário entra no site
         ↓
    (2 segundos)
         ↓
🔥 PIXEL 1: ViewContent + PIXEL 2: InitiateCheckout
         ↓
    (50% do vídeo)
         ↓
🎯 PIXEL 3: AddToCart
         ↓
    (100% do vídeo)
         ↓
💎 PIXEL 4: Lead + PIXEL 5: CompleteRegistration
         ↓
    Usuário vai para oferta
```

---

## 🎯 ESTRATÉGIA DE CAMPANHAS RECOMENDADA

### **Campanha 1: Topo de Funil**
- **Otimização**: ViewContent
- **Público**: Interesses amplos
- **Objetivo**: Awareness e engajamento

### **Campanha 2: Meio de Funil**
- **Otimização**: AddToCart
- **Público**: Quem viu ViewContent
- **Objetivo**: Engajamento qualificado

### **Campanha 3: Fundo de Funil**
- **Otimização**: Lead/CompleteRegistration
- **Público**: Quem fez AddToCart
- **Objetivo**: Conversão máxima

### **Campanha 4: Remarketing**
- **Público**: Todos os pixels (exclusões estratégicas)
- **Objetivo**: Reativar quem não converteu

---

## 🔧 IMPLEMENTAÇÃO TÉCNICA

- ✅ **Pixels automáticos**: Disparam sem intervenção manual
- ✅ **Dados estruturados**: Cada pixel tem informações específicas
- ✅ **Valores monetários**: AddToCart tem valor R$ 50
- ✅ **Categorização**: Cada evento é categorizado corretamente
- ✅ **Segurança**: Verificação se Facebook Pixel está carregado

## 📈 MÉTRICAS ESPERADAS

- **ViewContent**: 100% dos visitantes que veem VSL
- **InitiateCheckout**: 100% (dispara junto)
- **AddToCart**: 30-50% (quem assiste pelo menos metade)
- **Lead**: 10-25% (quem assiste completo)
- **CompleteRegistration**: 10-25% (dispara junto com Lead)

---

**🚀 RESULTADO:** Sistema completo de rastreamento que permite otimização precisa das campanhas do Facebook, desde awareness até conversão final.
