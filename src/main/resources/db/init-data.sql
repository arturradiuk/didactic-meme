INSERT INTO public.users (id, access_level, email, password, user_name)
VALUES (-1, 'ROLE_USER', 'pawel@gmail.com', 'super_haslo', 'pawel');

INSERT INTO public.users (id, access_level, email, password, user_name)
VALUES (-2, 'ROLE_USER', 'artur@gmail.com', 'super_haslo', 'artur');

INSERT INTO public.users (id, access_level, email, password, user_name)
VALUES (-3, 'ROLE_USER', 'michal@gmail.com', 'super_haslo', 'michal');

INSERT INTO public.users (id, access_level, email, password, user_name)
VALUES (-4, 'ROLE_USER', 'damian@gmail.com', 'super_haslo', 'damian');

INSERT INTO public.users (id, access_level, email, password, user_name)
VALUES (-5, 'ROLE_USER', 'szymon_j@gmail.com', 'super_haslo', 'szymon_j');

INSERT INTO public.users (id, access_level, email, password, user_name)
VALUES (-6, 'ROLE_USER', 'szymon_w@gmail.com', 'super_haslo', 'szymon_w');

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-1, 'Halo halo', true, now(), gen_random_uuid(), -1, -2);

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-2, 'Witam pana', true, now(), gen_random_uuid(), -2, -1);

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-3, 'Dzien dobry', true, now(), gen_random_uuid(), -1, -4);

INSERT INTO public.messages (id, content, read, sent_time, uuid, receiver_id, sender_id)
VALUES (-4, 'Czesc', true, now(), gen_random_uuid(), -4, -1);