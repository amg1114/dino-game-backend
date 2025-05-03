import { MigrationInterface, QueryRunner } from 'typeorm';

export class VideoGamesSeed1746155837792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Clear the table before inserting new data
    await queryRunner.query(`TRUNCATE TABLE users CASCADE;`);

    await queryRunner.query(`
        INSERT INTO users (id, nombre, fecha_nacimiento, sexo, pais, correo, password, tipo)
        VALUES
        (1, 'Blizzard Entertainment', '1999-01-01', 'D', 'US', 'blizzarde-entertainment@company.com', '$2b$10$8uRnPOwPc8SnAH/Ah.QkB.YySPrdHABtBnqAVAU79Afcd4wzWny6m', 'DEVELOPER'),
        (2, 'NetEase Games', '1999-01-01', 'D', 'US', 'netease-games@company.com', '$2b$10$x3maM07X4Zz7g8K7t7LKwuG5rWvaKWd5pR9f1pxv3bzGx8Twq0KzS', 'DEVELOPER'),
        (3, 'Mediatonic', '1999-01-01', 'D', 'US', 'mediatonic@company.com', '$2b$10$9KAyIRtDfXmp7dsA0GInd.ok0vncU0Hs6sMAo0.YB7H6rOoSe9UsC', 'DEVELOPER'),
        (4, 'miHoyo', '1999-01-01', 'D', 'US', 'mihoyo@company.com', '$2b$10$AA0kiUFJ.QWG0HnldB6/rupwTnOro715a5cP6Su4IJlHarR98qKhC', 'DEVELOPER'),
        (5, 'Riot Games', '1999-01-01', 'D', 'US', 'riot-games@company.com', '$2b$10$ENyN6qpIJCXhHDb0VFJmbeKbFpxiKmdu1vRwEu3X4s/2y6/uVb2Ua', 'DEVELOPER'),
        (6, 'Digital Extremes', '1999-01-01', 'D', 'US', 'digital-extremes@company.com', '$2b$10$Rf61yif715gLJlBRl8GjdOI8yNc9Z44bKS23Tinj6GE7khdmDcDAG', 'DEVELOPER'),
        (7, 'Hi Rez Studios', '1999-01-01', 'D', 'US', 'hi-rez-studios@company.com', '$2b$10$CwKJDFJSwev15nr1Zkg39.c97RE9bAYYZTDMZfgFzcRrv5U8jmEfa', 'DEVELOPER'),
        (8, 'FromSoftware', '1999-01-01', 'D', 'US', 'fromsoftware@company.com', '$2b$10$epl61XdqBkJ7WiLfxfxbfOJlW08gbZtt0U.Z1EaaJSAZv4IhQ3uu2', 'DEVELOPER'),
        (9, 'Santa Monica Studio', '1999-01-01', 'D', 'US', 'santa-monica-studio@company.com', '$2b$10$ZIBCPsCjqTaj8D1fJukIDOG8wKf94APBp.JWkLHmMbY58JrXwy6UK', 'DEVELOPER'),
        (10, 'Rockstar Games', '1999-01-01', 'D', 'US', 'rockstar-games@company.com', '$2b$10$flgQQc/z8gIayW7OMDeqx.i5/bo/EjIQPxFQGOhlPGeN1VI0q8iMC', 'DEVELOPER'),
        (11, 'CD Projekt Red', '1999-01-01', 'D', 'US', 'cd-projekt-red@company.com', '$2b$10$LOWc5xincwF5qAcox.kUxOAUKAQQoAe3Uhe64C7cDX4AnjFZLOnMy', 'DEVELOPER'),
        (12, 'Avalanche Software', '1999-01-01', 'D', 'US', 'avalanche-software@company.com', '$2b$10$HZ5nQzrIHacnu7cqrHxJNeFLgfI7Tz97LGm8CfVRwub5A7cakO4SS', 'DEVELOPER'),
        (13, 'Ubisoft', '1999-01-01', 'D', 'US', 'ubisoft@company.com', '$2b$10$SSqmB2I3EZ7DfiXE7w4nkOkCbx0BrJ1uRKZVdBH2WyxdStPfL2n6C', 'DEVELOPER'),
        (14, 'Infinity Ward', '1999-01-01', 'D', 'US', 'infinity-ward@company.com', '$2b$10$hW8FoSR7LnQMgBGvqvgsfuela5BtG467Rx2shPvRT3qGvbLdx3jR2', 'DEVELOPER'),
        (15, 'Capcom', '1999-01-01', 'D', 'US', 'capcom@company.com', '$2b$10$i2ZplOMAvx/CBnpB8BQfP.e2KqDWCmCy7a3atL.MmBssK5aQXKL6S', 'DEVELOPER'),
        (16, 'Square Enix', '1999-01-01', 'D', 'US', 'square-enix@company.com', '$2b$10$QhxTwnaWzlG.sqrUupuQmOKoFQRvybmZJbZIcbQTXJYMOxKCeN5vK', 'DEVELOPER'),
        (17, 'Bethesda Game Studios', '1998-12-31', 'D', 'US', 'bethesda-game-studios@company.com', '$2b$10$7IM19zxo4tvlj42qnT.tVOymZjwwKAFr1As1Bjl/hdlRTeatH89ve', 'DEVELOPER');
    `);

    await queryRunner.query(`
      SELECT setval('public.users_id_seq', (SELECT MAX(id) FROM users) + 1);
    `);

    await queryRunner.query(`TRUNCATE TABLE categorias CASCADE;`);

    await queryRunner.query(`
        INSERT INTO categorias (id, titulo, descripcion, slug)
        VALUES
        (1,'Disparos', null, 'disparos'),
        (2,'Multijugador', null, 'multijudagor'),
        (3,'Equipos', null, 'equipos'),
        (4,'Anime', null, 'anime'),
        (5,'RPG', null, 'rpg'),
        (6,'Battle Royale', null, 'battle-royale'),
        (7,'Super Hero', null, 'super-hero'),
        (8,'Platformer', null, 'platformer'),
        (9,'Acción', null, 'accion'),
        (10,'Mundo Abierto', null, 'mundo-abierto'),
        (11,'Aventura', null, 'aventura'),
        (12,'Mitología', null, 'mitologia'),
        (13,'Ciencia Ficcón', null, 'ciencia-ficcion'),
        (14,'Fantasía', null, 'fantasia'),
        (15,'Sigilo', null, 'sigilo'),
        (16,'Historia', null, 'historia'),
        (17,'Terror', null, 'terror'),
        (18,'Supervivencia', null, 'supervivencia');
    `);

    await queryRunner.query(`
      SELECT setval('public.categorias_id_seq', (SELECT MAX(id) FROM categorias) + 1);
    `);

    await queryRunner.query(`TRUNCATE TABLE assets CASCADE;`);

    await queryRunner.query(`
        INSERT INTO assets (id, title, url)
        VALUES
        (1, 'hero.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F3%2Fhero.jpeg?alt=media&token=f607f28c-2683-486c-b409-280eafd4fcb0'),
        (2, 'thumb.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F3%2Fthumb.jpeg?alt=media&token=e4c94a2a-3176-4cf3-85a6-845c4600ff3f'),
        (3, 'thumb.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F4%2Fthumb.jpeg?alt=media&token=bb350440-b810-426a-84f0-fbbcc473b259'),
        (4, 'hero.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F4%2Fhero.jpeg?alt=media&token=8007ab94-9c70-4cc1-9e59-6280e0f45b10'),
        (5, 'hero.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F5%2Fhero.jpeg?alt=media&token=722440b4-43f5-4b61-8738-9de0292dce85'),
        (6, 'thumb.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F5%2Fthumb.jpeg?alt=media&token=d585a425-76cb-4ad3-b5d7-019daf3f2af3'),
        (7, 'thumb.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F6%2Fthumb.jpeg?alt=media&token=2d10cdaf-7f49-4b8a-81e2-143b909f1600'),
        (8, 'hero.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F6%2Fhero.jpeg?alt=media&token=ad9d3e91-ae82-494e-8256-c32629321d97'),
        (9, 'hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fhero.jpg?alt=media&token=348a0ccc-b838-494f-a545-e490dea3f883'),
        (10, 'thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fthumb.jpg?alt=media&token=fdf6edbf-386e-416e-adc2-7a319339e467'),
        (11, 'thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fthumb.jpg?alt=media&token=32329945-123f-4794-85bc-7a7a721694c9'),
        (12, 'thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fthumb.jpg?alt=media&token=b85c81cc-57cb-46b8-9de8-21da0bb470fc'),
        (13, 'hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fhero.jpg?alt=media&token=cd1d4bfe-3bfd-4be6-8227-6dcf2e22ef12'),
        (14, 'hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fhero.jpg?alt=media&token=e769f658-1193-469f-98be-d33d5670f65a'),
        (15, 'thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F8%2Fthumb.jpg?alt=media&token=8458d4c1-8fba-47ae-8277-fe37c3720561'),
        (16, 'thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fthumb.jpg?alt=media&token=d25501c4-e10c-40c3-814a-986847353936'),
        (17, 'hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F7%2Fhero.jpg?alt=media&token=a163932c-5312-46a0-bf53-e2c8a0c804d7'),
        (18, 'hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F9%2Fhero.jpg?alt=media&token=c9dbd271-9673-4c05-896a-75daed0391d7'),
        (19, 'thumb.png', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F9%2Fthumb.png?alt=media&token=d1ab448d-fdef-442a-b425-e877607c99b6'),
        (20, 'elden-ring-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F10%2Felden-ring-thumb.jpg?alt=media&token=3f8b2ead-358b-4c8f-820c-3b54da22fe46'),
        (21, 'elden-ring-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F10%2Felden-ring-hero.jpg?alt=media&token=a4dd5634-f37c-4a68-a1a2-c0b58bfe7512'),
        (22, 'god-war-ragnarok-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F11%2Fgod-war-ragnarok-hero.jpg?alt=media&token=7a56c2ab-369b-49bf-9701-58ee813585b0'),
        (23, 'god-war-ragnarok-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F11%2Fgod-war-ragnarok-thumb.jpg?alt=media&token=8f37997d-b28a-4c51-ae02-f440c9f5d679'),
        (24, 'red-dead-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F12%2Fred-dead-thumb.jpg?alt=media&token=a0548736-8138-4ce1-b644-6e8b6d4b27da'),
        (25, 'red-dead-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F12%2Fred-dead-hero.jpg?alt=media&token=c4f8106f-d499-4968-b5da-f527b737f9df'),
        (26, 'cyber-punk-hero.png', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F13%2Fcyber-punk-hero.png?alt=media&token=6d3ac8f6-428b-4f81-a86c-f00a825d968d'),
        (27, 'cyber-punk-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F13%2Fcyber-punk-thumb.jpg?alt=media&token=ae3be308-f767-4183-9f13-ea4ace1b7b67'),
        (28, 'hogwarts-legacy-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F14%2Fhogwarts-legacy-thumb.jpg?alt=media&token=78d73e01-4f38-454f-9078-ad03b007e88e'),
        (29, 'hogwarts-legacy-hero.png', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F14%2Fhogwarts-legacy-hero.png?alt=media&token=84db489d-c74c-4a03-acaa-2158862ee1bb'),
        (30, 'the-witcher-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F15%2Fthe-witcher-hero.jpg?alt=media&token=020f3898-54ee-4b10-b313-f5ec5b5b347b'),
        (31, 'the-witcher-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F15%2Fthe-witcher-thumb.jpg?alt=media&token=0956119c-053c-4f9f-abd8-ffe5ca36db87'),
        (32, 'assassins-creed-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F16%2Fassassins-creed-thumb.jpg?alt=media&token=5e8177e2-42ce-40c6-bc51-60b2d9f1f31c'),
        (33, 'assassins-creed-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F16%2Fassassins-creed-hero.jpg?alt=media&token=bbad8d8d-9dc8-472a-bc03-ee23cc786d76'),
        (34, 'cod-hero.png', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F17%2Fcod-hero.png?alt=media&token=90e3837c-47ac-4acb-970f-096c0f32cfba'),
        (35, 'cod-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F17%2Fcod-thumb.jpg?alt=media&token=7d0bd658-fd58-47a9-b1a0-fb32db831a48'),
        (36, 'resident-evil-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F18%2Fresident-evil-thumb.jpg?alt=media&token=79763d98-45b5-4171-83f7-08edf6e7c377'),
        (37, 'resident-evil-hero.jpeg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F18%2Fresident-evil-hero.jpeg?alt=media&token=0ef43ce6-6570-4ce1-8237-4e7df7a0257b'),
        (38, 'final-fantasy-vii-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F20%2Ffinal-fantasy-vii-hero.jpg?alt=media&token=7689f0eb-07ff-48a8-885d-a54109346343'),
        (39, 'final-fantasy-vii-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F20%2Ffinal-fantasy-vii-thumb.jpg?alt=media&token=b2536a27-b990-47bd-a4c3-0ff24c346def'),
        (40, 'starfield-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F21%2Fstarfield-hero.jpg?alt=media&token=121dc2b2-785d-4da7-886c-ad0751ecbd57'),
        (41, 'starfield-hero.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F21%2Fstarfield-hero.jpg?alt=media&token=bd99a03f-0037-4aa7-8269-4e166362177d'),
        (42, 'starfield-thumb.jpg', 'https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F21%2Fstarfield-thumb.jpg?alt=media&token=b002d9dc-913f-4b6a-a96a-025004e8edd7');
    `);

    await queryRunner.query(`
      SELECT setval('public.assets_id_seq', (SELECT MAX(id) FROM assets) + 1);
    `);

    await queryRunner.query(`TRUNCATE TABLE videogames CASCADE;`);

    await queryRunner.query(`
        INSERT INTO videogames (id, precio, titulo, descripcion, fecha_lanzamiento, developer_id, slug, thumb_id, hero_id)
        VALUES
        (1, 0, 'Overwatch 2', 'Overwatch 2 es un videojuego de disparos en primera persona. Fue desarrollado y publicado por Blizzard Entertainment. Es una secuela del hero shooter de 2016 Overwatch. El videojuego se diseñó para tener un entorno compartido para los modos de jugador contra jugador (JcJ) con el primer videojuego al tiempo que presenta modos cooperativos persistentes. Un cambio importante en el JcJ fue reducir el tamaño de los equipos de seis a cinco, lo que requirió que se reelaboraran varios personajes. El videojuego tuvo una beta cerrada en abril y mayo de 2022. El videojuego se lanzó como un título gratuito en acceso anticipado el 4 de octubre de 2022.', '2022-10-04', 1, 'overwatch-2', 2, 1),
        (2, 0, 'Marvel Rivals', 'Marvel Rivals es un videojuego de acción de disparos de héroes en tercera persona desarrollado y publicado por NetEase Games en colaboración con Marvel Games. El juego se lanzó para Microsoft Windows, PlayStation 5 y Xbox Series X/S el 6 de diciembre de 2024. La acogida del público fue muy positiva.', '2024-12-06', 2, 'marvel-rivals', 3, 4),
        (3, 0, 'Fall Guys', 'Fall Guys es un videojuego de plataformas y battle royale gratuito desarrollado por Mediatonic. En el videojuego participan hasta 32 jugadores que controlan criaturas parecidas a frijoles y compiten entre sí en una serie de minijuegos seleccionados al azar, como carreras de obstáculos o fútbol en equipo.', '2020-08-05', 3, 'fall-guys', 6, 5),
        (4, 0, 'Zenless Zone Zero', 'Zenless Zone Zero es un videojuego de rol de acción de fantasía urbana desarrollado por miHoYo, publicado por miHoYo en China continental y en todo el mundo por HoYoverse para las plataformas Android, iOS, Microsoft Windows y PlayStation 5. Se lanzó el 4 de julio de 2024.​', '2024-07-04', 4, 'zenless-zone-zero', 7, 8),
        (5, 0, 'Valorant', 'Valorant (estilizado como VALORANT) es un shooter táctico en primera persona de estilo hero shooter, desarrollado y publicado por Riot Games. El desarrollo del juego comenzó en 2014, y fue anunciado bajo el nombre en clave Project A en octubre de 2019. La beta cerrada, con acceso limitado, se lanzó el 7 de abril de 2020, y el juego fue lanzado oficialmente el 2 de junio de 2020', '2020-07-02', 5, 'valorant', 16, 17),
        (6, 0, 'Warframe', 'Warframe es un videojuego de disparos en tercera persona gratuito de modalidad jugador contra entorno individual o cooperativo, aunque posee una modalidad jugador contra jugador en los modos de juego conocidos como Cónclave y Lunaro.', '2013-03-25', 6, 'warframe', 15, 14),
        (7, 0, 'Paladins', 'Paladins: Champions of the Realm es un videojuego gratuito en línea de disparos en primera persona con componentes de hero shooter.', '2016-09-16', 7, 'paladins', 19, 18),
        (8, 149000, 'Elden Ring', 'Un RPG de acción en mundo abierto creado por FromSoftware y George R.R. Martin. Explora las Tierras Intermedias mientras enfrentas enemigos desafiantes.', '2022-02-25', 8, 'elden-ring', 20, 21),
        (9, 179000, 'God of War Ragnarök', 'Kratos y Atreus deben enfrentarse al fin del mundo nórdico en esta épica secuela de God of War (2018).', '2022-09-11', 9, 'god-of-war-ragnarok', 23, 22),
        (10, 119000, 'Red Dead Redemption 2', 'Un juego de mundo abierto ambientado en el lejano oeste. Vive la historia de Arthur Morgan, un forajido en conflicto con su moral.', '2018-10-26', 10, 'red-dead-redemption-2', 24, 25),
        (11, 99000, 'Cyberpunk 2077', 'Un RPG futurista en una ciudad distópica. Crea tu personaje y decide tu camino en un mundo donde la tecnología lo domina todo.', '2020-12-10', 11, 'cyberpunk-2077', 27, 26),
        (12, 139000, 'Hogwarts Legacy', 'Explora el mundo mágico de Harry Potter como nunca antes. Asiste a clases, domina hechizos y descubre secretos en Hogwarts.', '2023-02-10', 12, 'hogwarts-legacy', 28, 29),
        (13, 89000, 'The Witcher 3: Wild Hunt – Complete Edition', 'Conviértete en Geralt de Rivia, un cazador de monstruos, en un mundo abierto lleno de decisiones morales, criaturas y magia.', '2015-05-19', 11, 'the-witcher-3-complete-edition', 31, 30),
        (14, 139000, 'Assassin’s Creed Mirage', 'Regresa a las raíces del sigilo y el parkour en Bagdad del siglo IX, como Basim, un joven ladrón en busca de respuestas.', '2023-10-05', 13, 'assassins-creed-mirage', 32, 33),
        (15, 139000, 'Call of Duty: Modern Warfare III', 'La icónica saga de disparos regresa con más acción multijugador, campaña cinematográfica y combate táctico.', '2023-11-10', 14, 'call-of-duty-modern-warfare-3', 35, 34),
        (16, 129000, 'Resident Evil 4 Remake', ' Remake del clásico de horror con jugabilidad renovada, mejoras visuales y atmósfera intensa.', '2023-03-24', 15, 'resident-evil-4-remake', 36, 37),
        (17, 159000, 'Final Fantasy VII Rebirth', 'Segunda parte del remake de FFVII. Aventura épica con batallas en tiempo real y una historia emotiva.', '2024-02-19', 16, 'final-fantasy-vii-rebirth', 39, 38),
        (18, 149000, 'Starfield', 'Un RPG espacial de mundo abierto creado por los desarrolladores de Skyrim y Fallout. Explora cientos de planetas, únete a facciones, y construye tu propia nave en esta ambiciosa aventura interestelar.', '2023-06-09', 17, 'starfield', 42, 41);
    `);

    await queryRunner.query(`
      SELECT setval('public.videogames_id_seq', (SELECT MAX(id) FROM videogames) + 1);
    `);

    await queryRunner.query(`TRUNCATE TABLE categorias_videogames CASCADE;`);
    await queryRunner.query(`
    INSERT INTO categorias_videogames (categorias_id, videogames_id)
    VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (1, 2),
    (2, 2),
    (3, 2),
    (7, 2),
    (2, 3),
    (6, 3),
    (8, 3),
    (4, 4),
    (5, 4),
    (2, 4),
    (1, 5),
    (2, 5),
    (3, 5),
    (1, 6),
    (2, 6),
    (5, 6),
    (1, 7),
    (2, 7),
    (3, 7),
    (9, 8),
    (5, 8),
    (10, 8),
    (9, 9),
    (11, 9),
    (12, 9),
    (11, 10),
    (9, 10),
    (10, 10),
    (9, 11),
    (5, 11),
    (13, 11),
    (11, 12),
    (14, 12),
    (10, 12),
    (5, 13),
    (14, 13),
    (10, 13),
    (11, 14),
    (15, 14),
    (16, 14),
    (2, 15),
    (1, 15),
    (9, 15),
    (9, 16),
    (17, 16),
    (14, 17),
    (11, 17),
    (5, 17),
    (5, 18),
    (13, 18),
    (10, 18)
    `);

    await queryRunner.query(`TRUNCATE TABLE descuentos CASCADE;`);

    await queryRunner.query(`
        INSERT INTO descuentos (id, porcentaje, fecha_inicio, fecha_fin, video_game_id)
        VALUES
        (6,	0.5, '2024-05-11', '2026-05-14', 16),
        (7,	0.5, '2024-05-11', '2026-05-14', 17),
        (8,	0.5, '2024-05-11', '2026-05-14', 18)
    `);

    await queryRunner.query(`
      SELECT setval('public.descuentos_id_seq', (SELECT MAX(id) FROM descuentos) + 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);
    await queryRunner.query(
      `TRUNCATE TABLE categorias RESTART IDENTITY CASCADE;`,
    );
    await queryRunner.query(`TRUNCATE TABLE assets RESTART IDENTITY CASCADE;`);
    await queryRunner.query(
      `TRUNCATE TABLE videogames RESTART IDENTITY CASCADE;`,
    );
    await queryRunner.query(
      `TRUNCATE TABLE descuentos RESTART IDENTITY CASCADE;`,
    );
  }
}
