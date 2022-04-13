npx sequelize model:generate --name Pal --attributes userId:integer,nickname:string,title:string,description:text,game:string,server:string,rank:string,position:string,role:string,style:string,orderStart:date,orderEnd:date,price:decimal,guests:integer,address:string,city:string,state:string,country:string

npx sequelize model:generate --name Review --attributes userId:integer,palId:integer,content:text,rating:integer

npx sequelize model:generate --name Order --attributes userId:integer,padId:integer,totalCost:decimal,start:date,end:date

npx sequelize model:generate --name Image --attributes palId:integer,url:string

npx sequelize model:generate --name Game --attributes gameName:string,platform:string,server:string,rank:string,position:string,style:string

npx sequelize seed:generate --name pals-seeds
