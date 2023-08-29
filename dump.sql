--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4

-- Started on 2023-08-28 14:36:09 UTC

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

--
-- TOC entry 217 (class 1259 OID 16397)
-- Name: mailing; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mailing (
    id integer NOT NULL,
    mailing_text text NOT NULL,
    button_count integer DEFAULT 0 NOT NULL,
    messenger_id integer NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 16396)
-- Name: mailing_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.mailing ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.mailing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: messenger; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messenger (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 16388)
-- Name: messenger_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.messenger ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messenger_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3355 (class 0 OID 16397)
-- Dependencies: 217
-- Data for Name: mailing; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3353 (class 0 OID 16389)
-- Dependencies: 215
-- Data for Name: messenger; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.messenger OVERRIDING SYSTEM VALUE VALUES (1, 'SMS');
INSERT INTO public.messenger OVERRIDING SYSTEM VALUE VALUES (2, 'Telegram');
INSERT INTO public.messenger OVERRIDING SYSTEM VALUE VALUES (3, 'WhatsApp');
INSERT INTO public.messenger OVERRIDING SYSTEM VALUE VALUES (4, 'VKontakte');


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 216
-- Name: mailing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.mailing_id_seq', 1, false);


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 214
-- Name: messenger_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.messenger_id_seq', 4, true);


--
-- TOC entry 3208 (class 2606 OID 16404)
-- Name: mailing mailing_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mailing
    ADD CONSTRAINT mailing_pkey PRIMARY KEY (id);


--
-- TOC entry 3206 (class 2606 OID 16395)
-- Name: messenger messenger_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messenger
    ADD CONSTRAINT messenger_pkey PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 16405)
-- Name: mailing fk_messenger_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mailing
    ADD CONSTRAINT fk_messenger_id FOREIGN KEY (messenger_id) REFERENCES public.messenger(id);


-- Completed on 2023-08-28 14:36:09 UTC

--
-- PostgreSQL database dump complete
--

