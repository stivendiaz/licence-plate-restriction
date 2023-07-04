-- Insert into 'roles' table
INSERT INTO public.roles (id, name)
VALUES (1, 'Admin');
INSERT INTO public.roles (id, name)
VALUES (2, 'Moderator');
INSERT INTO public.roles (id, name)
VALUES (3, 'Student');
INSERT INTO public.roles (id, name)
VALUES (4, 'Tutor');

-- Insert into 'users' table
INSERT INTO public.users (id, username, email, first_name, second_name, password, role_id)
VALUES (1, 'Admin', 'a@a.com', 'first_name', 'second_name', 'password', 1);
INSERT INTO public.users (id, username, email, first_name, second_name, password, role_id)
VALUES (2, 'Admin2', 'b@b.com', 'first_name', 'second_name', 'password', 2);

-- Insert into 'comments' table
INSERT INTO public.comments (id, description, user_id)
VALUES (1, 'Comment Description', 1);
INSERT INTO public.comments (id, description, user_id)
VALUES (2, 'Comment Description', 2);

-- Insert into 'questions' table
INSERT INTO public.questions (id, title, description, comment_id, user_id)
VALUES (1, 'Post Title', 'Post Description', 1, 1);

-- Insert into 'answers' table
INSERT INTO public.answers (id, description, user_id, comment_id, question_id)
VALUES (1, 'Response Description', 1, 1, 1);

-- Insert into 'students' table
INSERT INTO public.students (id, user_id)
VALUES (1, 2);

-- Insert into 'tutors' table
INSERT INTO public.tutors (id, user_id)
VALUES (1, 1);
