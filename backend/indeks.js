const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'ucka.veleri.hr',
    user: 'mkopjar',
    password: '11',
    database: 'mkopjar'
  });


  
app.use(express.urlencoded({ extended: true }));
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  app.get("/api/knjige", (req, res) => {
 //req  - slanje zahtjeva s klijentske strane, res - slanje odgovora sa serverske strane
   connection.query("SELECT naslov, autor FROM knjiga", (error, results) => {
      if (error) throw error;
      res.send(results);
    });
    
  });


  app.get("/api/knjige/:naslov", (req, res) => {
    //req  - slanje zahtjeva s klijentske strane, res - slanje odgovora sa serverske strane
    const naslov= req.params.naslov;
      connection.query("SELECT * FROM knjiga WHERE naslov = ?", naslov,(error, results) => {
         if (error) throw error;
         res.send(results);
       });
       
     });

/*
  app.get("/api/knjige/:id", (req, res) => {
    const id= req.params.id;
  //  res.send("jedna knjiga "+id);
  });*/



  app.post("/api/rezerv_knjige", (req, res) => {
    const data = req.body;
    rezervacija = [[data.datum,data.id_knjiga, data.id_korisnik]]
   connection.query("INSERT INTO rezervacija (datum_rez, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
      if (error) throw error;
      res.send(results);
    });
   // res.send("poslano"+data.id_knjiga);
  });

  app.listen(port, () => {
    console.log("Server running at port: " + port);
});


  
  app.post("/api/rezerv_knjige", (req, res) => {
    const data = req.body;
    rezervacija = [[date.today, data.id_knjiga, data.id_korisnik]]
    connection.query("INSERT INTO rezervacija (datum, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });


  app.get("/api/rezerv_knjige/:id_korisnik", (req, res) => {
    connection.query("SELECT * FROM knjiga, rezervacija, korisnik WHERE knjiga.id=rezervacija.knjiga and korisnik.id=rezervacija.korisnik AND korisnik.id=id_korisnik", (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });


   
  app.get("/api/rezerv_knjige/:id_knjiga", (req, res) => {
    connection.query("SELECT * FROM knjiga, rezervacija, korisnik WHERE knjiga.id=rezervacija.knjiga and korisnik.id=rezervacija.korisnik AND knjiga.id=id_knjiga", (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });


     //dohvat korinsika koji imaju određenu knjigu(po id-ju)
  app.get("/api/korisnici/:id_knjiga", (req, res) => {
    connection.query("SELECT k.id, k.ime, k.prezime, k.korime FROM Korisnik k JOIN Rezervacija r ON k.id = r.korisnik JOIN Knjiga knj ON r.knjiga = knj.id WHERE knj.id = id_knjiga", (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });

//ukupan broj svih primjeraka svih knjiga u knjižnici
  app.get("/api/stanjeKnjiga/", (req, res) => {
    connection.query("SELECT sum(stanje) FROM knjiga", (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });
//ukupan broj svih rezerviranih knjiga

app.get("/api/stanjeRezKnjiga/", (req, res) => {
  connection.query("SELECT count(stanje) FROM rezervacija", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//broj slobodni knjiga
app.get("/api/stanjeSlobodnihKnjiga/", (req, res) => {
  connection.query("SELECT SUM(slobodne) AS ukupno_slobodne FROM (SELECT (knjiga.stanje - COUNT(rezervacija.knjiga)) AS slobodne    FROM knjiga    LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga    GROUP BY knjiga.id) AS subquery;", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//knjige koje imaju manje od 3 primjerka
app.get("/api/knjigeManjeod3/", (req, res) => {
  connection.query("SELECT * FROM knjiga WHERE stanje<3;", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//vraća sve korisnike koji imaju rezervirane knjige duže od mjesec dana. I vratiti popis tih primjeraka knjiga.
app.get("/api/prekoracenaRezervacija/", (req, res) => {
  connection.query("SELECT     k.ime AS korisnik_ime,    k.prezime AS korisnik_prezime,    knj.naslov AS knjiga_naslov,    r.datum_rezervacije FROM    rezervacija r JOIN     korisnik k ON r.korisnik = k.id JOIN     knjiga knj ON r.knjiga = knj.id WHERE     r.datum_rezervacije < DATE_SUB(CURDATE(), INTERVAL 1 MONTH);", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});



app.get("/api/mailSms/", (req, res) => {
  connection.query("SELECT        k.email,        k.brojTelefona,        knj.naslov AS knjiga_naslov,        r.datum_rezervacije    FROM         Rezervacija r    JOIN         Korisnik k ON r.korisnik = k.id    JOIN         Knjiga knj ON r.knjiga = knj.id    WHERE         r.datum_rezervacije < DATE_SUB(CURDATE(), INTERVAL 1 MONTH);", (error, results) => {
    if (error) {
      console.error(error);
      return;
  }

  // For each user, send an email and SMS
  results.forEach(user => {
      console.log(`Send email to: ${user.email}`);
      console.log(`Send SMS to: ${user.brojTelefona}`);
      console.log(`Book: ${user.knjiga_naslov} was reserved on: ${user.datum_rezervacije}`);
  });
});
});
//jedan korisnik je rezervirao dvije ili više knjiga
app.get("/api/dvaIliVise/",(req,res) =>{
  connection.query("SELECT korisnik, knjiga, COUNT(*) AS brojRezervacija FROM rezervacija GROUP BY korisnik,knjiga HAVING brojRezervacija >=2; ", (error,results)=>{
    if (error) throw error;
    res.send(results);
  });
})

//izmijena korisnika 

app.put("/api/izmijeniKorisnika/", (req, res) => {
  const { korime, ime, prezime, lozinka, email, brojTelefona } = req.body; 

  const query = `
    UPDATE Korisnik
    SET
      ime = ?,
      prezime = ?,
      lozinka = ?,
      email = ?,
      brojTelefona = ?
    WHERE korime = ?;
  `;

  connection.query(query, [ime, prezime, lozinka, email, brojTelefona, korime], (error, results) => {
    if (error) {
      console.error("Greška pri ažuriranju podataka: ", error);
      return res.status(500).send({ message: "Došlo je do pogreške pri ažuriranju podataka." });
    }

    res.send({ message: "Podaci korisnika su uspješno ažurirani." });
  });
});

//vratiti broj slobodnih primjeraka knjige 
app.get("/api/slobodniPrimjerci/:id_knjige", (req, res) => {
  const idKnjige = req.params.id_knjige; 

 
  const query = `
    SELECT 
        (knjiga.stanje - COUNT(rezervacija.knjiga)) AS slobodne,
        knjiga.id,
        knjiga.naslov,
        knjiga.stanje
    FROM 
        knjiga
    LEFT JOIN 
        rezervacija ON knjiga.id = rezervacija.knjiga
    WHERE 
        knjiga.id = ?
    GROUP BY 
        knjiga.id;
  `;


  connection.query(query, [idKnjige], (error, results) => {
    if (error) {
      console.error("Greška pri izvršavanju upita:", error);
      return res.status(500).send({ message: "Došlo je do pogreške." });
    }

    if (results.length > 0) {
      const slobodniPrimjerci = results[0].slobodne;
      const naslov = results[0].naslov;
      const stanje = results[0].stanje;

      res.send({
        id_knjige: idKnjige,
        naslov: naslov,
        stanje: stanje,
        slobodni_primjerci: slobodniPrimjerci
      });
    } else {
      res.status(404).send({ message: "Knjiga nije pronađena." });
    }
  });
});