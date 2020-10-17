const database = require('./db')
const saveOrphanage = require('./saveOrphanage')

database.then(async db => {
    //inserir dados na tabela

    await saveOrphanage(db, {
        lat:"43.7166",
        lng:"-79.3407",
        name:"Lar dos meninos",
        about:"Presta assistencia para criancas carentes",
        whatsapp:"998757246",
        images:[
            'https://images.unsplash.com/photo-1594753154778-273013529793?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9'
        ].toString(),
        instructions:'Venha com muito amor',
        opening_hours:"das 18h as 8h",
        open_on_weekends:"1"
    })
 
    //consultar dados na tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)
    

    //consultar apenas um orphanage
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "5"')
    console.log(orphanage)

    console.log(await db.all('DELETE * FROM orphanage WHERE id="4"'))
})



