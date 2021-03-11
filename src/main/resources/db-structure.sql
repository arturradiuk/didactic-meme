create table users
(
    id       int primary key not null,
    email    varchar unique  not null,
    password varchar         not null -- should be hash
);

create table friends
(
    id          int primary key not null,
    receiver_id int,
    sender_id   int,
    submitted   bool,
    CONSTRAINT fk_addressee FOREIGN KEY (receiver_id) REFERENCES Users (id),
    CONSTRAINT fk_addresser FOREIGN KEY (sender_id) REFERENCES Users (id)
);

insert into Users (id, email, password)
values (0, 'aradiuk@gmail.com', '123456');

insert into Users (id, email, password)
values (1, 'lolek@gmail.com', '123456');

insert into Users (id, email, password)
values (2, 'bolek@gmail.com', '123456');

insert into Users (id, email, password)
values (3, 'tola@gmail.com', '123456');

insert into Users (id, email, password)
values (4, 'dora@gmail.com', '123456');


insert into Friends(id, sender_id, receiver_id, submitted)
values (0, 0, 1, true);

insert into Friends(id, sender_id, receiver_id, submitted)
values (1, 0, 2, true);

insert into Friends(id, sender_id, receiver_id, submitted)
values (2, 0, 3, true);

insert into Friends(id, sender_id, receiver_id, submitted)
values (3, 4, 1, true);

insert into Friends(id, sender_id, receiver_id, submitted)
values (4, 4, 0, true);

select distinct on (receiver_id, sender_id) *
from friends
where receiver_id = 0
   or sender_id = 0 and submitted = true;