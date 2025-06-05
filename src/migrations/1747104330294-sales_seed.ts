import { MigrationInterface, QueryRunner } from 'typeorm';

export class SalesSeed1747104330294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        -- Declaración de fechas de inicio y fin
        WITH fechas AS (
        SELECT
            to_date('2024-01-01', 'YYYY-MM-DD') AS fecha_inicio,
            to_date('2025-05-19', 'YYYY-MM-DD') AS fecha_fin
        ),

        -- Paso 1: Insertar 10 usuarios ficticios
        new_users AS (
        INSERT INTO users (nombre, correo, sexo, pais, fecha_nacimiento, password)
        SELECT
            'Usuario_' || i,
            'usuario' || i || '@ejemplo.com',
            'D',
            'CO',
            '1999-01-01',
            '$2b$10$CwTycUXWue0Thq9StjUM0uJ8dL6N1Ji99xFoElbCwV14reCqYDxGa'  -- hash de "123456"
        FROM generate_series(1, 10) AS s(i)
        RETURNING id
        )

        -- Paso 2: Insertar 1000 registros en user_videogames
        INSERT INTO user_videogames (fecha_compra, precio, user_id, video_game_id)
        SELECT
        -- Fecha aleatoria entre fecha_inicio y fecha_fin
        f.fecha_inicio + (random() * (f.fecha_fin - f.fecha_inicio))::int AS fecha_compra,
        -- Precio aleatorio entre 5 y 100
        round((random() * 95 + 5)::numeric, 2) AS precio,
        -- Usuario aleatorio de los nuevos
        (SELECT id FROM new_users OFFSET floor(random() * 10)::int LIMIT 1) AS user_id,
        -- Videojuego aleatorio entre 1 y 18
        (random() * 17 + 1)::int AS video_game_id
        FROM generate_series(1, 5000), fechas f;        
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM user_videogames WHERE user_id IN (SELECT id FROM users WHERE nombre LIKE 'Usuario_%');
        DELETE FROM users WHERE nombre LIKE 'Usuario_%';
    `);
  }
}
