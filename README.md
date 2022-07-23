## projeto-final-2022-1-g1-cc

1. [Sobre o Projeto](#sobre-o-projeto)
    * [Dependências](#Dependências)
    * [Como executar aplicação na sua máquina](#Como_executar_aplicação_na_sua_máquina)
    * [Como fazer  o deploy da aplicação](#Como_fazer_o_deploy_da_aplicação)
    * [Colaboradores](#Colaboradores)
    * [Link da Aplicação](#link)

## :rocket: Sobre o Projeto

Repositório criado para a disciplina de programação para internet 2.


### :hammer_and_wrench: Dependências back-end

- Python versão 3.7
- Django versão 2.2
- Pip
- Django-cors-headers versão 3.7.0
- Djangorestframework versão 3.13.1
- Gunicorn versão 20.1.0

### :hammer_and_wrench: Dependências front-end

- React 17.0.1
- Axios versão 0.21.1


### :wrench: Como executar aplicação na sua máquina no back-end

Execute os comandos a seguir:

1º No terminal da pasta que usará para guardar os arquivos digite:

```
git clone https://github.com/Prof-Fabio-Henrique/projeto-final-2022-1-g1-cc.git
```

2º Pelo terminal acesse a pasta da aplicação usando o comando cd

```
cd projeto-final-2022-1-g1-cc
```
3º Digite o comando abaixo para mudar para a branch da api

```
 git checkout -b back-end
```

4º Direcione-se até o arquivo settings.py e coloque debug como True

```
 DEBUG = True
```


5º Digite o comando abaixo para instalar as dependências (obs: você tem que ter o comando pip instalado)

```
pip install -r requirements.txt 
```

6º Digite o comando abaixo para gerar o banco

```
python manage.py migrate
```

7º Para rodar a aplicação digite:

```
 python manage.py runserver
```
8º Para testar a aplicação siga os passos descritos para o front-end

### :hammer: Como fazer o deploy da aplicação

Acesse a documentação para realizar o deploy

[Documentação](https://github.com/Prof-Fabio-Henrique/projeto-final-2022-1-g1-cc/blob/api/documentos/Documento%20de%20implanta%C3%A7%C3%A3o%20Simple%20Chat%20-%20PPI2.pdf)

### :woman_student: :man_student:  Colaboradores

- Caio Gomes Flausino
- Camila Nascimento de Carvalho

### :link: Link

Link da aplicação: 

https://experiencein-front.herokuapp.com/
