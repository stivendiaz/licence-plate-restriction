-- Insert into 'posts' table
INSERT INTO public.posts (title, description, comment_id)
VALUES ('Post Title', 'Post Description', 1);

-- Insert into 'responses' table
INSERT INTO public.responses (description, user_id, comment_id)
VALUES ('Response Description', 1, 2);

-- Insert into 'comments' table
INSERT INTO public.comments (description, user_id)
VALUES ('Comment Description', 1);
INSERT INTO public.comments (description, user_id)
VALUES ('Comment Description', 2);

-- Insert into 'users' table
INSERT INTO public.users (username, email, first_name, second_name, password, role_id)
VALUES ('Admin', 'a@a.com', 'first_name', 'second_name', 'password', 1);

-- Insert into 'students' table
INSERT INTO public.students (user_id)
VALUES (1);

-- Insert into 'tutors' table
INSERT INTO public.tutors (user_id)
VALUES (1);

-- Insert into 'roles' table
INSERT INTO public.roles (name)
VALUES ('Admin');
INSERT INTO public.roles (name)
VALUES ('Moderator');
INSERT INTO public.roles (name)
VALUES ('Student');
INSERT INTO public.roles (name)
VALUES ('Tutor');