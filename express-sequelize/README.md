## ENDPOINT API SPORT MANAGEMENT
URL `http://localhost:8000/`+model

Users memiliki 3 role ["Administrator", "Pemilik", "Penyewa"]
Admin mempunyai seluruh akses, 
Pemilik mempunyai akses ["CRUD Jadwal Lapangan", "CRUD Lapangan", "Read Details Transactions"], 
Penyewa mempunyai akses ["Create Booking", "Read Lapangan", "Create Transactions", "Delete Transactions"]

Update :\
\+ File Migrations
\+ File Models
\+ File Routes

Migrate command:
```
>sequelize db:migrate:undo:all
>sequelize db:migrate
```
Running command with `nodemon` or `npm start`

HASH KEY
```
import 'package:crypto/crypto.dart';
import 'dart:convert'; // for the utf8.encode method

void main() {
  var bytes = utf8.encode("123456"); // data being hashed
  var sha_1 = sha1.convert(bytes);
  var md_5 = md5.convert(sha_1.bytes);
  var sha_256 = sha256.convert(md_5.bytes);

  print("Digest as bytes: $bytes");
  print("Digest as hex string: $sha_1");
  print("Bytes: ${sha_1.bytes}");
  print("Digbytes: $md_5");
  print("Hashed: ${md_5.bytes}");
  print("Hasheded: $sha_256");
}
```