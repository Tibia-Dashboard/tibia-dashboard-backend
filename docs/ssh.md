## Configurar chave SSH

Primeiro passo é gerar a chave SSH.

```bash
ssh-keygen
```

Plote a chave pública e adicione na sua conta no [Github](https://github.com/settings/keys).

```bash
cat ~/.ssh/id_rsa.pub
```

Inicie o serviço SSH.

```bash
sudo systemctl start ssh
```

Adicione a chave SSH ao `~/.bashrc` para ser executada sempre que abrir o terminal.

```bash
code `~/.bashrc`
```

Digite o comando no arquivo e salve.

```bash
ssh-add ~/.ssh/id_rsa
```
