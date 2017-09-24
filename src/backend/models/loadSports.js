var data = [{"name":"koripallo"},{"name":"salibandy"}];

var conn = new Mongo();

var db = conn.getDB("SpStats");
db.sports.insert(data);

