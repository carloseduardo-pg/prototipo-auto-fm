# Coleta — Portal FM Transportes

Na operação real, a coleta das três fontes é o **RPA (Vini)**. Este portal, no 1º entregável, **consome** remessas já trazidas (seed ou contrato com o RPA). Não implementar coletor OTM/SFTP aqui agora.

UI: botão “Coletar agora” no mockup simula com timeout. Persistência planejada: `collection_runs` + `source_snapshots`.
