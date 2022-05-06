--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: trips; Type: TABLE; Schema: public; Owner: lisalee
--

CREATE TABLE public.trips (
    id integer NOT NULL,
    country character varying(255),
    startdate date,
    enddate date,
    userid integer,
    traveldate date
);


ALTER TABLE public.trips OWNER TO lisalee;

--
-- Name: searches_id_seq; Type: SEQUENCE; Schema: public; Owner: lisalee
--

ALTER TABLE public.trips ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.searches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: lisalee
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO lisalee;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: lisalee
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: lisalee
--

COPY public.trips (id, country, startdate, enddate, userid, traveldate) FROM stdin;
3	Japan	2022-05-01	2022-05-15	2	2022-05-01
1	South Korea	2023-01-01	2023-02-01	1	2023-01-01
2	Taiwan	2023-02-01	2023-03-01	1	2023-02-01
7	Spain	\N	\N	\N	2022-02-02
8	Afghanistan	\N	\N	\N	2022-02-02
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lisalee
--

COPY public.users (id, name, email) FROM stdin;
1	Lisa	lisa@lisa.com
2	John	john@john.com
4	derek	derek@derek.com
9	Lisa	lisawlee04@gmail.com
\.


--
-- Name: searches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lisalee
--

SELECT pg_catalog.setval('public.searches_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lisalee
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: trips searches_pkey; Type: CONSTRAINT; Schema: public; Owner: lisalee
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT searches_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: lisalee
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: trips searches_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lisalee
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT searches_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

