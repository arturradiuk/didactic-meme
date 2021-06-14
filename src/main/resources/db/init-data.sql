INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-1, 'ROLE_USER', 'pawel@gmail.com', 'super_haslo', 'pawel', 'https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-2, 'ROLE_USER', 'artur@gmail.com', 'super_haslo', 'artur', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-3, 'ROLE_USER', 'michal@gmail.com', 'super_haslo', 'michal','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-4, 'ROLE_USER', 'damian@gmail.com', 'super_haslo', 'damian','https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png');

INSERT INTO public.users (id, access_level, email, password, user_name, avatar)
VALUES (-5, 'ROLE_USER', 'szymon_j@gmail.com', 'super_haslo', 'szymon_j','https://img2.pngio.com/johnny-sins-png-7-png-image-johnny-sins-png-380_508.png');

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