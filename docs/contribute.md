## Como contribuir

Pegue uma tarefa no nosso board no [Trello](https://trello.com/c/wpgI3g1U/8-clonar-e-rodar-projeto-localmente).

Verifique se está na branch master.

```bash
git branch
```

Se não estiver, mude para ela.

```bash
git checkout master
```

Baixe as atualizações da branch.

```bash
git pull
```

Caso o arquivo `package.json` tenha mudado, atualize as dependências.

```bash
npm install
```

Crie uma branch nova para desenvolver sua feature.

```bash
git checkout -b nomeDaBranch
```

Rode o projeto e desenvolva!

Quanto terminar, verifique os arquivos modificados.

```bash
git status
```

Adicione-os ao seu commit.

```bash
git add .
```

Dê nome ao seu commit.

```bash
git commit -m "Describe what you just did"
```

Envie para o Github.

```bash
git push
```

Crie um pull request com suas mudanças para serem analisadas.

```bash
https://github.com/Tibia-Dashboard/tibia-dashboard-backend/compare?expand=1
```

Escolha a sua branch e salve.

Aguarde comentários e a aprovação.