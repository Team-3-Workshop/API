# API

## User

* `localhost:3000/api/users`
#### GET
  - Response :
      - _404_ Data user kosong/tidak ditemukan
      - _200_ Menampilkan seluruh data user

* `localhost:3000/api/users/{userId}`
###### GET
  - `{userId}` input ID user
  - Response :
    - _404_ Data user tidak ditemukan
    - _200_ Data user ditemukan
