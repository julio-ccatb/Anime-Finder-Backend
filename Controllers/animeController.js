const Anime = require('../Models/anime');
const Genere = require('../Models/genere');
const db = require('../libs/mySql');
const msg = require('../libs/responses');
const { query } = require('../libs/mySql');

var controller = {

    test: (req, res) => {

        console.log('Controller its working');
        res.status(200).send({ message: 'Hi from test' });
    },

    GetGeneres: (req, res) => {

        if (db) {

            let sql = 'SELECT * FROM generes';

            db.query(sql, (err, result) => {

                if (err) return res.status(500).send({ code: msg._500 });

                if (!result) return res.status(404).send({ code: msg._404 })

                return res.status(200).send({ code: msg._200, generes: result });
            });


        } else {
            return res.send(503).send({ code: msg._503 });
        }

    },

    GetRecomendations: (req, res) => {

        let idgenere = req.params.idgenere;

        if (!idgenere) idgenere = Math.floor(Math.random() * 40) + 1;

        let sql = `SELECT id,title FROM animes WHERE id IN ( SELECT  animeid FROM animegeneres WHERE idgenere = ${idgenere} ) ORDER BY RAND() LIMIT 5 `;
        db.query(sql, (err, result) => {

            if (err) return res.status(500).send({ code: msg._500 });

            if (!result) return res.status(404).send({ code: msg._404 });

            return res.status(200).send({ code: msg._200, animes: result });
        })

    },

    GetTop: (req, res) => {

        return res.status(200).send({ code: msg._200 });
    },

    GetAnimeByID: (req, res) => {

        let id = req.params.id;

        if (!id) return res.status(400).send({ code: msg._400 });

        let sql = `SELECT * FROM animes WHERE id=${id}`

        db.query(sql, (err, result) => {
            if (err) return res.status(500).send({ code: msg._500 });

            if (!result) return res.status(404).send({ code: msg._404 });

            let anime = result[0];
            let sql1 = `SELECT idgenere FROM animegeneres WHERE animeid=${id}`

            db.query(sql1, (err1, generes) => {
                if (err1) {
                    console.log(err1)
                    return res.status(500).send({ code: msg._500 });}

                if (!generes) return res.status(404).send({ code: msg._404 });

                console.log(anime);

                let resume = new Anime(
                    anime.id,
                    anime.url,
                    anime.title,
                    anime.img,
                    anime.synopsis,
                    anime.status,
                    generes);

                    console.log(resume)
                return res.status(200).send({ code: msg._200, anime: resume })
            })


        })

    }
}

module.exports = controller