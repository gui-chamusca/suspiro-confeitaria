# Dados do Meu Negocinho — schema travado (sem DB, tudo manual)

Arquivos em `data/*.json`. Graci só GRAVA totais. Nunca edita passado.

## vendas-dia.json — Suspiro dia (Folha A)
`[{id, data:"YYYY-MM-DD", negocio:"suspiro", itens:{<produto>:{qtd,valor}}, total_vendas, gasto_total, gasto_obs, fiados:[{nome,valor}]}]`
Produtos: fatia_bolo, fatia_torta_doce, fatia_torta_salgada, torta_inteira, bolo_retirada, pao_mel, sanduiche, salada, outro

## noites-pizza.json — Pizza sex-sab-dom (Folha B)
`[{id, data, negocio:"pizza", qtd, faturamento(digitado), sabores:{<id>:{fina,grossa}}, custo_massa, custo_recheio, custo_x, custo_total, lucro, fiados:[]}]`
Preço: fina 35, grossa 40. Massa congelada = sem desperdício. Custo por sabor = 0 até mapear.

## fiados.json
`[{id, data, cliente, valor, negocio:suspiro|pizza, pago:false, origem_id}]`

## encomendas.json
`[{id, entrega, hora, cliente, telefone, oque, total, sinal, falta, status:aberta|entregue}]`

## Agregação semanal (server.js GET /api/resumo?de=&ate=&negocio=)
- suspiro.sobrou = faturamento - gasto
- pizza.lucro = faturamento - (massa+recheio+x)
- total.sobrou = soma dos dois
- Semana padrão: seg-dom
