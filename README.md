## Projeto backend em NestJS

## Pré-requisitos

Antes de começar é necessário ter instalado na sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Docker](https://docker.com)
- [Docker-Compose](https://docs.docker.com/compose/install/)
- [VS Code](https://code.visualstudio.com/)
- [wsl2](https://learn.microsoft.com/pt-br/windows/wsl/install)

### Criando a imagem base

Primeiramente devemos criar um diretório para o projeto em nosso ambiente WSL.

```bash
# Cria um diretório
$ mkdir <DIR_DO_PROJETO>
# Acessamos o diretório
$ cd <DIR_DO_PROJETO>
# Execute o seguinte comando
$ docker run --rm --volume "/home/your_user/<DIR_DO_PROJETO>:/app" --workdir "/app" --publish 3000:3000 -it node:22.2 bash
```

Com este comando nós iremos executar um container baseado na imagem node:22, e nos conectaremos neste container via terminal.

Sobre os parâmetros do comando:

> [!NOTE]
>
> `--rm` apaga containers antigos
>
> `--volume "/home/your_user/<DIR_DO_PROJETO>:/app"` realiza um link entre a pasta local do projeto com a pasta da aplicação dentro do container.
>
> `--workdir "/app"` diretório inicial quando o container é iniciado.
>
> `--publish 3000:3000` mapeia a porta 3000 do host para a porta 3000 do aplicativo.
>
> `-it` link entre o terminal do computador com o output do container

Agora que estamos conectado ao container, iremos instalar as dependências do projeto.

```bash
$ npm install
```

> [!IMPORTANT]
>
> Aqui há algo muito importante de mencionar. As instalações que você faz quando está conectado ao container serão perdidas quando o container for reiniciado.
>
> Porém as instalações feitas aqui são compartilhadas com o ambiente local. Ou seja, tudo que for criado dentro do container não será perdido.

Antes de iniciar o desenvolvimento, precisamos nos atentar que vários arquivos foram criados por dentro do container e talvez tenhamos que alterar o Owner das pastas e arquivos.

Vamos executar este comando no ambiente local:

```bash
$ sudo chown -R <USERNAME> /home/your_user/<DIR_DO_PROJETO>/
```

# Docker Compose

Para facilitar o desenvolvimento e teste da aplicação iremos utilizar o **Docker Compose** para automatizar as tarefas de build da imagem e execução dos containers.

Também iremos precisar criar um arquivo com as nossas variáveis de ambiente por questões de segurança, para evitarmos de informar esses parametros direto nos códigos.<br>
Na raiz do projeto crie um arquivo `.env`, nele iremos informar todos os argumentos necessários.

```
DB_HOST=db-pg
DB_USER=seu_user
DB_PASSWORD=sua_password
DB_NAME=seu_banco
DB_PORT=5432
```

Para executarmos nosso servidor Node e o banco de dados MongoDB agora bastarmos execurtamos o comando `docker-compose up -d`. Para parar a aplicação basta executar `docker-compose down`.

Após iniciar os containers das aplicações, precisamos alterar as permissões do diretório onde está montado o volume do **pgAdmin**. O pgAdmin é executado como o usuário pgadmin (UID: 5050) no grupo pgadmin (GID: 5050) no contêiner. Você deve garantir que todos os arquivos sejam legíveis e, quando necessário (por exemplo, o diretório de trabalho/sessão), possam ser gravados para este usuário na máquina host

```bash
$ sudo chown -R 5050:5050 ${DATA_PATH_HOST}/pgadmin
```