## Running the app

```
yarn install
yarn dev
```

Runs the app in the development mode under port 8000<br />

## Libraries used
- **express**
- **mysql**
- **body-parser**
- **cors**: for using scss preprocessor

## Notes
- No error handling (didn't have enough time)
- no search functionality (didn't have enough time)
- please set password of your db for backend in index.js in password field
- On the backend for handling sql queries no library was used (just mysql lib, without sequelize and etc.)

Query for creating `todo` table:
```
CREATE TABLE `todoapp`.`todos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(45) NOT NULL,
  `priority` VARCHAR(45) NULL,
  `title` VARCHAR(64) NULL,
  `description` TEXT(21844) NULL,
  `done` TINYINT(1) NULL DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE) CHARSET=UTF8MB4;
```