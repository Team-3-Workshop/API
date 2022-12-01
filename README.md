# API

## User

`localhost:3000/api/users`
1. **GET**
    - Response :
            - _404_ Data user kosong/tidak ditemukan
            - _200_ Menampilkan seluruh data user

`localhost:3000/api/users/{userId}`
1. **GET**
  - `{userId}` input ID user
  - Response :
    - _404_ Data user tidak ditemukan
    - _200_ Data user ditemukan
