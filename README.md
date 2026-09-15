# Sergipe por Camila

Site estático (HTML, CSS e JavaScript) publicado em https://sergipe-por-camila.vercel.app/ a partir do repositório público https://github.com/Agnaldo6/sergipe-por-camila. A Vercel usa a pasta `dist` como diretório de saída; não há etapa de build.

## Nota para futuras alterações

Na publicação inicial, o `git push` por HTTPS nesta máquina retornou erro sem mensagem útil. A autenticação do GitHub e a API funcionaram; por isso, o conteúdo foi enviado pela API do GitHub. O site publicado foi verificado, e a árvore de arquivos remota era idêntica à local. **A causa da falha do `git push` não foi identificada.**

O histórico Git local e o remoto não são o mesmo: o commit local é `57f6e51f6556ec79acea324e612070cda5bcd584`, enquanto o remoto contém o commit inicial `45fd514f348484f1b9019443308b70cdd527b5ec` e o commit com todos os arquivos `7f295dc3f235e4cb04823705dacd41ce66803a55`. Antes de uma próxima publicação:

1. Autentique-se somente pela tela oficial do GitHub, se necessário. Não peça, copie ou armazene senhas ou tokens.
2. Verifique o estado do repositório remoto e alinhe o trabalho com ele, preferencialmente começando de um clone novo. Preserve quaisquer alterações locais; não use `git reset --hard` nem `git push --force` para resolver a divergência.
3. Investigue o transporte HTTPS do Git antes de depender de `git push`. Confirme o commit no GitHub e o deploy `Ready` na Vercel depois de enviar.
4. Preserve o design, os textos, as imagens, as animações e a estrutura visual do site, salvo pedido explícito de alteração.
