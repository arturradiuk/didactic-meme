INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-1, 'ROLE_USER', 'pawel@gmail.com', 'super_haslo', 'pawel', 'https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-2, 'ROLE_USER', 'artur@gmail.com', 'super_haslo', 'artur', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-3, 'ROLE_USER', 'michal@gmail.com', 'super_haslo', 'michal','https://pl.toluna.com/dpolls_images/2018/01/25/29958fae-c3ac-4019-9daa-38e90fd58903.jpg');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-4, 'ROLE_USER', 'damian@gmail.com', 'super_haslo', 'damian','https://2.allegroimg.com/s512/033f25/824e4ea146ba948fe25d216819f2/Oplatek-na-Tort-SHREK-nasycone-kolory-wysylka-24h');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-5, 'ROLE_USER', 'szymon_j@gmail.com', 'super_haslo', 'szymon_j','https://cachedimages.podchaser.com/256x256/aHR0cHM6Ly9jcmVhdG9yLWltYWdlcy5wb2RjaGFzZXIuY29tLzU3OTQ5Y2JiODU3NjZhYTM2ODIxZjQ3MzlhMTVmOGNkLmpwZWc%3D/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-6, 'ROLE_USER', 'szymon_w@gmail.com', 'super_haslo', 'szymon_w','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU');

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-1, 'Halo halo', true, now(), gen_random_uuid(), -1, -2);

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-2, 'Witam pana', true, now(), gen_random_uuid(), -2, -1);

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-3, 'Dzien dobry', true, now(), gen_random_uuid(), -1, -4);

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-4, 'Czesc', true, now(), gen_random_uuid(), -4, -1);