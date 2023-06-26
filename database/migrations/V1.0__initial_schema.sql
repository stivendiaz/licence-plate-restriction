-- Create 'users' table
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL CONSTRAINT users_pk PRIMARY KEY,
    username TEXT,
    email TEXT,
    first_name TEXT,
    second_name TEXT,
    password TEXT,
    role_id INT,
    CONSTRAINT users_role_id_fk FOREIGN KEY (role_id) REFERENCES public.role (id)
);

-- Create 'questions' table
CREATE TABLE IF NOT EXISTS public.questions (
    id SERIAL CONSTRAINT questions_pk PRIMARY KEY,
    title TEXT,
    description TEXT,
    user_id INT,
    comment_id INT,
    CONSTRAINT responses_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users (id),
    CONSTRAINT questions_comment_id_fk FOREIGN KEY (comment_id) REFERENCES public.comment (id)
);

-- Create 'responses' table
CREATE TABLE IF NOT EXISTS public.responses (
    id SERIAL CONSTRAINT responses_pk PRIMARY KEY,
    description TEXT,
    user_id INT,
    comment_id INT,
    CONSTRAINT responses_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users (id),
    CONSTRAINT responses_comment_id_fk FOREIGN KEY (comment_id) REFERENCES public.comment (id)
);

-- Create 'comments' table
CREATE TABLE IF NOT EXISTS public.comments (
    id SERIAL CONSTRAINT comments_pk PRIMARY KEY,
    description TEXT,
    user_id INT,
    CONSTRAINT comments_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users (id)
);

-- Create 'students' table
CREATE TABLE IF NOT EXISTS public.students (
    id SERIAL CONSTRAINT students_pk PRIMARY KEY,
    user_id INT,
    CONSTRAINT students_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users (id)
);

-- Create 'tutors' table
CREATE TABLE IF NOT EXISTS public.tutors (
    id SERIAL CONSTRAINT tutors_pk PRIMARY KEY,
    user_id INT,
    CONSTRAINT tutors_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users (id)
);

-- Create 'roles' table
CREATE TABLE IF NOT EXISTS public.roles (
    id SERIAL CONSTRAINT roles_pk PRIMARY KEY,
    name TEXT
);
