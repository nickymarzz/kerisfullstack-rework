# 4NF Normalized Table for KERIS DB

## Scholar Table

| Column Name | Data Type |
|---|---|
| scholar_id (pk) | INT |
| name | VARCHAR |
| email | VARCHAR |
| ig_acc | VARCHAR |
| about | TEXT |
| institution_id (fK) | INT |
| major_id (fk) | INT |

## Major Table

| Column Name | Data Type |
|---|---|
| major_id (pk) | INT |
| program | VARCHAR |
| major | VARCHAR |

## Institution Table

| Column Name | Data Type |
|---|---|
| institution_id (pk) | INT |
| institution | VARCHAR |

## Sponsor Table

| Column Name | Data Type |
|---|---|
| sponsor_id (pk) | INT |
| sponsor | VARCHAR |
| email | VARCHAR |
| status | ENUM |
| link | VARCHAR |
| last_updated | TIMESTAMP |

## Sponsor_Program Table

| Column Name | Data Type |
|---|---|
| sponsor_program_id (pk) | INT |
| sponsor_id (fk) | INT |
| sponsor_program | VARCHAR |
| about | TEXT |

## Scholar_Sponsor_Program Table

| Column Name | Data Type |
|---|---|
| scholar_id (pk + fk) | INT |
| sponsor_program_id (pk + fk) | INT |

## Scholar_Institution Table

| Column Name | Data Type |
|---|---|
| scholar_id (pk + fk) | INT |
| institution_id (pk + fk) | INT |
