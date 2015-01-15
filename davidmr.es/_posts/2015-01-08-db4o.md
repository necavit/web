---
layout: post
title:  "Implementing Object Oriented DBs"
date:   2015-01-08 16:14:54
comments: true
tags: db4o OODBMS agile java android
---


En la línia de les metodologies àgils i la innovació en nous models de bases de dades, la incorporació d’una base de dades orientada a objectes en un nou sistema software pot accelerar força el desenvolupament d’un projecte, a més de simplificar tota la lògica a implementar.

http://inlab.fib.upc.edu/ca/blog/implementant-bases-de-dades-orientades-objectes

## OODBs: un canvi de paradigma

Les bases de dades orientades a objectes (OODB en endavant) no són pas un paradigma nou en el món de la persistència de dades. Els primers sistemes de gestió d’aquestes BDs es remunten als anys 80, amb l’aparició de Term Object Database i Versant Object Database, però tots persegueixen un mateix objectiu: portar l’orientació a objectes fins a la mateixa capa de dades de les aplicacions, el que es tradueix en no haver de convertir els objectes que s’han de persistir a un esquema relacional.

Amb una OODB, els desenvolupadors podem simplificar molt el disseny dels mètodes d’accés, modificat i esborrat dels objectes – objectes ara, no només dades – a la base de dades. No ens cal preocupar-nos de les referències entre uns i altres objectes: ja no calen atributs d’identificació ni claus primàries i foranes. Amb una OODB no hem de pensar com hem de mapejar els atributs dels objectes, perquè guardem els propis objectes!

## db4o

Entre altres sistemes de gestió per a bases de dades d’objectes, ens trobem db4o, que Versant manté i desenvolupa després de comprar-la al 2008. Es tracta d’una OODB lleugera que, a més, es pot utilitzar de manera integrada (embedded) a la resta de l’aplicació que s’estigui utilitzant; no cal, per tant, un servidor extern on l’aplicació faci una connexió.

Abans de fer servir db4o, ens caldrà aprendre una mica el seu funcionament intern (està prou ben documentat a http://community.versant.com/documentation/reference/db4o-8.1/java/reference/index.html). En primer lloc, cal dir que db4o manté un contenidor d’objectes, que podem entendre’l com una connexió a la base de dades. Totes les consultes que fem, les farem contra aquest contenidor, el qual ens permet mantenir les propietats ACID, donat que cada contenidor té la seva pròpia transacció.

Un concepte important que cal tenir en compte és el d’identitat. db4o manté la identitat dels objectes sense necessitar atributs o relacions que els identifiquin unívocament, de forma similar a com es mantenen els objectes en memòria normalment. Així, si demanem un mateix objecte de diverses maneres, db4o sempre ens retornarà el mateix objecte, la mateixa referència. Hem de saber també que db4o manté una caché de referències en memòria: una taula on les referències als objectes es corresponen amb la representació d’aquests al disc, per poder identificar en tot moment quin és l’objecte que s’ha de modificar, esborrar o llegir.

Finalment, db4o implementa el que es coneix com a activation depth (fondària d’activació). Si, pel motiu que sigui, no volem que l’OOBD ens carregui tots els objectes persistits en memòria, db4o ens ofereix una solució alternativa: carregar només aquelles parts del graf d’objectes que ens són d’interès. És a dir, quan fem una consulta, s’activaran (carregaran) aquells objectes que hem demanat, així com tots aquells que estiguin referenciats per aquests, i així de forma transitiva fins a una certa fondària, que és, simplement, la quantitat de referències que saltem des dels objectes demanats originalment. db4o ens permet configurar aquesta fondària de forma global, específica per algunes classes o automàtica, en cascada, segons es vulgui.

El que expliquem aquí és una mera introducció, prou superficial de db4o. Aquest sistema de gestió és evidentment molt més complex i queda al gust del lector aprofundir en els conceptes i l’ús d’aquesta OODB.

### Querying db4o

db4o suporta diversos mecanismes de consulta: queries natives, queries basades en exemple i SODA queries. Cadascun d'ells té els seus avantatges i inconvenients: podem realitzar fàcilment queries usant un objecte d'exemple, però no sempre podem afinar els requeriments de les consultes amb aquests stubs. D'una altra banda, les queries natives ens permeten programar-les en el llenguatge de programació amb el qual implementem l'aplicació, mantenint així la coherència en tot el projecte i ajudant a millorar el manteniment posterior. Finalment, les SODA queries ens permeten realitzar consultes complexes de forma molt potent, tot i que primer ens haurem de familiaritzar amb aquesta API, certament poc documentada, que, bàsicament, ens permet fer recorreguts pel graf d'objectes que tenim persistit. En aquest tutorial es donen bons exemples de queries d'exemples i native queries que ens facilitaran aprendre a fer consultes bàsiques.


## Implementant db4o

A l’inLab hem implantat db4o al projecte SomUPC amb entusiasme després de fer unes primeres proves, per veure si realment ens era útil i senzill de portar endavant. Després de tot, podem dir que ha resultat molt més fàcil implementar la capa de persistència del projecte amb db4o que no pas amb Hibernate i una BD relacional clàssica, que havia estat la primera elecció en aquest sentit. Veurem tot seguit alguns dels mètodes que ens permeten configurar la base de dades i accedir, modificar i eliminar els objectes que hi guardem.

Per obrir la base de dades, podem fer servir una classe auxiliar, que ens faci la gestió de la connexió i desconnexió, així com el manteniment del contenidor d’objectes al qual carregarem els resultats de les consultes que li fem:

```java
public class Db4oHandler {
    private ObjectContainer db;
    public void openDatabase(String path) {
        EmbeddedConfiguration conf = Db4oEmbedded.newConfiguration();
        db = Db4oEmbedded.openFile(conf, path);
    }
    public void close() {
        try {
            db.commit(); //commit the last in-mem cached (not persisted) changes!
            db.close();
        } catch(Exception e){
            //exception handling here!
        }
    }
    public ObjectContainer getDb() {
        return db;
    }
}
```

Amb aquestes poques línies, podem tenir operativa i funcionant una base de dades de db4o, al fitxer que li definim al path indicat. Un cop oberta la BD, guardar un objecte de la classe Foo és tant senzill com això:

```java
public class Foo {
    private String bar; //this will be stored
    private transient String temp; //this will NOT be stored (it's transient!)
    private List<Object> list; //the list and all the objects it contains will be stored
    public Foo() {}
}

    // …

    Foo foo = new Foo();
    ObjectContainer db = dbHandler.getDb();
    db.store(foo);
    db.commit();
```

I esborrar-lo és tan simple com:

```java
    db.delete(foo); //foo was stored in the database
    db.commit();
```

Com veiem, no ens cal mantenir un codi ple d’anotacions o un complex fitxer de configuració que defineixi els mappings dels atributs de les nostres classes: només POJOs, fàcils de llegir, modificar i mantenir. L’únic codi repetitiu (per la banda de la persistència de dades) que quedi als nostres fitxers serà aquell que el propi llenguatge o la nostra traça requereixin. De fet, si ens assegurem que la base de dades es tancarà correctament amb l’aplicació, és a dir, que s’executarà la funció `close()` del Db4oHandler, no ens caldrà fer db.commit() cada vegada que es faci una operació a la BD.
db4o i Android

Finalment, donat que és una base de dades integrada, fàcilment accessible i configurable, comprovem que és molt útil per desplegar en aplicacions mòbils, en plataformes com Android: http://java.dzone.com/articles/using-db4o-android-application. Així, podem aprofitar el potencial d'aquesta OOBD i la rapidesa de desenvolupament que ens facilita per dur a terme els projectes d'apps més ambiciosos que volguem!
