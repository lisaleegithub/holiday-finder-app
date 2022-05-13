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
-- Name: countries; Type: TABLE; Schema: public; Owner: lisalee
--

CREATE TABLE public.countries (
    name character varying(255),
    code character varying(20) NOT NULL
);


ALTER TABLE public.countries OWNER TO lisalee;

--
-- Name: trips; Type: TABLE; Schema: public; Owner: lisalee
--

CREATE TABLE public.trips (
    id integer NOT NULL,
    country character varying(255),
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
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: lisalee
--

COPY public.countries (name, code) FROM stdin;
Afghanistan	AF
Albania	AL
Algeria	DZ
American Samoa	AS
Andorra	AD
Angola	AO
Anguilla	AI
Antigua and Barbuda	AG
Argentina	AR
Armenia	AM
Aruba	AW
Australia	AU
Austria	AT
Azerbaijan	AZ
Bahrain	BH
Bangladesh	BD
Barbados	BB
Belarus	BY
Belgium	BE
Belize	BZ
Benin	BJ
Bermuda	BM
Bhutan	BT
Bolivia	BO
Bosnia and Herzegovina	BA
Botswana	BW
Brazil	BR
British Virgin Islands	VG
Brunei	BN
Bulgaria	BG
Burkina Faso	BF
Burundi	BI
Cabo Verde	CV
Cambodia	KH
Cameroon	CM
Canada	CA
Cayman Islands	KY
Central African Republic	CF
Chad	TD
Chile	CL
China	CN
Colombia	CO
Comoros	KM
Congo	CG
Congo Democratic Republic	CD
Cook Islands	CK
Costa Rica	CR
Cote d'Ivoire	CI
Croatia	HR
Cuba	CU
Curaçao	CW
Cyprus	CY
Czechia	CZ
Denmark	DK
Djibouti	DJ
Dominica	DM
Dominican Republic	DO
East Timor	TL
Ecuador	EC
Egypt	EG
El Salvador	SV
Equatorial Guinea	GQ
Eritrea	ER
Estonia	EE
Ethiopia	ET
Falkland Islands	FK
Faroe Islands	FO
Fiji	FJ
Finland	FI
France	FR
French Polynesia	PF
Gabon	GA
Gambia	GM
Georgia	GE
Germany	DE
Ghana	GH
Gibraltar	GI
Greece	GR
Greenland	GL
Grenada	GD
Guam	GU
Guatemala	GT
Guernsey	GG
Guinea	GN
Guinea-Bissau	GW
Guyana	GY
Haiti	HT
Honduras	HN
Hong Kong	HK
Hungary	HU
Iceland	IS
India	IN
Indonesia	ID
Iran	IR
Iraq	IQ
Ireland	IE
Isle of Man	IM
Israel	IL
Italy	IT
Jamaica	JM
Japan	JP
Jersey	JE
Jordan	JO
Kazakhstan	KZ
Kenya	KE
Kiribati	KI
Kosovo	XK
Kuwait	KW
Kyrgyzstan	KG
Laos	LA
Latvia	LV
Lebanon	LB
Lesotho	LS
Liberia	LR
Libya	LY
Liechtenstein	LI
Lithuania	LT
Luxembourg	LU
Macau	MO
Madagascar	MG
Malawi	MW
Malaysia	MY
Maldives	MV
Mali	ML
Malta	MT
Marshall Islands	MH
Martinique	MQ
Mauritania	MR
Mauritius	MU
Mayotte	YT
Mexico	MX
Micronesia	FM
Moldova	MD
Monaco	MC
Mongolia	MN
Montenegro	ME
Montserrat	MS
Morocco	MA
Mozambique	MZ
Myanmar	MM
Namibia	NA
Nauru	NR
Nepal	NP
Netherlands	NL
New Caledonia	NC
New Zealand	NZ
Nicaragua	NI
Niger	NE
Nigeria	NG
North Korea	KP
North Macedonia	MK
Northern Mariana Islands	MP
Norway	NO
Oman	OM
Pakistan	PK
Palau	PW
Panama	PA
Papua New Guinea	PG
Paraguay	PY
Peru	PE
Philippines	PH
Poland	PL
Portugal	PT
Puerto Rico	PR
Qatar	QA
Reunion	RE
Romania	RO
Russia	RU
Rwanda	RW
Saint Helena	SH
Saint Kitts and Nevis	KN
Saint Lucia	LC
Saint Martin	MF
Saint Pierre and Miquelon	PM
Saint Vincent and the Grenadines	VC
Samoa	WS
San Marino	SM
Sao Tome and Principe	ST
Saudi Arabia	SA
Senegal	SN
Serbia	RS
Seychelles	SC
Sierra Leone	SL
Singapore	SG
Sint Maarten	SX
Slovakia	SK
Slovenia	SI
Solomon Islands	SB
Somalia	SO
South Africa	ZA
South Korea	KR
South Sudan	SS
Spain	ES
Sri Lanka	LK
St. Barts	BL
Sudan	SD
Suriname	SR
Sweden	SE
Switzerland	CH
Syria	SY
Taiwan	TW
Tajikistan	TJ
Tanzania	TZ
Thailand	TH
The Bahamas	BS
Togo	TG
Tonga	TO
Trinidad and Tobago	TT
Tunisia	TN
Turkey	TR
Turkmenistan	TM
Turks and Caicos Islands	TC
Tuvalu	TV
US Virgin Islands	VI
Uganda	UG
Ukraine	UA
United Arab Emirates	AE
United Kingdom	GB
United States	US
Uruguay	UY
Uzbekistan	UZ
Vanuatu	VU
Vatican City (Holy See)	VA
Venezuela	VE
Vietnam	VN
Wallis and Futuna	WF
Yemen	YE
Zambia	ZM
Zimbabwe	ZW
eSwatini	SZ
\.


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: lisalee
--

COPY public.trips (id, country, userid, traveldate) FROM stdin;
94	AM	11	2022-05-10
99	AF	11	2024-02-22
102	JP	11	2024-01-18
103	KR	11	2022-08-17
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lisalee
--

COPY public.users (id, name, email) FROM stdin;
1	Lisa	lisa@lisa.com
2	John	john@john.com
4	derek	derek@derek.com
11	Lisa	lisawlee04@gmail.com
\.


--
-- Name: searches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lisalee
--

SELECT pg_catalog.setval('public.searches_id_seq', 103, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lisalee
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: lisalee
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (code);


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
-- Name: trips trips_country_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lisalee
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_country_fkey FOREIGN KEY (country) REFERENCES public.countries(code);


--
-- PostgreSQL database dump complete
--

