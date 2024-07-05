---
title: Analisi AS-IS
description: Analisi codice AS-IS
---

## Query
TaricUtil/src/it/finanze/ag_dogane/dogane/dogana/taric/misure/util/MisureAccess.java

### findMisureOrigin()
Firma del metodo:<br>
public Object findMisureOrigine(MisureFinder params, Hashtable rules, boolean consultazione, boolean rettifica)

<b>SQL_FIND_MISURE_COM</b> (riga 1094)

```sql
SELECT
    a.wt34ha_sid_mis, a.wt34ha_tip_mis, a.wt34ha_ruolo_r, a.wt34ha_anno_r, a.wt34ha_num_r,
    a.wt34ha_prog_r, a.wt34ha_tip_r, a.wt34ha_tip_cod_add, a.wt34ha_cod_add, a.wt34ha_cod_nc,
    a.wt34ha_cod_tar, a.wt34ha_cod_pae, a.wt34ha_flag_stp, a.wt34ha_ini_val, a.wt34ha_fin_val,
    a.wt34ha_num_ord, b.wt32ib_des, b.wt32ib_tip_ser_mis, b.wt32ib_trade_cod, a.wt34ha_tabacco
FROM 
    t34ha a, wt32ib b
WHERE
    b.wt32ib_tip_ser_mis <> 'E' filtroAntidumping
    AND a.wt34ha_tip_mis NOT LIKE '9%'
    AND b.wt32ib_tip_mis = a.wt34ha_tip_mis
    AND b.wt32ib_fin_val >= to_date(?, 'dd/mm/yyyy')
    AND b.wt32ib_tip_agg != '2'
    AND b.wt32ib_ini_val <= to_date(?, 'dd/mm/yyyy')
    AND a.wt34ha_tip_agg != '2'
    AND a.wt34ha_ini_val <= to_date(?, 'dd/mm/yyyy')
    AND a.wt34ha_fin_val >= to_date(?, 'dd/mm/yyyy')
    stringWhereNomenclaturaInForMisureCom(params)
    AND a.wt34ha_sid_mis NOT IN (
       SELECT wt34hg_sid_mis
       FROM wt34hg
       WHERE wt34hg_tip_agg != '2' AND wt34hg_ini_val_stp <= to_date(?, 'dd/mm/yyyy')
       AND wt34hg_fin_val_stp >= to_date(?, 'dd/mm/yyyy')
   )
```
<br>

<b>filtroAntidumping</b>

```java
String filtroAntidumping = "";
if (rettifica)
	filtroAntidumping = " AND b.wt32ib_tip_ser_mis <> 'D' ";
```

<br>
<b>stringWhereNomenclaturaInForMisureCom(params)</b>

```java
public String stringWhereNomenclaturaInForMisureCom(MisureFinder params) {
	return ("AND (a.wt34ha_cod_nc IN (?, ?, ?, ?)
           AND a.wt34ha_cod_tar='00'
           OR (a.wt34ha_cod_nc =?
           AND a.wt34ha_cod_tar=?)) ");
}
```

<br>
<b>MisureFinder</b>

```java
private String TipoMisura;
private String NumeroOrdine;
private String PaeseGruppoRegione;
private Date DataRiferimento;
private String CodiceRegolamento;
private String CodiceCadd;
private String FlagRestrizioni;
private String TipoRegolamento;
private String TipoCadd;
private int Pagina;
private String AnnoRegolamento;
private String CodiceNomenclaturaNC;
private String CodiceNomenclaturaTAR;
private String RuoloRegolamento;
private String PRG;
private transient char sep = 212;
private Vector Dazi;
private String DescNomenclatura;
private String uc;
private transient SimpleDateFormat frmt = new SimpleDateFormat("dd/MM/yyyy");
```

<br>

<b>SQL_FIND_MISURE_COM</b> (riga 1312)

La seguente query viene eseguita quando la rettifica è impostata come `true`

```java
if (rettifica) {
    data_rif = frmt.format(params.getDataRiferimento());
    SQL_FIND_MISURE_COM = "..."
}
```

```sql
SELECT
    a.wt34ha_sid_mis, a.wt34ha_tip_mis, a.wt34ha_ruolo_r, a.wt34ha_anno_r, a.wt34ha_num_r,
    a.wt34ha_prog_r, a.wt34ha_tip_r, a.wt34ha_tip_cod_add, a.wt34ha_cod_add, a.wt34ha_cod_nc,
    a.wt34ha_cod_tar, a.wt34ha_cod_pae, a.wt34ha_flag_stp, a.wt34ha_ini_val, a.wt34ha_fin_val,
    a.wt34ha_num_ord, b.wt32ib_des, b.wt32ib_tip_ser_mis, b.wt32ib_trade_cod, a.wt34ha_tabacco
FROM
    wt34ha a, wt32ib b 
WHERE
    b.wt32ib_tip_ser_mis = 'D'
    AND b.wt32ib_tip_mis = a.wt34ha_tip_mis
    AND b.wt32ib_tip_mis in (551, 552, 553, 554, 555)
    AND ((b.wt32ib_ini_val <= to_date(?, 'dd/mm/yyyy')
        AND b.wt32ib_fin_val >= to_date(?, 'dd/mm/yyyy'))
		OR b.wt32ib_ini_val >= to_date(?, 'dd/mm/yyyy'))
    AND b.wt32ib_ini_val <= sysdate
    AND b.wt32ib_tip_agg != '2' AND a.wt34ha_tip_agg != '2'
    AND ((a.wt34ha_ini_val <= to_date(?, 'dd/mm/yyyy')
        AND a.wt34ha_fin_val >= to_date(?, 'dd/mm/yyyy'))
        OR (a.wt34ha_ini_val >= to_date(?, 'dd/mm/yyyy') 
        AND a.wt34ha_fin_val >= sysdate ))
    AND a.wt34ha_ini_val <= sysdate 
```