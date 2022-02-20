# Cadastro de carros


**RF**
- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias.

**RN**
- Apenas usuários administradores podem cadastrar carros.
- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado com disponibilidade como "padrão".

# Listagem de carros

**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- A listagem dos carros pode ser feita por todos os usuários

# Cadastro de especificações no carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível todas as especificações.
- Deve ser possível listar todos os carros

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma espeficicação já existente para o mesmo carro.
- Apenas usuários administradores podem cadastrar especificações.

# Cadastro de imagens

**RF**
- Deve ser possível cadastrar a imagem para o carro
- Deve ser possível listar todos os carros

**RNF**
- Utilizar o multer para upload de arquivos

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Apenas usuários administradores podem cadastrar imagens de carros.


# Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
