Projeto para Desafio de vaga Programador Junior PHP

Pré-Requisitos:
PHP: 8.4.27
Composer: 2.10.3
Laravel: 13.38.0
Git instalado

#Instalação

1. git clone https://github.com/yuribuenooo/Desafio_Programador_ConectaSUS
2. cd desafio-programador
3. composer install
4. cp .env.example .env
5. php artosan key:generate

#Banco de Dados
1. Realize a configuração do arquivo .env de acordo com os dados locais 

#Migrations
1. Ciação de tabelas e execução de seeders: php artisan migrate --seed

#EndPoins da API
 GET|HEAD        / ....................................................................................................... routes/web.php:5
  GET|HEAD        api/health-units .......................................................................... Api\HealthUnitController@index
  GET|HEAD        api/patients ................................................................ patients.index › Api\PatientController@index
  POST            api/patients ................................................................ patients.store › Api\PatientController@store
  GET|HEAD        api/patients/{patient} ........................................................ patients.show › Api\PatientController@show
  PUT|PATCH       api/patients/{patient} .................................................... patients.update › Api\PatientController@update
  DELETE          api/patients/{patient} .................................................. patients.destroy › Api\PatientController@destroy
  GET|HEAD        api/user ................................................................................................ routes/api.php:9
  GET|HEAD        sanctum/csrf-cookie .................................... sanctum.csrf-cookie › Laravel\Sanctum › CsrfCookieController@show
  GET|HEAD        storage/{path} ...... storage.local › vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:111
  PUT             storage/{path} storage.local.upload › vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:119
  GET|HEAD        up ................................................................................... Illuminate\Foundation › HealthCheck

  #Check-List
  1. API Laravel Funcionando com endpoint -OK
  2. Migrations e Seeders executando -OK
  3. Interface JavaSctipt usando REact - Ok
  4.  Arquivo SQL/Consulta - OK
  5. Reposítório git e Commits -OK

  #A fazer
  1. Testes automatizados